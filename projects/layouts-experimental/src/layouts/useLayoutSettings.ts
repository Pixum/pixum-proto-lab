import { useDeferredValue, useMemo } from 'react'
import { useVariables } from '../variables/store'
import { pageFormats, type GridSettings, type PageFormatName } from './geometry'

export type LayoutSettings = GridSettings & { radius: number; background: string }

// The global variables that shape a layout, read from the central store.
export function useLayoutSettings(): LayoutSettings {
  const gap = useVariables((s) => s.values.gap as number)
  const paddingX = useVariables((s) => s.values.paddingX as number)
  const paddingY = useVariables((s) => s.values.paddingY as number)
  const radius = useVariables((s) => s.values.radius as number)
  const background = useVariables((s) => s.values.background as string)
  const format = useVariables((s) => s.values.pageFormat as PageFormatName)
  const page = pageFormats[format]?.px ?? pageFormats.Portrait.px
  const settings = useMemo(
    () => ({ gap, paddingX, paddingY, radius, background, page }),
    [gap, paddingX, paddingY, radius, background, page],
  )
  // Deferred: the sidebar follows the pointer at once, the pages catch up in a background render
  // (and skip values that were already replaced), so a slow canvas never blocks the slider.
  return useDeferredValue(settings)
}
