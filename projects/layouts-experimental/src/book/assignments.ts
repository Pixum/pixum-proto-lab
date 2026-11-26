// Which layout each page uses. Fixed in code for now (no sidebar selection yet).
// Two different layouts for each of 2, 3, 4 and 5 placeholders, one single-placeholder page and a third
// 5-placeholder layout, in a random order (shuffled once, then fixed). A page number without an entry stays blank.
// `caption: true` adds the caption row to that page, `headline: true` the headline row (demo settings, not design decisions).
// `bodyBlocks` lists the indexes (0-based) in the layout's `elements` of the placeholders or spacers that become body text.
// `clipart`: at most one per page. `file` is a fragment of the file name in src/assets/cliparts; `block` is the index in
// the layout's `elements`: a spacer gets the clipart centered, a placeholder gets it on its outer corner.
// `from: 'few'` shows it in the "A few" and "A lot" settings, `from: 'lot'` only in "A lot".
import type { PageFormatName } from '../layouts/geometry'

export type PageClipart = { file: string; block: number; from: 'few' | 'lot' }
export type PageAssignment = {
  layout: string
  headline?: boolean
  caption?: boolean
  bodyBlocks?: number[]
  clipart?: PageClipart
}

export const pageAssignments: Record<number, PageAssignment> = {
  1: { layout: '2-pp', clipart: { file: 'coffee', block: 3, from: 'lot' } },
  2: { layout: '4-llpl', headline: true, clipart: { file: 'kaktus', block: 3, from: 'few' } },
  3: { layout: '5-pllpl', clipart: { file: 'starfish', block: 0, from: 'lot' } },
  4: { layout: '3-pll', clipart: { file: 'plane', block: 1, from: 'lot' } },
  5: { layout: '1', caption: true, clipart: { file: 'liveinthemoment', block: 0, from: 'few' } },
  6: { layout: '5-lplpl', caption: true, clipart: { file: 'lemon', block: 1, from: 'lot' } },
  7: { layout: '3-lpl', bodyBlocks: [3], clipart: { file: 'june', block: 1, from: 'lot' } },
  8: { layout: '2-ll', headline: true, clipart: { file: 'stamps_9.', block: 1, from: 'few' } },
  9: { layout: '4-pppl', clipart: { file: 'september', block: 2, from: 'lot' } },
  10: { layout: '5-lllll', bodyBlocks: [4], clipart: { file: 'stamps_22.', block: 3, from: 'lot' } },
}

// `block` and `bodyBlocks` are indexes in a layout's `elements`, which differ between the page formats' libraries.
// Where Landscape or Square has no spacer at the portrait index (page 1, page 7), these pages use a placeholder instead.
const formatOverrides: Partial<Record<PageFormatName, Record<number, Partial<PageAssignment>>>> = {
  Landscape: {
    1: { clipart: { file: 'coffee', block: 1, from: 'lot' } },
    7: { bodyBlocks: [2] },
  },
  Square: {
    1: { clipart: { file: 'coffee', block: 1, from: 'lot' } },
    7: { bodyBlocks: [2] },
  },
}

// The assignment of one page in the chosen page format.
export const assignmentFor = (page: number, format: PageFormatName): PageAssignment | undefined => {
  const base = pageAssignments[page]
  return base && { ...base, ...formatOverrides[format]?.[page] }
}
