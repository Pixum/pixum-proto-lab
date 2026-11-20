import { useEffect, useRef } from 'react'
import { variableKeys, variableSchema } from './schema'
import { useVariables } from './store'

// Publishes every variable as a CSS custom property (--v-<id>) so any page can read it.
export function useCssVariables() {
  const values = useVariables((s) => s.values)
  // Last written values: every write on <html> invalidates the styles of the whole page, so unchanged ones are skipped.
  const written = useRef<Record<string, string>>({})
  useEffect(() => {
    const root = document.documentElement
    for (const { key, unit } of variableSchema.flatMap(variableKeys)) {
      const css = `${values[key]}${unit ?? ''}`
      if (written.current[key] === css) continue
      root.style.setProperty(`--v-${key}`, css)
      written.current[key] = css
    }
  }, [values])
}
