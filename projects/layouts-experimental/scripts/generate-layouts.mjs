// One-off layout generator: draws the layout library for one page format.
//
//   node scripts/generate-layouts.mjs <portrait|landscape|square> [outDir]
//
// Writes 95 JSON files (same names in every format) into src/layouts/library/<format>/ (or `outDir`).
// Rules: docs/LAYOUT_SPECIFICATIONS.md. Design variables are the defaults (86 px padding, 34 px gap) on the
// format's reference page; the grid is 24 × 24; blocks come from straight cuts (guillotine splits) of the grid.
//
// - 1 placeholder: fills the whole grid, no format.
// - 2 to 5: every portrait/landscape sequence (reading order = the id). Found by enumerating all splits.
//   Tries, in this order, until one works: 5 % tolerance without spacers, 8 % without spacers,
//   5 % with one spacer, 8 % with up to two spacers. The best layout of a pass has the most even blocks.
// - 6 to 9: one layout per mix of portraits and landscapes, no fixed order. No spacers; most even blocks first.
//
// Run it again after changing a rule. It overwrites the files of that format.

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const PAGES = { portrait: [1080, 1440], landscape: [1440, 1080], square: [1080, 1080] }
const format = process.argv[2]
if (!PAGES[format]) {
  console.error('Usage: node scripts/generate-layouts.mjs <portrait|landscape|square> [outDir]')
  process.exit(1)
}
const outDir = process.argv[3] ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'layouts', 'library', format)

const GRID = 24
const [PAGE_W, PAGE_H] = PAGES[format]
const PADDING = 86
const GAP = 34
const STEP_W = (PAGE_W - 2 * PADDING + GAP) / GRID
const STEP_H = (PAGE_H - 2 * PADDING + GAP) / GRID
const MIN_COLS = 3
const MIN_ROWS = 2

const FORMATS = {
  '3:4': 3 / 4, '2:3': 2 / 3, '9:16': 9 / 16, '1:2': 1 / 2, // portrait
  '4:3': 4 / 3, '3:2': 3 / 2, '16:9': 16 / 9, // landscape
}
const isPortraitFormat = (f) => FORMATS[f] < 1

// The format a block of a × b cells is closest to, with its deviation in percent.
const blockRatio = (a, b) => (a * STEP_W - GAP) / (b * STEP_H - GAP)
function nearestFormat(a, b) {
  const ratio = blockRatio(a, b)
  let best
  for (const [name, r] of Object.entries(FORMATS)) {
    const dev = (ratio / r - 1) * 100
    if (!best || Math.abs(dev) < Math.abs(best.dev)) best = { name, dev }
  }
  return best
}

// leafInfo[a][b]: the format of the block when it is within tolerance of one, else null.
const leafInfo = Array.from({ length: GRID + 1 }, (_, a) =>
  Array.from({ length: GRID + 1 }, (_, b) => (a >= MIN_COLS && b >= MIN_ROWS ? nearestFormat(a, b) : null)),
)
const placeholderOK = (a, b, tol) => {
  const f = leafInfo[a][b]
  return f !== null && Math.abs(f.dev) <= tol
}

// ---------- 2 to 5 placeholders: enumerate every tiling ----------

// canTile[w][h][k][s]: can a w × h rectangle be cut into k placeholders and s spacers?
function makeCanTile(tol, maxSpacers) {
  const memo = new Map()
  const can = (w, h, k, s) => {
    if (k + s === 0) return false
    if (w < 1 || h < 1) return false
    const key = ((w * 32 + h) * 16 + k) * 4 + s
    const hit = memo.get(key)
    if (hit !== undefined) return hit
    let ok = false
    if (k + s === 1) ok = k === 1 ? placeholderOK(w, h, tol) : w >= 2 && h >= 2
    else if (w * h >= (k * MIN_COLS * MIN_ROWS)) {
      outer: for (let k1 = 0; k1 <= k; k1++)
        for (let s1 = 0; s1 <= s; s1++) {
          if (k1 + s1 === 0 || k1 + s1 === k + s) continue
          for (let c = 1; c < w; c++) if (can(c, h, k1, s1) && can(w - c, h, k - k1, s - s1)) { ok = true; break outer }
          for (let c = 1; c < h; c++) if (can(w, c, k1, s1) && can(w, h - c, k - k1, s - s1)) { ok = true; break outer }
        }
    }
    memo.set(key, ok)
    return ok
  }
  return can
}

// Calls `done(leaves)` for every tiling (leaves: {col,row,colSpan,rowSpan,spacer}).
function enumerateTilings(k, s, tol, done) {
  const can = makeCanTile(tol, s)
  const leaves = []
  function go(x, y, w, h, k, s, next) {
    if (k + s === 1) {
      leaves.push({ col: x + 1, row: y + 1, colSpan: w, rowSpan: h, spacer: s === 1 })
      next()
      leaves.pop()
      return
    }
    for (let k1 = 0; k1 <= k; k1++)
      for (let s1 = 0; s1 <= s; s1++) {
        if (k1 + s1 === 0 || k1 + s1 === k + s) continue
        for (let c = 1; c < w; c++)
          if (can(c, h, k1, s1) && can(w - c, h, k - k1, s - s1))
            go(x, y, c, h, k1, s1, () => go(x + c, y, w - c, h, k - k1, s - s1, next))
        for (let c = 1; c < h; c++)
          if (can(w, c, k1, s1) && can(w, h - c, k - k1, s - s1))
            go(x, y, w, c, k1, s1, () => go(x, y + c, w, h - c, k - k1, s - s1, next))
      }
  }
  if (can(GRID, GRID, k, s)) go(0, 0, GRID, GRID, k, s, () => done(leaves))
}

const touchesAllEdges = (leaves) => {
  const ph = leaves.filter((l) => !l.spacer)
  return (
    ph.some((l) => l.row === 1) &&
    ph.some((l) => l.row + l.rowSpan - 1 === GRID) &&
    ph.some((l) => l.col === 1) &&
    ph.some((l) => l.col + l.colSpan - 1 === GRID)
  )
}

// Biggest block / smallest block above which a layout counts as too uneven (only used if nothing better exists).
const MAX_UNEVEN = 10

// Lower is better: not too uneven, spacer area (only matters in the spacer passes), evenness, deviation.
function score(leaves) {
  const ph = leaves.filter((l) => !l.spacer)
  const areas = ph.map((l) => l.colSpan * l.rowSpan)
  const ratio = Math.max(...areas) / Math.min(...areas)
  return [
    ratio > MAX_UNEVEN ? 1 : 0,
    leaves.filter((l) => l.spacer).reduce((sum, l) => sum + l.colSpan * l.rowSpan, 0),
    ratio,
    Math.max(...ph.map((l) => Math.abs(leafInfo[l.colSpan][l.rowSpan].dev))),
  ]
}
const better = (a, b) => {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] < b[i]
  return false
}
const byReadingOrder = (a, b) => a.row - b.row || a.col - b.col

// All layouts of n placeholders (2 to 5): the best tiling per portrait/landscape sequence.
function bestPerSequence(n, k, s, tol) {
  const best = new Map()
  enumerateTilings(k, s, tol, (leaves) => {
    if (!touchesAllEdges(leaves)) return
    const seq = leaves
      .filter((l) => !l.spacer)
      .sort(byReadingOrder)
      .map((l) => (isPortraitFormat(leafInfo[l.colSpan][l.rowSpan].name) ? 'p' : 'l'))
      .join('')
    const sc = score(leaves)
    const cur = best.get(seq)
    if (!cur || better(sc, cur.score)) best.set(seq, { score: sc, leaves: leaves.map((l) => ({ ...l })) })
  })
  return best
}

const PASSES = [
  { tol: 5, spacers: 0 },
  { tol: 8, spacers: 0 },
  { tol: 5, spacers: 1 },
  { tol: 8, spacers: 1 },
  { tol: 8, spacers: 2 },
]

// ---------- 6 to 9 placeholders: one layout per mix, no spacers (dynamic programming) ----------

// For a rectangle and a number of portraits/landscapes, keep only the tilings that are not beaten in both the
// smallest and the largest block area (Pareto). `maxRatio` drops hopelessly uneven ones.
function bestPerMix(n, tol) {
  const memo = new Map()
  const MAX_RATIO = 16
  const leaf = (w, h, portrait) => {
    const f = leafInfo[w][h]
    if (!f || Math.abs(f.dev) > tol || isPortraitFormat(f.name) !== portrait) return null
    const a = w * h
    return [{ min: a, max: a, dev: Math.abs(f.dev), leaf: { col: 0, row: 0, colSpan: w, rowSpan: h } }]
  }
  const solve = (w, h, p, l) => {
    const key = ((w * 32 + h) * 16 + p) * 16 + l
    const hit = memo.get(key)
    if (hit) return hit
    let entries = []
    if (p + l === 1) entries = leaf(w, h, p === 1) ?? []
    else if (w * h >= (p + l) * MIN_COLS * MIN_ROWS) {
      const cand = new Map() // "min,max" -> best entry
      const add = (e) => {
        if (e.max / e.min > MAX_RATIO) return
        const id = `${e.min},${e.max}`
        const cur = cand.get(id)
        if (!cur || e.dev < cur.dev) cand.set(id, e)
      }
      for (let p1 = 0; p1 <= p; p1++)
        for (let l1 = 0; l1 <= l; l1++) {
          if (p1 + l1 === 0 || p1 + l1 === p + l) continue
          for (const dir of ['v', 'h']) {
            const size = dir === 'v' ? w : h
            for (let c = 1; c < size; c++) {
              const A = dir === 'v' ? solve(c, h, p1, l1) : solve(w, c, p1, l1)
              if (!A.length) continue
              const B = dir === 'v' ? solve(w - c, h, p - p1, l - l1) : solve(w, h - c, p - p1, l - l1)
              for (const a of A)
                for (const b of B)
                  add({ min: Math.min(a.min, b.min), max: Math.max(a.max, b.max), dev: Math.max(a.dev, b.dev), dir, c, a, b })
            }
          }
        }
      // Pareto: larger min and smaller max is better.
      const all = [...cand.values()].sort((x, y) => y.min - x.min || x.max - y.max)
      let bestMax = Infinity
      for (const e of all) if (e.max < bestMax) { entries.push(e); bestMax = e.max }
    }
    memo.set(key, entries)
    return entries
  }
  // Rebuild the leaves of one entry.
  const build = (e, x, y, w, h, out) => {
    if (!e.dir) return out.push({ ...e.leaf, col: x + 1, row: y + 1 })
    if (e.dir === 'v') { build(e.a, x, y, e.c, h, out); build(e.b, x + e.c, y, w - e.c, h, out) }
    else { build(e.a, x, y, w, e.c, out); build(e.b, x, y + e.c, w, h - e.c, out) }
  }
  const result = new Map()
  for (let p = 0; p <= n; p++) {
    const entries = solve(GRID, GRID, p, n - p)
    if (!entries.length) continue
    const top = entries.reduce((a, b) => (a.max / a.min < b.max / b.min || (a.max / a.min === b.max / b.min && a.dev <= b.dev) ? a : b))
    const leaves = []
    build(top, 0, 0, GRID, GRID, leaves)
    result.set(p, { score: [0, 0, top.max / top.min, top.dev], leaves })
  }
  return result
}

// ---------- output ----------

function toFile(id, leaves, orientationsOverride) {
  const elements = [...leaves].sort(byReadingOrder).map((l) =>
    l.spacer
      ? { type: 'spacer', col: l.col, row: l.row, colSpan: l.colSpan, rowSpan: l.rowSpan }
      : { type: 'placeholder', col: l.col, row: l.row, colSpan: l.colSpan, rowSpan: l.rowSpan, format: leafInfo[l.colSpan][l.rowSpan].name },
  )
  const ph = elements.filter((e) => e.type === 'placeholder')
  return {
    id,
    placeholderCount: ph.length,
    orientations: orientationsOverride ?? ph.map((e) => (isPortraitFormat(e.format) ? 'portrait' : 'landscape')),
    tags: [],
    elements,
  }
}

mkdirSync(outDir, { recursive: true })
const report = []
const write = (file, note) => {
  writeFileSync(join(outDir, `${file.id}.json`), JSON.stringify(file, null, 2) + '\n')
  const ph = file.elements.filter((e) => e.type === 'placeholder')
  const spacerCells = file.elements.filter((e) => e.type === 'spacer').reduce((s, e) => s + e.colSpan * e.rowSpan, 0)
  const worst = ph.some((e) => !e.format) ? 0 : Math.max(...ph.map((e) => Math.abs(leafInfo[e.colSpan][e.rowSpan].dev)))
  report.push({ id: file.id, worst: +worst.toFixed(1), spacer: Math.round((spacerCells / (GRID * GRID)) * 100), note })
}

// 1 placeholder: the whole grid, any photo.
write({ id: '1', placeholderCount: 1, orientations: ['any'], tags: [], elements: [{ type: 'placeholder', col: 1, row: 1, colSpan: GRID, rowSpan: GRID }] }, 'whole grid')

for (let n = 2; n <= 5; n++) {
  const wanted = new Set([''])
  for (let i = 0; i < n; i++) for (const w of [...wanted]) { wanted.delete(w); wanted.add(w + 'p'); wanted.add(w + 'l') }
  const done = new Map()
  const uneven = new Map() // first layout found per sequence, used when every pass only gives too uneven ones
  for (const pass of PASSES) {
    if (done.size === wanted.size) break
    const found = bestPerSequence(n, n, pass.spacers, pass.tol)
    for (const [seq, r] of found) {
      if (!wanted.has(seq) || done.has(seq)) continue
      if (r.score[0] === 0) done.set(seq, { ...r, pass })
      else if (!uneven.has(seq)) uneven.set(seq, { ...r, pass })
    }
  }
  for (const [seq, r] of uneven) if (!done.has(seq)) done.set(seq, r)
  for (const seq of [...wanted].sort()) {
    const r = done.get(seq)
    if (!r) { report.push({ id: `${n}-${seq}`, worst: NaN, spacer: NaN, note: 'NOT FOUND' }); continue }
    write(toFile(`${n}-${seq}`, r.leaves), `${r.pass.tol} % / ${r.pass.spacers} spacers, ratio ${r.score[2].toFixed(1)}`)
  }
}

for (let n = 6; n <= 9; n++) {
  let found = bestPerMix(n, 5)
  const strict = new Set(found.keys())
  const relaxed = bestPerMix(n, 8)
  for (let p = 0; p <= n; p++) {
    const tier = strict.has(p) ? 5 : 8
    const r = strict.has(p) ? found.get(p) : relaxed.get(p)
    if (!r) { report.push({ id: `${n}-${p}p${n - p}l`, worst: NaN, spacer: NaN, note: 'NOT FOUND' }); continue }
    // Orientations in reading order, as in the existing files.
    write(toFile(`${n}-${p}p${n - p}l`, r.leaves), `${tier} % tolerance, ratio ${r.score[2].toFixed(1)}`)
  }
}

console.log(`${format}: wrote ${report.length} layouts to ${outDir}`)
const rank = (r) => (Number.isNaN(r.worst) ? 99 : r.worst > 5 ? 2 : r.spacer > 0 ? 1 : 0)
for (const r of report.filter((r) => rank(r) > 0)) console.log(`  ${r.id.padEnd(8)} worst ${r.worst} %  spacers ${r.spacer} %  ${r.note}`)
const strictClean = report.filter((r) => rank(r) === 0).length
console.log(`  ${strictClean} layouts within 5 % and without spacers`)
