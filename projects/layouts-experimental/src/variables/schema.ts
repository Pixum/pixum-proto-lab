// The single list that defines every global variable.
// The sidebar draws its controls from this list; adding a variable = adding one entry.
// Defaults and ranges follow docs/VARIABLE_SYSTEM.md. All px values are measured on the 1080 × 1440 px reference page.

export type VariableValue = number | boolean | string

type Base = { id: string; label: string; group: string }

export type LinkedPairDef = Base & {
  type: 'linkedPair'
  // Two numbers (e.g. horizontal and vertical padding) that can be linked into one.
  // `id` holds the linked state (boolean); the two numbers are stored under firstId and secondId.
  firstId: string
  secondId: string
  firstLabel: string
  secondLabel: string
  min: number
  max: number
  step: number
  unit?: string
  default: { linked: boolean; first: number; second: number }
}

export type VariableDef = Base &
  (
    | { type: 'slider'; default: number; min: number; max: number; step: number; unit?: string }
    | { type: 'number'; default: number; min: number; max: number; step: number; unit?: string }
    | { type: 'toggle'; default: boolean }
    | { type: 'select'; default: string; options: string[] }
    | { type: 'color'; default: string }
  )

// One global text style (Headline, Body or Caption): seven properties in one compact control.
// Ids are prefixed with `prefix`: <prefix>Font, Size, Weight, Color, LineHeight, LetterSpacing, Align.
// Sizes are px on the 1080 px reference page.
export type TextAlign = 'left' | 'center' | 'right'
export type VAlign = 'top' | 'middle' | 'bottom'
export type TextStyleDef = Base & {
  type: 'textStyle'
  prefix: string
  default: {
    font: string
    size: number
    weight: number
    color: string
    lineHeight: number // times the font size
    letterSpacing: number // px
    align: TextAlign
    valign?: VAlign // only for styles in a box with room to spare (Body): adds <prefix>VAlign
  }
}

export type AnyVariableDef = VariableDef | LinkedPairDef | TextStyleDef

// Fonts available in the project (src/assets/fonts) and the weights each one has (see src/styles/fonts.css).
const ALL_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900]
export const FONT_WEIGHTS: Record<string, number[]> = {
  Inter: ALL_WEIGHTS,
  'Geist Mono': ALL_WEIGHTS,
  Ballet: [400],
  'Bricolage Grotesque': [700, 800],
  'Charis SIL': [400, 700],
  'Instrument Serif': [400],
  'Luckiest Guy': [400],
}
export const FONT_FAMILIES = Object.keys(FONT_WEIGHTS)

// Allowed values of a text style.
export const TEXT_STYLE_RANGES = {
  size: { min: 8, max: 72, step: 1 },
  lineHeight: { min: 0.8, max: 2.4, step: 0.05 },
  letterSpacing: { min: -2, max: 10, step: 0.1 },
}

export const variableSchema: AnyVariableDef[] = [
  // How many pages show their clipart (see docs/LAYOUT_SPECIFICATIONS.md, "Cliparts"). First, so its group is on top of the sidebar.
  { id: 'cliparts', label: 'Cliparts', group: 'Cliparts', type: 'select', default: 'None', options: ['None', 'A few', 'A lot'] },
  // Gap between placeholders; also the gutter of the 12 × 12 grid.
  { id: 'gap', label: 'Gap', group: 'Layout', type: 'slider', default: 34, min: 0, max: 60, step: 1, unit: 'px' },
  // Maximum 210 px: with the maximum gap (60 px) the 12 columns still fit inside the page.
  // Default is linked at 86 px. Equal padding makes the content area taller, so placeholder shapes drift from
  // their target formats (see LAYOUT_SPECIFICATIONS.md).
  {
    id: 'padding',
    label: 'Page padding',
    group: 'Layout',
    type: 'linkedPair',
    firstId: 'paddingX',
    secondId: 'paddingY',
    firstLabel: 'Horizontal',
    secondLabel: 'Vertical',
    min: 0,
    max: 210,
    step: 1,
    unit: 'px',
    default: { linked: true, first: 86, second: 86 },
  },
  { id: 'radius', label: 'Corner radius', group: 'Layout', type: 'slider', default: 0, min: 0, max: 60, step: 1, unit: 'px' },
  { id: 'background', label: 'Background color', group: 'Background', type: 'color', default: '#ffffff' },
    {
    id: 'headline',
    label: 'Headline',
    group: 'Headline',
    type: 'textStyle',
    prefix: 'headline',
    default: { font: 'Inter', size: 64, weight: 800, color: '#111111', lineHeight: 0.95, letterSpacing: -0.4, align: 'left' },
  },
  {
    id: 'body',
    label: 'Body',
    group: 'Body',
    type: 'textStyle',
    prefix: 'body',
    default: { font: 'Inter', size: 21, weight: 400, color: '#111111', lineHeight: 1.5, letterSpacing: 0, align: 'left', valign: 'middle' },
  },
    {
    id: 'caption',
    label: 'Caption',
    group: 'Caption',
    type: 'textStyle',
    prefix: 'caption',
    default: { font: 'Inter', size: 16, weight: 400, color: '#262626', lineHeight: 1.4, letterSpacing: 0, align: 'center' },
  },
]

// Every stored value behind one variable definition (a linked pair stores three, a text style seven).
export function variableKeys(def: AnyVariableDef): { key: string; default: VariableValue; unit?: string }[] {
  if (def.type === 'linkedPair') {
    return [
      { key: def.id, default: def.default.linked },
      { key: def.firstId, default: def.default.first, unit: def.unit },
      { key: def.secondId, default: def.default.second, unit: def.unit },
    ]
  }
  if (def.type === 'textStyle') {
    const p = def.prefix
    return [
      { key: `${p}Font`, default: def.default.font },
      { key: `${p}Size`, default: def.default.size, unit: 'px' },
      { key: `${p}Weight`, default: def.default.weight },
      { key: `${p}Color`, default: def.default.color },
      { key: `${p}LineHeight`, default: def.default.lineHeight },
      { key: `${p}LetterSpacing`, default: def.default.letterSpacing, unit: 'px' },
      { key: `${p}Align`, default: def.default.align },
      ...(def.default.valign ? [{ key: `${p}VAlign`, default: def.default.valign }] : []),
    ]
  }
  return [{ key: def.id, default: def.default, unit: 'unit' in def ? def.unit : undefined }]
}

export const defaultValues = (): Record<string, VariableValue> =>
  Object.fromEntries(variableSchema.flatMap(variableKeys).map((k) => [k.key, k.default]))
