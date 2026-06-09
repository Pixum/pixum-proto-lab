const assets = import.meta.glob('../rsc/figma/*', { eager: true, import: 'default' })

export const figmaAsset = (uuid) => {
  const entry = Object.entries(assets).find(([k]) => k.includes(uuid))
  return entry ? entry[1] : ''
}
