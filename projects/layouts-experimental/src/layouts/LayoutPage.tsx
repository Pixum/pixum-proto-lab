import { blockRect, CAPTION_ROWS, GRID_COLUMNS, gridLines, PAGE, rowCount } from './geometry'
import { useLayoutSettings } from './useLayoutSettings'
import { useTextStyle } from './useTextStyle'
import type { LayoutDef } from './types'
import styles from './LayoutPage.module.css'

// Position and size as percentages of the page, so the page scales with its width.
function percentStyle(rect: { left: number; top: number; width: number; height: number }) {
  return {
    left: `${(rect.left / PAGE.width) * 100}%`,
    top: `${(rect.top / PAGE.height) * 100}%`,
    width: `${(rect.width / PAGE.width) * 100}%`,
    height: `${(rect.height / PAGE.height) * 100}%`,
  }
}

type Props = {
  layout: LayoutDef
  caption?: boolean // adds the caption rows (grid grows to 26 rows)
  guides?: boolean // shows the grid cells and the spacers
  labels?: boolean // writes format and size into each placeholder
  photos?: string[] // photo URLs, one per placeholder in reading order; without them placeholders stay pink
}

// The layout renderer: draws one layout JSON on a page, using the global variables
// (gap, page padding, corner radius, background color). View only.
export default function LayoutPage({ layout, caption = false, guides = false, labels = false, photos }: Props) {
  const settings = useLayoutSettings()
  const captionStyle = useTextStyle('caption')
  const rows = rowCount(caption)
  const lines = gridLines(settings, rows)
  // The radius is in px on the 1080 px reference page; 1cqw is 1 % of the page's own width.
  const radius = `${(settings.radius / PAGE.width) * 100}cqw`
  // The photos follow the reading order of the placeholders: top to bottom, then left to right.
  const photoOf = new Map(
    layout.elements
      .filter((e) => e.type === 'placeholder')
      .sort((a, b) => a.row - b.row || a.col - b.col)
      .map((e, i) => [e, photos?.[i]] as const),
  )

  return (
    <div className={styles.page} style={{ background: settings.background }}>
      {guides && (
        // One element with one path for all guide lines (about 94 divs before): much cheaper to update while sliding.
        <svg className={styles.guideLines} viewBox={`0 0 ${PAGE.width} ${PAGE.height}`} preserveAspectRatio="none" aria-hidden="true">
          <path
            d={
              lines.x.map((x) => `M${x} ${settings.paddingY}V${PAGE.height - settings.paddingY}`).join('') +
              lines.y.map((y) => `M${settings.paddingX} ${y}H${PAGE.width - settings.paddingX}`).join('')
            }
          />
        </svg>
      )}

      {layout.elements.map((el, i) => {
        const style = percentStyle(blockRect(el, settings, rows))
        if (el.type === 'spacer') return guides ? <div key={i} className={styles.spacer} style={style} /> : null
        return (
          <div key={i} className={styles.placeholder} style={{ ...style, borderRadius: radius }}>
            {photoOf.get(el) && <img className={styles.photo} src={photoOf.get(el)} alt="" decoding="async" />}
            {labels && (
              <>
                {el.format ?? 'any format'}
                <br />
                {el.colSpan}×{el.rowSpan}
              </>
            )}
          </div>
        )
      })}

      {caption && (
        <div
          className={`${styles.caption} ${guides ? styles.captionGuide : ''}`}
          style={percentStyle(blockRect({ col: 1, row: rows - CAPTION_ROWS + 1, colSpan: GRID_COLUMNS, rowSpan: CAPTION_ROWS }, settings, rows))}
        >
          <span className={styles.captionText} style={captionStyle}>
            Caption
          </span>
        </div>
      )}
    </div>
  )
}
