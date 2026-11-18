import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ensureContrast } from './contrast'
import { defaultValues, variableKeys, variableSchema, type TextStyleDef, type VariableValue } from './schema'

// The stored color of every text style (headlineColor, bodyColor, captionColor).
const textColorKeys = variableSchema.filter((d): d is TextStyleDef => d.type === 'textStyle').map((d) => `${d.prefix}Color`)

type VariableStore = {
  values: Record<string, VariableValue>
  setValue: (id: string, value: VariableValue) => void
  setValues: (changes: Record<string, VariableValue>) => void // several values at once, e.g. linked padding
  reset: () => void
}

// One central configuration, auto-saved to localStorage.
export const useVariables = create<VariableStore>()(
  persist(
    (set) => ({
      values: defaultValues(),
      setValue: (id, value) =>
        set((s) => {
          const values = { ...s.values, [id]: value }
          // A new background must keep the text readable (WCAG AA, 4.5:1): text colors below it are adjusted.
          if (id === 'background') for (const key of textColorKeys) values[key] = ensureContrast(values[key] as string, value as string)
          return { values }
        }),
      setValues: (changes) => set((s) => ({ values: { ...s.values, ...changes } })),
      reset: () => set({ values: defaultValues() }),
    }),
    {
      name: 'layouts-prototype-variables',
      // Keep only variables that still exist and fill new ones with defaults,
      // so changing the schema never breaks a saved configuration.
      merge: (saved, current) => {
        const savedValues = (saved as Partial<VariableStore> | undefined)?.values ?? {}
        const values = defaultValues()
        for (const { key, default: fallback } of variableSchema.flatMap(variableKeys)) {
          if (typeof savedValues[key] === typeof fallback) values[key] = savedValues[key]
        }
        return { ...current, values }
      },
    },
  ),
)
