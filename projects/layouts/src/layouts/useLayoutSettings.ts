import { useVariables } from '../variables/store'
import type { GridSettings } from './geometry'

export type LayoutSettings = GridSettings & { radius: number; background: string }

// The global variables that shape a layout, read from the central store.
export function useLayoutSettings(): LayoutSettings {
  const gap = useVariables((s) => s.values.gap as number)
  const paddingX = useVariables((s) => s.values.paddingX as number)
  const paddingY = useVariables((s) => s.values.paddingY as number)
  const radius = useVariables((s) => s.values.radius as number)
  const background = useVariables((s) => s.values.background as string)
  return { gap, paddingX, paddingY, radius, background }
}
