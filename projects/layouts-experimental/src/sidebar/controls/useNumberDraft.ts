import { useEffect, useState, type KeyboardEvent } from 'react'

// Typing behaviour shared by every number field. Keeps its own draft text so you can type freely
// (e.g. "1" on the way to "150"), applies valid in-range values live,
// and clamps to min/max when you leave the field. Enter confirms.
export function useNumberDraft(value: number, min: number, max: number, onChange: (value: number) => void) {
  const [draft, setDraft] = useState(String(value))
  useEffect(() => setDraft(String(value)), [value])

  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  const commit = (text: string) => {
    const n = Number(text)
    if (text.trim() === '' || Number.isNaN(n)) return false
    onChange(clamp(n))
    return true
  }

  // Props to spread onto an <input type="number">.
  return {
    value: draft,
    onChange: (e: { target: HTMLInputElement }) => {
      setDraft(e.target.value)
      const n = e.target.valueAsNumber
      if (n >= min && n <= max) commit(e.target.value)
    },
    onBlur: () => {
      if (!commit(draft)) setDraft(String(value))
      else setDraft(String(clamp(Number(draft))))
    },
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && e.currentTarget.blur(),
  }
}
