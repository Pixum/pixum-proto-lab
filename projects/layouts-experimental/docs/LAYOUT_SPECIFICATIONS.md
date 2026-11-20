# Layout Specifications

Book structure and layout rules. Status: the 95-layout library, the layout renderer, the rule checks, the layout overview and the page assignment are implemented. Headline and Body text are not (see "Open items"). Items marked **TBD** are not decided.

Reference: Figma file "Page Layouts" (`SVTJgs9ML1EKRGoOC2AXXK`, node `4167:3070`, "Layout examples").

## Book structure
1 opening page, 4 double-page spreads, 1 closing page (10 pages total).

## Page format
21 × 28 cm (portrait, 3:4).

**Reference page size for px values (assumption, to confirm):** 1080 × 1440 px, which is 21 × 28 cm at 3:4. The Figma examples are 1100 × 1440 and were scaled to this. All px variables (gap, padding, radius, font size) are measured on this reference page. The canvas scales the page for display.

## Canvas arrangement
Two rows of 5 pages each:
- Row 1: opening page (1), spread (2–3), spread (4–5)
- Row 2: spread (6–7), spread (8–9), closing page (10)

Defined in `src/book/structure.ts`.

## Scope of a layout
One layout covers **one page**. A spread is two pages, each with its own layout.

## Grid
- **24 columns × 24 rows**, one grid for every layout (1 to 9 placeholders), placed **inside the page padding**. The grid was 12 × 12 at first; it was too coarse for 6 to 9 placeholders (only 30 block shapes fit a photo format within 5 %, against 128 on 24 × 24). The 61 layouts for 1 to 5 placeholders were converted by doubling every column, row and span, so their shapes are identical to before.
- The space between grid cells (gutter) equals the global **gap** variable.
- Grid step: `stepWidth = (contentWidth + gap) / 24`, `stepHeight = (contentHeight + gap) / rows` (rows = 24, or 26 with a caption).
- A block of `a` columns × `b` rows measures `a × stepWidth − gap` by `b × stepHeight − gap` (never below 0). Computing from the step, and not from a single cell, keeps blocks positive even when one fine cell would be narrower than 0 (large gap and padding), so the sidebar ranges did not change. The layouts for 6 to 9 placeholders only use blocks of at least 3 columns × 2 rows, which stay positive at the largest gap (60 px) and padding (210 px).
- Verified against the Figma examples (reference values: 56 px side padding, 168 px top and bottom padding, 12 px gap, not the current defaults; these were measured on the old 12-cell grid, a block of `n` old cells equals `2n` cells now): a 12-cell-wide block (6 old columns) is 488 px wide, a 12-row block (6 old rows) is 546 px, a 16-row block is 732 px and an 8-row block is 360 px.

## Elements in a layout
| Element | Visible | Purpose |
|---|---|---|
| **Placeholder** | Yes (light pink) | A photo area. Has a grid position, a size in cells, an orientation and a target format. |
| **Spacer** | No | An empty block on the grid. Makes leftover space explicit so every cell belongs to a placeholder, a text area or a spacer. |
| **Text area** | Yes | Headline and body text (see "Text options"). |

Placeholders are light pink in the Layouts overview. In the **book** they are filled with photos, cropped to cover the block (the corner radius variable clips them).

**Edge rule:** each of the four outer edges of the 24 × 24 grid (top, bottom, left, right) must be touched by at least one placeholder. Spacers and the caption do not count.

The single-placeholder layout follows this rule by filling the whole grid (see "Layout library").

**Spacer rule:** keep spacers to a minimum. Use a spacer only where no placeholder block with a clean format can fill the space (for example the empty corner of a diagonal layout). Prefer a block that fills a column or band exactly (6 × 8 plus 6 × 4 makes 12 rows) over leaving a thin spacer strip. The draft shows each layout's spacer share of the grid.

## Placeholder formats
Usage statistics of real photos (counts as provided):

| Format | Orientation | Count | Share |
|---|---|---|---|
| 4:3 | landscape | 55113 | 56 % |
| 3:4 | portrait | 13472 | 14 % |
| 3:2 | landscape | 9267 | 9 % |
| 16:9 | landscape | 5954 | 6 % |
| 2:3 | portrait | 3553 | 4 % |
| 1:2 | portrait | 3193 | 3 % |
| 9:16 | portrait | 3202 | 3 % |
| unknown | landscape | 2941 | 3 % |
| 1:1 | square | 1396 | 1 % |

Landscape is about 75 % of all images, portrait about 24 %. 4:3 and 3:4 together are about 70 %.

**Rule (hybrid approach):** placeholders are whole grid blocks. In layouts with two or more placeholders, each placeholder also records a **target format**. Its block must be within **5 %** of that format at the **current default variables** (86 px page padding on all sides, 34 px gap). All layouts in the library are drawn for these defaults. **Deliberate exceptions (decided, left flagged in the overview):** `3-ppl` and `3-lpp` (portraits 6 × 7, +7 %), `4-pppp` (four 6 × 6 blocks, −6 %), `4-pplp` (4 × 4 portrait, +5.04 %), `4-ppll`, `4-llpp`, `4-plpl` and `4-lppl` (6 × 4 landscapes, −18 %) and `4-llll` (12 × 4 block, +28 %) and `3-lll` (three 12 × 4 blocks, +28 %). The designer chose these block sizes; the format check stays strict and shows them in amber. **5 placeholders:** the 32 layouts were drawn with a relaxed tolerance (up to about 8 % off) where this gives a more balanced page. 3 of them pass the strict 5 % check, 22 are within 7 % and all 32 within 8 %; they show in amber in the overview. All 32 cover the grid fully, touch every edge and match their reading order. Photos are cropped to fill, so small drift is not visible. The earlier Figma examples (56 / 168 px padding, 12 px gap) used different blocks and no longer apply.

**Exception (decided):** the single-placeholder layout ignores formats. It fills the whole 24 × 24 grid (0.88 wide to tall, no target format) and takes portrait and landscape photos alike.

Orientation comes from the target format: portrait (3:4, 2:3, 9:16, 1:2) or landscape (4:3, 3:2, 16:9).

Measured block shapes on a 1080 × 1440 page at the defaults (86 px page padding, 34 px gap). **The table below is in cells of the old 24 × 24 grid** (cell 44.5 × 74.5 px); double both numbers for the current 24 × 24 grid (a 12 × 6 block is 24 × 12). The 24 × 24 grid also allows shapes in between (for example 7 × 7 = 2:3, 17 × 7 = 16:9, 12 × 11 = 3:4). Blocks within 5 % of a format, as used in the library:

| Block (columns × rows) | Format | Block (columns × rows) | Format |
|---|---|---|---|
| 12 × 6 | 3:2 | 5 × 6 | 9:16 |
| 8 × 4 | 3:2 | 7 × 9 | 9:16 |
| 12 × 5 | 16:9 | 5 × 7 | 1:2 |
| 7 × 3 | 16:9 | 6 × 8 | 1:2 |
| 7 × 4 | 4:3 | 3 × 3 | 2:3 |
| 9 × 5, 11 × 6 | 4:3 | 9 × 9 and larger | 3:4 |

**Known limit:** the shapes depend on gap and padding. With equal padding on all sides the content area is tall and narrow, and the 34 px gap narrows every column further. Compared to the earlier Figma values, 4:3 and 3:4 are rare: 3:4 only fits in blocks of 9 × 9 cells or more, so it is not used in layouts with several photos. Portraits are mostly 1:2 and 9:16, landscapes 16:9 and 3:2. **Decided:** the defaults stay at 86 px and 34 px, and the layouts were redrawn for them. Changing gap or padding in the sidebar moves the shapes away from their target formats; the overview shows the deviation.

**Design constraint:** a 1:2 or 9:16 portrait block needs 12 to 18 of the 24 rows, so a page holds at most two portraits stacked, or two side by side. Layouts with many portraits therefore have spacers.

## Layout library
- Each layout is one **independent JSON file**.
- **1 placeholder:** exactly **one layout**. The placeholder fills the whole 24 × 24 grid. Its orientation is `any`, so it works for portrait and landscape photos.
- **2 to 5 placeholders:** for each count, **every ordered sequence of portrait (P) and landscape (L)**: 4, 8, 16 and 32 sequences, one layout each. More variants per sequence can be added later.
- **6 to 9 placeholders:** only **one layout per mix** of portraits and landscapes (for example 3 portraits + 3 landscapes), including all-portrait and all-landscape. The order is not fixed: it is whatever the best layout gives in reading order. 7 + 8 + 9 + 10 = **34 layouts**. File naming: `<count>-<n>p<m>l.json`, for example `6-3p3l.json`. Chosen by a search over straight-cut splits of the 24 × 24 grid (no spacers, every block at least 3 × 2 cells, every block within 5 % of its format) at the default variables: **most evenly sized blocks first** (smallest ratio between the biggest and the smallest block), then smallest deviation. All 34 fill the grid fully, touch every edge and are within 5 % (worst case 4.9 %). The biggest-to-smallest block ratio is 1.0 to 3.5 for 29 of them. **Less even (all within 5 %):** `6-0p6l` (7.5) and `7-0p7l` (10.3), because six or seven landscape photos do not fit a tall page evenly; `8-7p1l` (3.75), `6-6p0l` (3.7). Allowing up to 8 % deviation (amber) would make most of these even, not decided. **`9-9p0l` is nine equal 8 × 8 blocks (decided):** exactly +5.0 % off 2:3 (a 280 × 400 px block against 0.667), so the overview shows it amber because of rounding at the limit; every other layout is unaffected. The reading-order check does not apply to them. In the overview they sort portrait-heavy first.
- **95 layouts** in total (1 + 4 + 8 + 16 + 32 + 34).
- Order is the reading order of the placeholders: top to bottom, then left to right (confirmed).
- File naming: `<count>-<sequence>.json`, for example `3-pll.json`. The single layout is `1.json`.
- **Status:** all 95 layouts exist as JSON files in `src/layouts/library/`: `1`, every sequence for 2 to 5 placeholders, and one layout per mix for 6 to 9. Adding a file there adds a layout to the library and to the overview.
- All 95 are viewable in the app: the **Layouts** button in the top-left corner of the canvas opens an overview, grouped by number of placeholders, with the rule checks per layout.
- **Renderer:** `src/layouts/LayoutPage.tsx` draws one layout with the global variables (gap, page padding, corner radius, background color). The book pages and the overview both use it, so both react to the sidebar.
- **Checks** (`src/layouts/checks.ts`): format tolerance, edge rule, reading order, spacer share, and grid structure (no overlapping blocks, nothing outside the grid, every cell used exactly once).
- **Pages:** each of the 10 book pages gets a layout from `src/book/assignments.ts`, in a random order (shuffled once and fixed in code): page 1 `2-pp`, 2 `4-llpl`, 3 `5-pllpl`, 4 `3-pll`, 5 `1`, 6 `5-lplpl`, 7 `3-lpl`, 8 `2-ll`, 9 `4-pppl`, 10 `5-lllll`. Two different layouts for each of 2, 3, 4 and 5 placeholders, one single-placeholder page and a third 5-placeholder layout. All of these pass the 5 % format check. The captions on pages 5 and 7 are a demo setting.

### JSON format (as used by the files)
```json
{
  "id": "2-pl",
  "placeholderCount": 2,
  "orientations": ["portrait", "landscape"],
  "tags": [],
  "elements": [
    { "type": "placeholder", "col": 1, "row": 1, "colSpan": 10, "rowSpan": 12, "format": "9:16" },
    { "type": "spacer", "col": 11, "row": 1, "colSpan": 14, "rowSpan": 12 },
    { "type": "placeholder", "col": 1, "row": 13, "colSpan": 24, "rowSpan": 12, "format": "3:2" }
  ]
}
```
The file holds structure and metadata only. It contains no colors, sizes in px or fonts. Metadata (count, orientations, tags) allows automatic layout selection in the future.

## Text options
Both are computed by the renderer. They do not need extra JSON files and work with any layout.

**Option A, caption area (decided):** when the caption is on, the grid grows from 24 to **26 rows** (the same height as one row of the old 12-row grid). The caption occupies rows 25 and 26 across the full width. Placeholders keep their row spans, so the rows become slightly shorter. Measured in Figma: row height 73.85 px instead of 81 px, 6-row blocks 503 px instead of 546 px.
- No layout needs a free area at the bottom, so every layout works with a caption.
- **Accepted consequence:** with a caption, every placeholder becomes about 5 % to 8 % wider and shorter than its target format. The 5 % tolerance applies to the layout without a caption.
- Considered and rejected: placing the caption in the lowest free area of each layout (keeps exact shapes, but needs a free area at the bottom in every layout and forced a smaller single portrait).

**Text replaces a placeholder:** any placeholder can become a text area of exactly the same block. It contains the headline on top and the body text below, with a small inner padding (14 px in Figma).

**Every layout has the option of a caption** (on or off).

**Caption content (decided):** one line of caption-style text, as in the Figma example. The caption has no headline or body.

## Layout selection
Layouts are assigned to pages **in code or config** for now. No sidebar selection yet. Automatic selection from uploaded images is out of scope, but the layout metadata keeps it possible.

## Open items
- Reference page size 1080 × 1440 px (assumed, to confirm).
- Review the layouts with a high spacer share: `2-lp`, `2-pl`, `2-pp` (27 % to 29 %), `4-pllp` (19 %), `3-plp` and `4-lllp` (17 %), `3-lpl` and `3-ppp` (15 %). At the defaults two photos or several portraits cannot fill a page cleanly.
- Layout assignment for the 10 pages is a first proposal; the designer reviews and changes it.
- **Photos in the book:** the 31 photos in `src/assets/photos` (17 landscape, 14 portrait) fill the book only; the overview stays pink. `src/book/photos.ts` gives each placeholder, in reading order, the next photo of its orientation, in file-name order. The book has 34 placeholders (21 landscape, 12 portrait, 1 free-format that takes a portrait), so 4 landscape photos appear twice, at the end of the book. Portrait photos are listed by number in `photos.ts`; a new portrait photo needs its number added there. Photos are 1024 px wide and soft when zoomed far in.
- Text: the Caption style (font, size, weight, color, line height, letter spacing, alignment) is implemented. Headline, Body and turning a placeholder into a text area are not implemented yet.
