import type { ReactNode } from 'react'
import { FONT_FAMILIES, FONT_WEIGHTS, TEXT_STYLE_RANGES, type TextAlign, type TextStyleDef } from '../../variables/schema'
import { useVariables } from '../../variables/store'
import HexField from './HexField'
import IconNumberField from './IconNumberField'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, LetterSpacingIcon, LineHeightIcon } from './TextStyleIcons'
import styles from './Controls.module.css'

const WEIGHTS: [number, string][] = [
  [100, 'Thin'],
  [200, 'ExtraLight'],
  [300, 'Light'],
  [400, 'Regular'],
  [500, 'Medium'],
  [600, 'SemiBold'],
  [700, 'Bold'],
  [800, 'ExtraBold'],
  [900, 'Black'],
]

const ALIGNMENTS: { value: TextAlign; label: string; icon: ReactNode }[] = [
  { value: 'left', label: 'Align left', icon: <AlignLeftIcon /> },
  { value: 'center', label: 'Align center', icon: <AlignCenterIcon /> },
  { value: 'right', label: 'Align right', icon: <AlignRightIcon /> },
]

// One of the seven values behind a text style, e.g. captionSize.
const useStyleValue = <T extends string | number>(prefix: string, key: string) =>
  useVariables((s) => s.values[`${prefix}${key}`] as T)

// One global text style in a compact layout: font, weight and size, line height and letter spacing,
// alignment, color. Reads and writes the seven variables behind the style (see TextStyleDef).
export default function TextStyleControl({ def }: { def: TextStyleDef }) {
  const p = def.prefix
  const setValue = useVariables((s) => s.setValue)
  const setValues = useVariables((s) => s.setValues)
  const set = (key: string) => (v: string | number) => setValue(`${p}${key}`, v)

  const font = useStyleValue<string>(p, 'Font')
  const size = useStyleValue<number>(p, 'Size')
  const weight = useStyleValue<number>(p, 'Weight')
  const color = useStyleValue<string>(p, 'Color')
  const lineHeight = useStyleValue<number>(p, 'LineHeight')
  const letterSpacing = useStyleValue<number>(p, 'LetterSpacing')
  const align = useStyleValue<TextAlign>(p, 'Align')

  // Only the weights the chosen font has. A font change keeps the weight if it exists, otherwise takes the nearest one.
  const weights = FONT_WEIGHTS[font] ?? FONT_WEIGHTS.Inter
  const changeFont = (next: string) => {
    const available = FONT_WEIGHTS[next]
    const nearest = available.reduce((a, b) => (Math.abs(b - weight) < Math.abs(a - weight) ? b : a))
    setValues({ [`${p}Font`]: next, [`${p}Weight`]: nearest })
  }

  return (
    <div className={styles.textStyle}>
      <select
        className={`${styles.field} ${styles.select} ${styles.wide}`}
        aria-label="Font"
        value={font}
        onChange={(e) => changeFont(e.target.value)}
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>

      <div className={styles.weightSize}>
        <select
          className={`${styles.field} ${styles.select} ${styles.wide}`}
          aria-label="Weight"
          value={weight}
          onChange={(e) => set('Weight')(Number(e.target.value))}
        >
          {WEIGHTS.filter(([w]) => weights.includes(w)).map(([w, name]) => (
            <option key={w} value={w}>
              {name}
            </option>
          ))}
        </select>
        <IconNumberField label="Size" value={size} {...TEXT_STYLE_RANGES.size} unit="px" onChange={set('Size')} />
      </div>

      <div className={styles.twoCols}>
        <div className={styles.labelled}>
          <span className={styles.label}>Line height</span>
          <IconNumberField
            label="Line height"
            icon={<LineHeightIcon />}
            value={lineHeight}
            {...TEXT_STYLE_RANGES.lineHeight}
            onChange={set('LineHeight')}
          />
        </div>
        <div className={styles.labelled}>
          <span className={styles.label}>Letter spacing</span>
          <IconNumberField
            label="Letter spacing"
            icon={<LetterSpacingIcon />}
            value={letterSpacing}
            {...TEXT_STYLE_RANGES.letterSpacing}
            unit="px"
            onChange={set('LetterSpacing')}
          />
        </div>
      </div>

      <div className={styles.labelled}>
        <span className={styles.label}>Alignment</span>
        <div className={styles.segmented} role="group" aria-label="Alignment">
          {ALIGNMENTS.map((a) => (
            <button
              key={a.value}
              type="button"
              className={styles.segment}
              aria-pressed={align === a.value}
              aria-label={a.label}
              onClick={() => set('Align')(a.value)}
            >
              {a.icon}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Color</span>
        <div className={styles.colorWrap}>
          <HexField value={color} onChange={set('Color')} />
          <input
            className={styles.swatch}
            type="color"
            aria-label="Color"
            value={color}
            onChange={(e) => set('Color')(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
