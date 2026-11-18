import LayoutPage from '../layouts/LayoutPage'
import { layoutsById } from '../layouts/library'
import { pageAssignments } from './assignments'
import { bookPhotos } from './photos'
import { PAGE_CM, PX_PER_CM, bookRows } from './structure'
import styles from './Book.module.css'

// The book: every page draws its assigned layout with the global variables.
export default function Book() {
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
                return (
                  <figure className={styles.pageFigure} key={n}>
                    <div className={styles.page}>
                      {layout && <LayoutPage layout={layout} caption={assignment.caption} photos={bookPhotos[n]} />}
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
