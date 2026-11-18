const modules = import.meta.glob('../rsc/Fotoset/*.{jpg,JPG}', { eager: true, import: 'default' })
export const fotosetImages = Object.values(modules)

const thumbModules = import.meta.glob('../rsc/fotoset-thumbs/*.jpg', { eager: true, import: 'default' })
export const fotosetThumbs = Object.values(thumbModules)
