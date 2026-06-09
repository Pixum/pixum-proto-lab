const modules = import.meta.glob('../rsc/Fotoset/*.{jpg,JPG}', { eager: true, import: 'default' })
export const fotosetImages = Object.values(modules)
