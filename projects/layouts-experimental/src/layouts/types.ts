// Shape of a layout JSON file (see docs/LAYOUT_SPECIFICATIONS.md).
// Files hold structure and metadata only: no colors, px sizes or fonts.

export type Format = '3:4' | '2:3' | '9:16' | '1:2' | '4:3' | '3:2' | '16:9'

// A block of grid cells. col and row start at 1.
export type GridBlock = { col: number; row: number; colSpan: number; rowSpan: number }

export type LayoutElement =
  | ({ type: 'placeholder'; format?: Format } & GridBlock) // no format = fills the grid, any photo
  | ({ type: 'spacer' } & GridBlock) // invisible empty block

export type LayoutDef = {
  id: string // "<count>-<sequence>", e.g. "3-ppl"; "1" for the single layout
  placeholderCount: number
  orientations: ('portrait' | 'landscape' | 'any')[] // in reading order
  tags: string[]
  elements: LayoutElement[]
}
