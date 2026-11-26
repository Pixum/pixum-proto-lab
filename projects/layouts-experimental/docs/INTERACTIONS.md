# Interactions

User interactions and behavior. The canvas is view-only; all changes happen through the sidebar.

## Canvas
- Shows the whole book (10 pages in two rows), scaled to fit the free area beside the sidebar, maximum width 1600 px.
- Navigation (pan, zoom, focus on a page or spread) is **skipped for now**.
- No selecting, moving, resizing or editing of anything on the canvas.
- **Layouts button** (top-left corner of the canvas): opens an overview of all layouts, grouped by number of placeholders. The overview has a legend, a grid-and-spacers toggle, a headline toggle, a caption toggle and the rule checks per layout. While it is open, the button becomes a **Back** button with an arrow in front. Escape also closes it. The overview is view-only.

## Sidebar
- Floating glass panel on the right. Contains all global variables in collapsible groups (Layout, Background, Caption). See `VARIABLE_SYSTEM.md`.
- The page padding control has a link button: linked uses one slider for all sides, unlinked has separate horizontal and vertical sliders.
- The Body group also has a vertical alignment control (top, middle, bottom) for where the body text sits in its block.
- A Cliparts dropdown (None, A few, A lot) shows or hides the decorative cliparts on the book pages.
- Changes appear immediately. The configuration is saved automatically. The Reset button restores the defaults. Changing the background color also changes any text color that would fall below AA contrast (4.5:1) on it; see `VARIABLE_SYSTEM.md`.

## Layout selection
- Layouts are assigned to pages in code or config for now. The sidebar has no layout selector yet.
- Each layout can show a headline at the top and a caption at the bottom (each on or off). Also set in code or config for now.
