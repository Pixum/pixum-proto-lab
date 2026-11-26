// The book's structure. Layout rules for the pages are defined separately (docs/LAYOUT_SPECIFICATIONS.md).

// Page sizes per format: see pageFormats in src/layouts/geometry.ts.
// Pages are drawn at 1 cm = 10 px; the canvas scales the whole book to fit the view.
export const PX_PER_CM = 10

// A unit is a single page or a double-page spread; `pages` holds the page numbers.
export type BookUnit = { kind: 'single' | 'spread'; pages: number[] }

// Opening page, 4 spreads, closing page (10 pages), split into two rows of 5 pages each.
export const bookRows: BookUnit[][] = [
  [
    { kind: 'single', pages: [1] },
    { kind: 'spread', pages: [2, 3] },
    { kind: 'spread', pages: [4, 5] },
  ],
  [
    { kind: 'spread', pages: [6, 7] },
    { kind: 'spread', pages: [8, 9] },
    { kind: 'single', pages: [10] },
  ],
]
