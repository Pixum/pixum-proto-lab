import type { LinkedPairDef } from '../../variables/schema'
import { useVariables } from '../../variables/store'
import NumberField from './NumberField'
import styles from './Controls.module.css'

// Two sliders (e.g. horizontal and vertical padding) with a link button.
// Linked: one slider sets both. Unlinked: two separate sliders.
export default function LinkedPairControl({ def }: { def: LinkedPairDef }) {
  const linked = useVariables((s) => s.values[def.id] as boolean)
  const first = useVariables((s) => s.values[def.firstId] as number)
  const second = useVariables((s) => s.values[def.secondId] as number)
  const setValues = useVariables((s) => s.setValues)

  // Linking takes the first (horizontal) value for both.
  const toggleLink = () =>
    setValues(linked ? { [def.id]: false } : { [def.id]: true, [def.secondId]: first })

  // Same look as the single sliders (e.g. Gap): label, slider, value field.
  const sliderRow = (label: string, value: number, onChange: (n: number) => void) => (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <div className={styles.sliderWrap}>
        <input
          className={styles.slider}
          type="range"
          aria-label={`${def.label}: ${label}`}
          min={def.min}
          max={def.max}
          step={def.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <NumberField value={value} min={def.min} max={def.max} step={def.step} unit={def.unit} arrows={false} onChange={onChange} />
      </div>
    </div>
  )

  return (
    <div className={styles.pair}>
      <div className={styles.row}>
        <span className={styles.label}>{def.label}</span>
        <button
          type="button"
          className={styles.link}
          aria-pressed={linked}
          aria-label={linked ? 'Unlink: set horizontal and vertical separately' : 'Link: use one value for all sides'}
          title={linked ? 'Linked: one value for all sides' : 'Unlinked: horizontal and vertical'}
          onClick={toggleLink}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d={
                linked
                  ? 'M7 5H5.5a3 3 0 0 0 0 6H7M9 5h1.5a3 3 0 0 1 0 6H9M6 8h4'
                  : 'M6 5H4.5a3 3 0 0 0 0 6H6M10 5h1.5a3 3 0 0 1 0 6H10'
              }
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {linked ? (
        sliderRow('All sides', first, (n) => setValues({ [def.firstId]: n, [def.secondId]: n }))
      ) : (
        <>
          {sliderRow(def.firstLabel, first, (n) => setValues({ [def.firstId]: n }))}
          {sliderRow(def.secondLabel, second, (n) => setValues({ [def.secondId]: n }))}
        </>
      )}
    </div>
  )
}
