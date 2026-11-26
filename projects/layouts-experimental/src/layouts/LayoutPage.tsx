import { useState } from 'react'
import { blockRect, CAPTION_ROWS, GRID_COLUMNS, gridLines, HEADLINE_ROWS, rowCount, type PageSize } from './geometry'
import { useVariables } from '../variables/store'
import { useLayoutSettings } from './useLayoutSettings'
import { useTextStyle } from './useTextStyle'
import type { LayoutDef } from './types'
import styles from './LayoutPage.module.css'

// Sample text for every body text block, until real text exists.
const BODY_TEXT =
  'We packed the car early and drove into the hills, with no plan except to be outside. ' +
  'By noon we were climbing through the woods, and by evening everyone was tired, muddy and happy. ' +
  'It was the kind of day we will talk about for years.'

// Inner padding of a body text block: 14 px on the 1080 px reference page.
const BODY_PADDING = 14

// Clipart: 15 % of the page width, tilted 10° away from the center.
const CLIPART_WIDTH = 0.15
const CLIPART_TILT = 10

// Where a clipart goes, in px on the reference page: the center of a spacer, or the outer corner of a placeholder
// (the corner farthest from the page center, so it covers as little of the neighbouring photos as possible).
// `tilt` is -1 (leans left) or 1 (leans right): away from the center of the block, or of the page for a spacer.
function clipartPoint(rect: { left: number; top: number; width: number; height: number }, isSpacer: boolean, page: PageSize) {
  const cx = rect.left + rect.width / 2
  if (isSpacer) return { x: cx, y: rect.top + rect.height / 2, tilt: cx < page.width / 2 ? -1 : 1 }
  const corners = [
    [rect.left, rect.top],
    [rect.left + rect.width, rect.top],
    [rect.left, rect.top + rect.height],
    [rect.left + rect.width, rect.top + rect.height],
  ]
  const far = (c: number[]) => Math.hypot(c[0] - page.width / 2, c[1] - page.height / 2)
  const [x, y] = corners.reduce((best, c) => (far(c) > far(best) ? c : best))
  return { x, y, tilt: x < cx ? -1 : 1 }
}

// A clipart kept inside its page: the whole tilted image must fit, so near an edge it moves inward by the
// smallest amount instead of leaving the page. Needs the image's proportions, known once it has loaded.
function Clipart({ src, x, y, tilt, page }: { src: string; x: number; y: number; tilt: number; page: PageSize }) {
  const [ratio, setRatio] = useState<number>() // natural height / width
  const w = CLIPART_WIDTH * page.width
  const h = w * (ratio ?? 1)
  const a = (CLIPART_TILT * Math.PI) / 180
  // Size of the box around the tilted image.
  const boxW = w * Math.cos(a) + h * Math.sin(a)
  const boxH = w * Math.sin(a) + h * Math.cos(a)
  const cx = Math.min(Math.max(x, boxW / 2), page.width - boxW / 2)
  const cy = Math.min(Math.max(y, boxH / 2), page.height - boxH / 2)
  return (
    <img
      className={styles.clipart}
      src={src}
      alt=""
      onLoad={(e) => setRatio(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth || 1)}
      style={{
        left: `${(cx / page.width) * 100}%`,
        top: `${(cy / page.height) * 100}%`,
        width: `${CLIPART_WIDTH * 100}%`,
        transform: `translate(-50%, -50%) rotate(${tilt * CLIPART_TILT}deg)`,
        visibility: ratio ? 'visible' : 'hidden', // not before the size is known, so it never shows outside the page
      }}
    />
  )
}

const V_ALIGN = { top: 'flex-start', middle: 'center', bottom: 'flex-end' } as const

// Position and size as percentages of the page, so the page scales with its width.
function percentStyle(rect: { left: number; top: number; width: number; height: number }, page: PageSize) {
  return {
    left: `${(rect.left / page.width) * 100}%`,
    top: `${(rect.top / page.height) * 100}%`,
    width: `${(rect.width / page.width) * 100}%`,
    height: `${(rect.height / page.height) * 100}%`,
  }
}

type Props = {
  layout: LayoutDef
  headline?: boolean // adds the headline rows at the top (grid grows by 2 rows)
  caption?: boolean // adds the caption rows at the bottom (grid grows by 2 rows)
  bodyBlocks?: number[] // indexes in layout.elements of the placeholders or spacers that become body text
  clipart?: { src: string; block: number } // `block` is an index in layout.elements: centered in a spacer, on the outer corner of a placeholder
  guides?: boolean // shows the grid cells and the spacers
  labels?: boolean // writes format and size into each placeholder
  photos?: string[] // photo URLs, one per placeholder in reading order; without them placeholders stay pink
}

// The layout renderer: draws one layout JSON on a page, using the global variables
// (gap, page padding, corner radius, background color). View only.
export default function LayoutPage({ layout, headline = false, caption = false, bodyBlocks, clipart, guides = false, labels = false, photos }: Props) {
  const settings = useLayoutSettings()
  const page = settings.page
  const headlineStyle = useTextStyle('headline')
  const captionStyle = useTextStyle('caption')
  const bodyStyle = useTextStyle('body')
  const bodySize = useVariables((s) => s.values.bodySize as number)
  const bodyLineHeight = useVariables((s) => s.values.bodyLineHeight as number)
  const bodyVAlign = useVariables((s) => s.values.bodyVAlign as keyof typeof V_ALIGN)
  const rows = rowCount(caption, headline)
  const rowOffset = headline ? HEADLINE_ROWS : 0
  const lines = gridLines(settings, rows)
  // The radius is in px on the 1080 px reference page; 1cqw is 1 % of the page's own width.
  const radius = `${(settings.radius / page.width) * 100}cqw`
  // The photos follow the reading order of the placeholders: top to bottom, then left to right.
  const photoOf = new Map(
    layout.elements
      .filter((e) => e.type === 'placeholder')
      .sort((a, b) => a.row - b.row || a.col - b.col)
      .map((e, i) => [e, photos?.[i]] as const),
  )

  return (
    <div className={styles.page} style={{ background: settings.background, aspectRatio: `${page.width} / ${page.height}` }}>
      {guides && (
        // One element with one path for all guide lines (about 94 divs before): much cheaper to update while sliding.
        <svg className={styles.guideLines} viewBox={`0 0 ${page.width} ${page.height}`} preserveAspectRatio="none" aria-hidden="true">
          <path
            d={
              lines.x.map((x) => `M${x} ${settings.paddingY}V${page.height - settings.paddingY}`).join('') +
              lines.y.map((y) => `M${settings.paddingX} ${y}H${page.width - settings.paddingX}`).join('')
            }
          />
        </svg>
      )}

      {layout.elements.map((el, i) => {
        const rect = blockRect(el, settings, rows, rowOffset)
        const style = percentStyle(rect, page)
        if (bodyBlocks?.includes(i)) {
          // Clipped and truncated: only the lines that fit the block, the last one ends with an ellipsis.
          const fitting = Math.max(1, Math.floor((rect.height - 2 * BODY_PADDING) / (bodySize * bodyLineHeight)))
          return (
            <div
              key={i}
              className={`${styles.body} ${guides ? styles.textGuide : ''}`}
              style={{ ...style, alignItems: V_ALIGN[bodyVAlign], padding: `${(BODY_PADDING / page.width) * 100}cqw` }}
            >
              <div className={styles.bodyText} style={{ ...bodyStyle, WebkitLineClamp: fitting }}>
                {BODY_TEXT}
              </div>
            </div>
          )
        }
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

      {headline && (
        <div
          className={`${styles.headline} ${guides ? styles.textGuide : ''}`}
          style={percentStyle(blockRect({ col: 1, row: 1, colSpan: GRID_COLUMNS, rowSpan: HEADLINE_ROWS }, settings, rows), page)}
        >
          <span className={styles.headlineText} style={headlineStyle}>
            Time for a trip
          </span>
        </div>
      )}

      {caption && (
        <div
          className={`${styles.caption} ${guides ? styles.textGuide : ''}`}
          style={percentStyle(blockRect({ col: 1, row: rows - CAPTION_ROWS + 1, colSpan: GRID_COLUMNS, rowSpan: CAPTION_ROWS }, settings, rows), page)}
        >
          <span className={styles.captionText} style={captionStyle}>
            Our family trip in Bad Münstereifel
          </span>
        </div>
      )}

      {clipart && layout.elements[clipart.block] && (() => {
        const el = layout.elements[clipart.block]
        const p = clipartPoint(blockRect(el, settings, rows, rowOffset), el.type === 'spacer', page)
        return (
          <Clipart src={clipart.src} x={p.x} y={p.y} tilt={p.tilt} page={page} />
        )
      })()}
    </div>
  )
}
