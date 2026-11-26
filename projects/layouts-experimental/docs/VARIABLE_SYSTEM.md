# Variable System

Variable definitions and behavior. Status: the layout, background and typography variables are implemented in the sidebar. Items marked **TBD** are not decided.

Rule: one central set of global variables controls every layout. No page-specific overrides. Layout JSON files never contain these values.

All px values are measured on the 1080 × 1440 px reference page (see `LAYOUT_SPECIFICATIONS.md`). The list lives in `src/variables/schema.ts`.

## Layout (implemented)
| Variable | Control | Range | Default | Notes |
|---|---|---|---|---|
| Gap | slider + number | 0–60 px | 34 px | Space between placeholders and the grid gutter. |
| Page padding horizontal (left and right) | slider + number | 0–210 px | 86 px | See below. |
| Page padding vertical (top and bottom) | slider + number | 0–210 px | 86 px | |
| Placeholder corner radius | slider + number | 0–60 px | 0 px | Square corners. |

**Page padding:** one control with a link button. The default state is **linked** at 86 px on all sides, so it shows one slider, "All sides"; moving it changes both values. Unlinking keeps the values and shows two sliders (horizontal and vertical), each with a value field, like the Gap. Linking sets both values to the horizontal value. The grid shapes depend on gap and padding, and the layouts are drawn for these defaults (see "Known limit" in `LAYOUT_SPECIFICATIONS.md`).

The ranges are chosen so every combination fits: at the maximum gap (60 px) and the maximum padding (210 px) all 95 layouts stay inside the page, with and without the caption. Above 210 px of padding the grid would no longer fit next to a 60 px gap. The grid is 24 × 24; block sizes are computed from the grid step (cell plus gap), so a block never gets negative, and the layouts for 6 to 9 placeholders only use blocks of at least 3 columns × 2 rows. At the extremes the smallest old blocks (one old cell, now 2 × 2 fine cells) shrink to 0 px, as they did on the 12-column grid.

## Background (implemented)
| Variable | Control | Default |
|---|---|---|
| Background color | color (hex field and swatch) | `#ffffff` (white, as in the Figma examples) |

**Contrast (text stays readable):** when the background color changes, every text color (Headline, Body, Caption) is checked against it. A color below WCAG AA contrast, **4.5:1** for all three styles, is **overwritten** in the sidebar with the nearest accessible shade: same hue and saturation, only the lightness moves, by the smallest amount that reaches 4.5:1. Colors that already pass stay as they are. The helper is `src/variables/contrast.ts`; the check runs in `setValue` of the store (`src/variables/store.ts`). Limits: the original text colors are not remembered, so going from a dark background back to white leaves a mid-gray text color (use Reset for the defaults); a low-contrast text color picked by hand is not corrected; text over photos is not checked.

## Cliparts (implemented)
| Variable | Control | Options | Default |
|---|---|---|---|
| Cliparts | dropdown | None, A few, A lot | None |

None hides all cliparts. A few shows them on about every third page (pages 2, 5 and 8), A lot on every page. The size (15 % of the page width) and the tilt (10°) are fixed, not variables. See `LAYOUT_SPECIFICATIONS.md`, "Cliparts".

## Typography
Three independent global text styles: **Headline**, **Body**, **Caption**. All three use the same properties (defined in `src/variables/schema.ts`). They are stored and saved, The Headline and Caption styles are shown on pages that have a headline or caption area; body text appears in blocks that replace a placeholder or spacer (see `LAYOUT_SPECIFICATIONS.md`). The vertical alignment (stored as `bodyVAlign`) says where the body text sits inside its block; Headline and Caption have no such setting.

Each style has these properties:

| Property | Control | Range |
|---|---|---|
| Font | full-width dropdown | Inter, Geist Mono, Ballet, Bricolage Grotesque, Charis SIL, Instrument Serif, Luckiest Guy (the fonts in `src/assets/fonts`; declared in `src/styles/fonts.css`) |
| Weight | dropdown with names | Only the weights the chosen font has, out of Thin, ExtraLight, Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black (100–900). Inter and Geist Mono have all nine; Ballet, Instrument Serif and Luckiest Guy only Regular; Charis SIL Regular and Bold; Bricolage Grotesque Bold and ExtraBold. Changing the font keeps the weight if the new font has it, otherwise takes the nearest one. |
| Size | number field | 8–72 px |
| Line height | number field with icon | 0.8–2.4 (times the size) |
| Letter spacing | number field with icon | −2 to 10 px |
| Alignment | three buttons (left, center, right) | left, center, right |
| Vertical alignment (**Body only**) | three buttons (top, middle, bottom) | top, middle, bottom |
| Color | hex field + swatch | any |

Defaults:

| Style | Font | Weight | Size | Line height | Letter spacing | Alignment | Color |
|---|---|---|---|---|---|---|---|
| Headline | Inter | ExtraBold (800) | 64 px | 0.95 | −0.4 px | left | `#111111` |
| Body | Inter | Regular (400) | 21 px | 1.5 | 0 px | left | `#111111` (vertical alignment: middle) |
| Caption | Inter | Regular (400) | 16 px | 1.4 | 0 px | center | `#262626` |

The sidebar control follows the Typography panel in Figma: font on top, weight and size side by side, line height and letter spacing as icon fields, alignment as a button group, and the color row underneath. Vertical alignment (top, middle, bottom) is not included because the spec does not define it.

Sizes are px on the 1080 px reference page, so text scales with the page like every other variable. The caption area is one line with a 14 px inner padding; the caption text is a dummy sentence for now ("Our family trip in Bad Münstereifel").

## Not variables
- Placeholder color (light pink): a fixed preview style, not a variable. Placeholders are replaced by photos later.
- Layout assignment per page and the caption on/off per page: structure, set in `src/book/assignments.ts` for now. See `LAYOUT_SPECIFICATIONS.md`.

## Behavior
- Changing a variable updates every layout immediately: the book pages and the layout overview.
- The configuration is saved automatically and restored after a refresh.
- Reset restores the defaults above.
- New variables are added by adding one entry to the variable list (`src/variables/schema.ts`). The linked pair is its own control type.
