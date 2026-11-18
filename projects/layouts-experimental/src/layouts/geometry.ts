import type { GridBlock } from './types'

// Reference page for all px values: 1080 × 1440 px (21 × 28 cm at 3:4).
export const PAGE = { width: 1080, height: 1440 }

export const GRID_COLUMNS = 12
export const IMAGE_ROWS = 12

// With a caption the grid grows by one row; the caption takes the last row.
export const rowCount = (caption: boolean) => (caption ? IMAGE_ROWS + 1 : IMAGE_ROWS)

// Values come from the global variables (gap, page padding).
export type GridSettings = { gap: number; paddingX: number; paddingY: number }

function cellSize(s: GridSettings, rows: number) {
  const contentWidth = PAGE.width - 2 * s.paddingX
  const contentHeight = PAGE.height - 2 * s.paddingY
  return {
    // Never negative, even if padding and gap together exceed the page.
    width: Math.max(0, (contentWidth - (GRID_COLUMNS - 1) * s.gap) / GRID_COLUMNS),
    height: Math.max(0, (contentHeight - (rows - 1) * s.gap) / rows),
  }
}

// Position and size of a grid block on the reference page, in px.
export function blockRect(block: GridBlock, s: GridSettings, rows: number) {
  const cell = cellSize(s, rows)
  return {
    left: s.paddingX + (block.col - 1) * (cell.width + s.gap),
    top: s.paddingY + (block.row - 1) * (cell.height + s.gap),
    width: block.colSpan * cell.width + (block.colSpan - 1) * s.gap,
    height: block.rowSpan * cell.height + (block.rowSpan - 1) * s.gap,
  }
}
