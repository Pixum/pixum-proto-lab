import type { ReactNode } from 'react'
import { useNumberDraft } from './useNumberDraft'
import styles from './Controls.module.css'

type Props = {
  label: string // for screen readers
  icon?: ReactNode
  value: number
  min: number
  max: number
  step: number
  unit?: string
  onChange: (value: number) => void
}

// A full-width number field with an optional icon in front and the unit behind.
export default function IconNumberField({ label, icon, value, min, max, step, unit, onChange }: Props) {
  const draft = useNumberDraft(value, min, max, onChange)
  return (
    <label className={styles.iconField}>
      {icon && <span className={styles.fieldIcon}>{icon}</span>}
      <input className={styles.iconInput} type="number" aria-label={label} min={min} max={max} step={step} {...draft} />
      {unit && <span className={styles.fieldUnit}>{unit}</span>}
    </label>
  )
}
