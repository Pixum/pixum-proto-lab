import { useEffect } from 'react'
import { variableKeys, variableSchema } from './schema'
import { useVariables } from './store'

// Publishes every variable as a CSS custom property (--v-<id>) so any page can read it.
export function useCssVariables() {
  const values = useVariables((s) => s.values)
  useEffect(() => {
    const root = document.documentElement
    for (const { key, unit } of variableSchema.flatMap(variableKeys)) {
      root.style.setProperty(`--v-${key}`, `${values[key]}${unit ?? ''}`)
    }
  }, [values])
}
