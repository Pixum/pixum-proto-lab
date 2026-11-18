import { useId } from 'react'
import type { AnyVariableDef } from '../../variables/schema'
import { useVariables } from '../../variables/store'
import HexField from './HexField'
import LinkedPairControl from './LinkedPairControl'
import NumberField from './NumberField'
import TextStyleControl from './TextStyleControl'
import styles from './Controls.module.css'

// Renders the right control for one variable definition, wired to the central store.
export default function Control({ def }: { def: AnyVariableDef }) {
  const id = useId()
  const value = useVariables((s) => s.values[def.id])
  const setValue = useVariables((s) => s.setValue)
  if (def.type === 'linkedPair') return <LinkedPairControl def={def} />
  if (def.type === 'textStyle') return <TextStyleControl def={def} />
  const label = (
    <label className={styles.label} htmlFor={id}>
      {def.label}
    </label>
  )

  switch (def.type) {
    case 'slider':
      return (
        <div className={styles.row}>
          {label}
          <div className={styles.sliderWrap}>
            <input
              id={id}
              className={styles.slider}
              type="range"
              min={def.min}
              max={def.max}
              step={def.step}
              value={value as number}
              onChange={(e) => setValue(def.id, Number(e.target.value))}
            />
            <NumberField
              value={value as number}
              min={def.min}
              max={def.max}
              step={def.step}
              unit={def.unit}
              arrows={false}
              onChange={(n) => setValue(def.id, n)}
            />
          </div>
        </div>
      )
    case 'number':
      return (
        <div className={styles.row}>
          {label}
          <NumberField
            id={id}
            value={value as number}
            min={def.min}
            max={def.max}
            step={def.step}
            unit={def.unit}
            onChange={(n) => setValue(def.id, n)}
          />
        </div>
      )
    case 'toggle':
      return (
        <div className={styles.row}>
          {label}
          <button
            id={id}
            type="button"
            role="switch"
            aria-checked={value as boolean}
            className={styles.toggle}
            onClick={() => setValue(def.id, !value)}
          />
        </div>
      )
    case 'select':
      return (
        <div className={styles.row}>
          {label}
          <select
            id={id}
            className={`${styles.field} ${styles.select}`}
            value={value as string}
            onChange={(e) => setValue(def.id, e.target.value)}
          >
            {def.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      )
    case 'color':
      return (
        <div className={styles.row}>
          {label}
          <div className={styles.colorWrap}>
            <HexField value={value as string} onChange={(hex) => setValue(def.id, hex)} />
            <input
              id={id}
              className={styles.swatch}
              type="color"
              value={value as string}
              onChange={(e) => setValue(def.id, e.target.value)}
            />
          </div>
        </div>
      )
  }
}
