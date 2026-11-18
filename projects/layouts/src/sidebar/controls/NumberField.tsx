import { useNumberDraft } from './useNumberDraft'
import styles from './Controls.module.css'

type Props = {
  id?: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  arrows?: boolean // show the up/down arrows
  onChange: (value: number) => void
}

// Typed number input with the unit beside it. See useNumberDraft for the typing behaviour.
export default function NumberField({ id, value, min, max, step, unit, arrows = true, onChange }: Props) {
  const draft = useNumberDraft(value, min, max, onChange)
  return (
    <span className={styles.numberWrap}>
      <input
        id={id}
        className={`${styles.field} ${styles.number} ${arrows ? styles.arrows : styles.noArrows}`}
        type="number"
        min={min}
        max={max}
        step={step}
        {...draft}
      />
      {unit && <span className={styles.unit}>{unit}</span>}
    </span>
  )
}
