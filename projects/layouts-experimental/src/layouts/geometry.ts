import type { GridBlock } from './types'

// Reference page for all px values: 1080 × 1440 px (21 × 28 cm at 3:4).
export const PAGE = { width: 1080, height: 1440 }

// The grid is 24 × 24 for every layout (1 to 9 placeholders): fine enough for balanced blocks with many photos.
export const GRID_COLUMNS = 24
export const IMAGE_ROWS = 24

// With a caption the grid grows by two rows; the caption takes the last two (the height of one row of the old 12-row grid).
export const CAPTION_ROWS = 2
// A headline adds two rows at the top the same way.
export const HEADLINE_ROWS = 2
export const rowCount = (caption: boolean, headline: boolean) =>
  IMAGE_ROWS + (caption ? CAPTION_ROWS : 0) + (headline ? HEADLINE_ROWS : 0)

// Values come from the global variables (gap, page padding).
export type GridSettings = { gap: number; paddingX: number; paddingY: number }

// One grid step: a cell plus the gap after it. A block of k cells is k steps minus one gap, so it stays
// positive even when a single fine cell would be narrower than 0 (large gap and padding).
function stepSize(s: GridSettings, rows: number) {
  return {
    width: (PAGE.width - 2 * s.paddingX + s.gap) / GRID_COLUMNS,
    height: (PAGE.height - 2 * s.paddingY + s.gap) / rows,
  }
}

// Positions (px on the reference page) of the guide lines: the start and end edge of every cell.
// With a large gap the two edges of a cell cross over, so the lines stay visible instead of collapsing.
export function gridLines(s: GridSettings, rows: number) {
  const step = stepSize(s, rows)
  // Only lines strictly inside the grid area: no frame around the grid, and no line out in the padding
  // (with a large gap the first cell's end edge would lie left of the grid).
  const edges = (count: number, padding: number, size: number) =>
    Array.from({ length: count }, (_, i) => [padding + i * size, padding + (i + 1) * size - s.gap])
      .flat()
      .filter((v) => v > padding + 0.5 && v < padding + count * size - s.gap - 0.5)
  return {
    x: edges(GRID_COLUMNS, s.paddingX, step.width),
    y: edges(rows, s.paddingY, step.height),
  }
}

// Position and size of a grid block on the reference page, in px.
// `rowOffset` shifts the block down (the layout's rows start below a headline).
export function blockRect(block: GridBlock, s: GridSettings, rows: number, rowOffset = 0) {
  const step = stepSize(s, rows)
  return {
    left: s.paddingX + (block.col - 1) * step.width,
    top: s.paddingY + (block.row - 1 + rowOffset) * step.height,
    width: Math.max(0, block.colSpan * step.width - s.gap),
    height: Math.max(0, block.rowSpan * step.height - s.gap),
  }
}
