// Which layout each page uses. Fixed in code for now (no sidebar selection yet).
// Two different layouts for each of 2, 3, 4 and 5 placeholders, one single-placeholder page and a third
// 5-placeholder layout, in a random order (shuffled once, then fixed). A page number without an entry stays blank.
// `caption: true` adds the caption row to that page (demo setting, not a design decision).
export type PageAssignment = { layout: string; caption?: boolean }

export const pageAssignments: Record<number, PageAssignment> = {
  1: { layout: '2-pp' },
  2: { layout: '4-llpl' },
  3: { layout: '5-pllpl' },
  4: { layout: '3-pll' },
  5: { layout: '1', caption: true },
  6: { layout: '5-lplpl' },
  7: { layout: '3-lpl', caption: true },
  8: { layout: '2-ll' },
  9: { layout: '4-pppl' },
  10: { layout: '5-lllll' },
}
