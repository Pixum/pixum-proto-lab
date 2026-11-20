import { blockRect, GRID_COLUMNS, IMAGE_ROWS, type GridSettings } from './geometry'
import type { Format, LayoutDef } from './types'

export const FORMAT_RATIOS: Record<Format, number> = {
  '3:4': 3 / 4,
  '2:3': 2 / 3,
  '9:16': 9 / 16,
  '1:2': 1 / 2,
  '4:3': 4 / 3,
  '3:2': 3 / 2,
  '16:9': 16 / 9,
}
const PORTRAIT_FORMATS: Format[] = ['3:4', '2:3', '9:16', '1:2']

// A placeholder block must be within this many percent of its target format.
export const TOLERANCE_PERCENT = 5

export type LayoutReport = {
  placeholders: { format?: Format; ratio: number; deviation?: number; withinTolerance: boolean }[]
  edges: { top: boolean; bottom: boolean; left: boolean; right: boolean }
  readingOrder?: { sequence: string; expected: string; matches: boolean }
  spacerShare: number // share of the 24 × 24 grid left to spacers, 0 to 1
  // Every cell of the 24 × 24 grid must belong to exactly one block.
  structure: { outOfBounds: number; overlappingCells: number; emptyCells: number }
}

// Checks one layout against the rules in docs/LAYOUT_SPECIFICATIONS.md.
export function checkLayout(layout: LayoutDef, settings: GridSettings, rows: number): LayoutReport {
  const placeholders = layout.elements.filter((e) => e.type === 'placeholder')
  const spacers = layout.elements.filter((e) => e.type === 'spacer')

  const edges = { top: false, bottom: false, left: false, right: false }
  for (const p of placeholders) {
    if (p.row === 1) edges.top = true
    if (p.row + p.rowSpan - 1 === IMAGE_ROWS) edges.bottom = true
    if (p.col === 1) edges.left = true
    if (p.col + p.colSpan - 1 === GRID_COLUMNS) edges.right = true
  }

  const reports = placeholders.map((p) => {
    const rect = blockRect(p, settings, rows)
    const ratio = rect.width / rect.height
    if (p.type !== 'placeholder' || !p.format) return { ratio, withinTolerance: true }
    const deviation = (ratio / FORMAT_RATIOS[p.format] - 1) * 100
    return { format: p.format, ratio, deviation, withinTolerance: Math.abs(deviation) <= TOLERANCE_PERCENT }
  })

  // Reading order: top to bottom, then left to right. Must match the id (p = portrait, l = landscape).
  let readingOrder: LayoutReport['readingOrder']
  const ordered = placeholders
    .filter((p) => p.type === 'placeholder' && p.format)
    .sort((a, b) => a.row - b.row || a.col - b.col)
  // Only for sequence ids (3-ppl); the mix ids from 6 placeholders (6-3p3l) have no fixed order.
  if (ordered.length > 1 && /^[pl]+$/.test(layout.id.split('-')[1] ?? '')) {
    const sequence = ordered
      .map((p) => (p.type === 'placeholder' && p.format && PORTRAIT_FORMATS.includes(p.format) ? 'p' : 'l'))
      .join('')
    const expected = layout.id.split('-')[1] ?? ''
    readingOrder = { sequence, expected, matches: sequence === expected }
  }

  // Structure: count how often each grid cell is used.
  const uses = new Array<number>(GRID_COLUMNS * IMAGE_ROWS).fill(0)
  let outOfBounds = 0
  for (const el of layout.elements) {
    if (el.col < 1 || el.row < 1 || el.col + el.colSpan - 1 > GRID_COLUMNS || el.row + el.rowSpan - 1 > IMAGE_ROWS) {
      outOfBounds++
      continue
    }
    for (let r = el.row; r < el.row + el.rowSpan; r++)
      for (let c = el.col; c < el.col + el.colSpan; c++) uses[(r - 1) * GRID_COLUMNS + (c - 1)]++
  }
  const structure = {
    outOfBounds,
    overlappingCells: uses.filter((n) => n > 1).length,
    emptyCells: uses.filter((n) => n === 0).length,
  }

  const spacerCells = spacers.reduce((sum, s) => sum + s.colSpan * s.rowSpan, 0)
  return {
    placeholders: reports,
    edges,
    readingOrder,
    spacerShare: spacerCells / (GRID_COLUMNS * IMAGE_ROWS),
    structure,
  }
}
