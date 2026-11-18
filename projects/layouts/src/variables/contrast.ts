// WCAG contrast helpers for hex colors (#rrggbb).

const toRgb = (hex: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number]

// Relative luminance as defined by WCAG 2.
function luminance(hex: string) {
  const [r, g, b] = toRgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Contrast ratio from 1 to 21.
export function contrastRatio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

function toHsl(hex: string): [number, number, number] {
  const [r, g, b] = toRgb(hex)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = d / (1 - Math.abs(2 * l - 1))
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [(h * 60 + 360) % 360, s, l]
}

function fromHsl(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  return `#${[channel(0), channel(8), channel(4)].map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

// Returns the text color unchanged if it has at least `min` contrast (AA for normal text is 4.5) on the
// background. Otherwise keeps hue and saturation and moves the lightness the shortest way to reach it.
// Black or white always reaches at least 4.58:1 on any background, so the search always finds a color.
export function ensureContrast(text: string, background: string, min = 4.5) {
  if (contrastRatio(text, background) >= min) return text
  const [h, s, l] = toHsl(text)
  for (let step = 0.005; step <= 1.0001; step += 0.005) {
    for (const next of [l - step, l + step]) {
      if (next < 0 || next > 1) continue
      const candidate = fromHsl(h, s, next)
      if (contrastRatio(candidate, background) >= min) return candidate
    }
  }
  return contrastRatio('#000000', background) >= contrastRatio('#ffffff', background) ? '#000000' : '#ffffff'
}
