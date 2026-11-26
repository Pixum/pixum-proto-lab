import { useVariables } from '../variables/store'
import type { PageFormatName } from './geometry'
import { libraries } from './library'

// The layout library of the page format chosen in the sidebar.
export function useLibrary() {
  return libraries[useVariables((s) => s.values.pageFormat as PageFormatName)] ?? libraries.Portrait
}
