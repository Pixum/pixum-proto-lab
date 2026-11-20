import { useState } from 'react'
import { layouts, layoutsByCount } from '../layouts/library'
import { TOLERANCE_PERCENT } from '../layouts/checks'
import LayoutCard from './LayoutCard'
import styles from './LayoutOverview.module.css'

// Overview of every layout in the library, grouped by number of placeholders. View only.
export default function LayoutOverview() {
  const [caption, setCaption] = useState(false)
  const [guides, setGuides] = useState(true)

  return (
    <section className={styles.overview} aria-label="Layout overview">
      <header className={styles.header}>
        <h2 className={styles.title}>Layouts</h2>
        <p className={styles.sub}>{layouts.length} layouts</p>
        <ul className={styles.legend}>
          <li>
            <span className={`${styles.swatch} ${styles.swatchPlaceholder}`} />
            placeholder
          </li>
          <li>
            <span className={`${styles.swatch} ${styles.swatchSpacer}`} />
            spacer (invisible)
          </li>
          <li>
            <span className={`${styles.swatch} ${styles.swatchCaption}`} />
            caption
          </li>
          <li className={styles.ok}>within {TOLERANCE_PERCENT} % of the target format, all grid edges touched</li>
          <li className={styles.warn}>outside the limit, a grid edge not touched, or the grid not fully covered</li>
        </ul>
        <div className={styles.toggles}>
          <label className={styles.toggle}>
            <input type="checkbox" checked={caption} onChange={(e) => setCaption(e.target.checked)} />
            Caption (grid grows to 26 rows)
          </label>
          <label className={styles.toggle}>
            <input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} />
            Show grid and spacers
          </label>
        </div>
      </header>

      {layoutsByCount().map(([count, group]) => (
        <div key={count} className={styles.group}>
          <h3 className={styles.groupTitle}>
            {count} {count === 1 ? 'placeholder' : 'placeholders'}
            <span className={styles.groupCount}>{group.length}</span>
          </h3>
          <div className={styles.cards}>
            {group.map((layout) => (
              <LayoutCard key={layout.id} layout={layout} caption={caption} guides={guides} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
