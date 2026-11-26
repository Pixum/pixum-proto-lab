import type { CSSProperties } from 'react'
import { useVariables } from '../variables/store'
import { useLayoutSettings } from './useLayoutSettings'

// CSS for one global text style (e.g. 'caption'), read from the variables.
// Sizes are px on the reference page (see pageFormats), so they are written in cqw (1 % of the page's own width)
// and scale with the page. Use inside a LayoutPage.
export function useTextStyle(prefix: string): CSSProperties {
  const font = useVariables((s) => s.values[`${prefix}Font`] as string)
  const size = useVariables((s) => s.values[`${prefix}Size`] as number)
  const weight = useVariables((s) => s.values[`${prefix}Weight`] as number)
  const color = useVariables((s) => s.values[`${prefix}Color`] as string)
  const lineHeight = useVariables((s) => s.values[`${prefix}LineHeight`] as number)
  const letterSpacing = useVariables((s) => s.values[`${prefix}LetterSpacing`] as number)
  const align = useVariables((s) => s.values[`${prefix}Align`] as CSSProperties['textAlign'])
  const pageWidth = useLayoutSettings().page.width
  const cqw = (px: number) => `${(px / pageWidth) * 100}cqw`
  return {
    fontFamily: `'${font}', system-ui, sans-serif`,
    fontSize: cqw(size),
    fontWeight: weight,
    color,
    lineHeight,
    letterSpacing: cqw(letterSpacing),
    textAlign: align,
  }
}
