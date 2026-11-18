import { useEffect, useState } from 'react'
import styles from './Controls.module.css'

const HEX = /^#?([0-9a-f]{6})$/i

// Hex text input. Applies a value once it is a complete 6-digit hex code;
// reverts to the current color if left invalid.
export default function HexField({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  const [draft, setDraft] = useState(value)
  useEffect(() => setDraft(value), [value])

  return (
    <input
      className={`${styles.field} ${styles.hex}`}
      type="text"
      aria-label="Hex color"
      spellCheck={false}
      maxLength={7}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value)
        const m = HEX.exec(e.target.value.trim())
        if (m) onChange(`#${m[1].toLowerCase()}`)
      }}
      onBlur={() => setDraft(value)}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
    />
  )
}
