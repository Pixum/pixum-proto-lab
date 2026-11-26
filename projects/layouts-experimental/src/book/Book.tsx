import LayoutPage from '../layouts/LayoutPage'
import { layoutsById } from '../layouts/library'
import { useVariables } from '../variables/store'
import { pageAssignments } from './assignments'
import { clipartUrl } from './cliparts'
import { bookPhotos } from './photos'
import { PAGE_CM, PX_PER_CM, bookRows } from './structure'
import styles from './Book.module.css'

// The book: every page draws its assigned layout with the global variables.
export default function Book() {
  const cliparts = useVariables((s) => s.values.cliparts)
  return (
    <div
      className={styles.book}
      style={{
        '--page-width': `${PAGE_CM.width * PX_PER_CM}px`,
        '--page-height': `${PAGE_CM.height * PX_PER_CM}px`,
      } as React.CSSProperties}
    >
      {bookRows.map((row, r) => (
        <div className={styles.row} key={r}>
          {row.map((unit) => (
            <div className={styles.unit} key={unit.pages[0]}>
              {unit.pages.map((n) => {
                const assignment = pageAssignments[n]
                const layout = assignment && layoutsById[assignment.layout]
                const pageClipart = assignment?.clipart
                const showClipart = cliparts === 'A lot' || (cliparts === 'A few' && pageClipart?.from === 'few')
                const src = showClipart && pageClipart ? clipartUrl(pageClipart.file) : undefined
                return (
                  <figure className={styles.pageFigure} key={n}>
                    <div className={styles.page}>
                      {layout && <LayoutPage layout={layout} headline={assignment.headline} caption={assignment.caption} bodyBlocks={assignment.bodyBlocks} clipart={src && pageClipart ? { src, block: pageClipart.block } : undefined} photos={bookPhotos[n]} />}
                    </div>
                    <figcaption className={styles.number}>{n}</figcaption>
                  </figure>
                )
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
