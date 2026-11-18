const assets = import.meta.glob('../rsc/figma/*', { eager: true, import: 'default' })
const thumbs = import.meta.glob('../rsc/figma-thumbs/*', { eager: true, import: 'default' })

export const figmaAsset = (uuid) => {
  const entry = Object.entries(assets).find(([k]) => k.includes(uuid))
  return entry ? entry[1] : ''
}

export const figmaThumb = (uuid) => {
  const entry = Object.entries(thumbs).find(([k]) => k.includes(uuid))
  return entry ? entry[1] : figmaAsset(uuid)
}
