import type { LayoutDef } from './types'

// Every JSON file in ./library is part of the library. Adding a file adds a layout.
const modules = import.meta.glob<LayoutDef>('./library/*.json', { eager: true, import: 'default' })

const sequenceKey = (l: LayoutDef) => (l.id.split('-')[1] ?? '').replace(/p/g, '0').replace(/l/g, '1')

// Sorted by placeholder count, then by sequence with portrait before landscape (ppl, pll, lll).
export const layouts: LayoutDef[] = Object.values(modules).sort(
  (a, b) => a.placeholderCount - b.placeholderCount || sequenceKey(a).localeCompare(sequenceKey(b)),
)

export const layoutsById: Record<string, LayoutDef> = Object.fromEntries(layouts.map((l) => [l.id, l]))

// Layouts grouped by placeholder count, in ascending order.
export function layoutsByCount(): [number, LayoutDef[]][] {
  const groups = new Map<number, LayoutDef[]>()
  for (const l of layouts) groups.set(l.placeholderCount, [...(groups.get(l.placeholderCount) ?? []), l])
  return [...groups.entries()]
}
