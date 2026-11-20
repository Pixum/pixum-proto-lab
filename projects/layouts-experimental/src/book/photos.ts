import { layoutsById } from '../layouts/library'
import { pageAssignments } from './assignments'

// Photos for the book placeholders (src/assets/photos). Only the book uses them; the Layouts overview stays pink.
const urls = import.meta.glob<string>('../assets/photos/*.webp', { eager: true, query: '?url', import: 'default' })

// shortcut: the file does not tell its orientation without loading it, so the portrait photos are listed by
// number (the last part of the file name). A new portrait photo needs its number added here.
const PORTRAIT_NUMBERS = new Set([141, 142, 143, 144, 146, 151, 154, 155, 164, 172, 174, 175, 182, 183])

const photos = Object.entries(urls)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({ url, portrait: PORTRAIT_NUMBERS.has(Number(/_(\d+)\.webp$/.exec(path)?.[1])) }))

const pools = {
  portrait: photos.filter((p) => p.portrait).map((p) => p.url),
  landscape: photos.filter((p) => !p.portrait).map((p) => p.url),
}

// Photo URLs per page, one per placeholder in reading order (top to bottom, then left to right).
// Each placeholder takes the next photo of its orientation; a pool that runs out starts over, so a few
// photos repeat. A free-format placeholder ("any") takes a portrait photo.
function assignPhotos(): Record<number, string[]> {
  const next = { portrait: 0, landscape: 0 }
  const result: Record<number, string[]> = {}
  for (const [page, { layout: id }] of Object.entries(pageAssignments).sort(([a], [b]) => Number(a) - Number(b))) {
    const layout = layoutsById[id]
    if (!layout) continue
    result[Number(page)] = layout.orientations.map((o) => {
      const kind = o === 'landscape' ? 'landscape' : 'portrait'
      const pool = pools[kind]
      return pool[next[kind]++ % pool.length]
    })
  }
  return result
}

export const bookPhotos = assignPhotos()

// Loads and decodes every photo the book shows, so the first paint has them all (no pop-in on reload).
// Gives up after 5 s so a slow or missing file can never leave the screen blank.
export const photosReady = Promise.race([
  Promise.all(
    [...new Set(Object.values(bookPhotos).flat())].map((url) => {
      const img = new Image()
      img.src = url
      return img.decode().catch(() => {})
    }),
  ),
  new Promise((resolve) => setTimeout(resolve, 5000)),
])
