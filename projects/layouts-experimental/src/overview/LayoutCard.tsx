import { checkLayout } from '../layouts/checks'
import { rowCount } from '../layouts/geometry'
import LayoutPage from '../layouts/LayoutPage'
import { useLayoutSettings } from '../layouts/useLayoutSettings'
import type { LayoutDef } from '../layouts/types'
import styles from './LayoutOverview.module.css'

const title = (l: LayoutDef) =>
  l.orientations[0] === 'any' ? 'portrait or landscape' : l.orientations.join(' + ')

type Props = { layout: LayoutDef; headline: boolean; caption: boolean; guides: boolean }

// One layout on a page, with its rule checks underneath. Reacts to the global variables. View only.
export default function LayoutCard({ layout, headline, caption, guides }: Props) {
  const settings = useLayoutSettings()
  const report = checkLayout(layout, settings, rowCount(caption, headline))
  const edgesOk = Object.values(report.edges).every(Boolean)
  const { outOfBounds, overlappingCells, emptyCells } = report.structure
  const structureOk = outOfBounds + overlappingCells + emptyCells === 0

  return (
    <figure className={styles.card}>
      <figcaption className={styles.cardTitle}>
        {title(layout)}
        <span className={styles.cardId}>{layout.id}</span>
      </figcaption>

      <LayoutPage layout={layout} headline={headline} caption={caption} guides={guides} labels />

      <div className={styles.checks}>
        {report.placeholders.map((p, i) => (
          <div key={i} className={p.withinTolerance ? styles.ok : styles.warn}>
            {p.format
              ? `${p.format} target · ${p.ratio.toFixed(2)} actual · ${p.deviation! >= 0 ? '+' : ''}${p.deviation!.toFixed(1)} %`
              : `no target format · ${p.ratio.toFixed(2)} wide to tall`}
          </div>
        ))}
        {report.readingOrder && (
          <div className={report.readingOrder.matches ? styles.ok : styles.warn}>
            reading order: {report.readingOrder.sequence.toUpperCase().split('').join(' ')}{' '}
            {report.readingOrder.matches ? '✓' : `✗ expected ${report.readingOrder.expected.toUpperCase()}`}
          </div>
        )}
        <div className={edgesOk ? styles.ok : styles.warn}>
          edges:{' '}
          {Object.entries(report.edges)
            .map(([side, touched]) => `${touched ? '✓' : '✗'} ${side}`)
            .join('  ')}
        </div>
        <div className={structureOk ? styles.ok : styles.warn}>
          {structureOk
            ? 'grid: every cell used once ✓'
            : `grid: ✗ ${overlappingCells} overlapping, ${emptyCells} empty, ${outOfBounds} outside`}
        </div>
        <div>spacers: {Math.round(report.spacerShare * 100)} % of the grid</div>
      </div>
    </figure>
  )
}
