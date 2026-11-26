// The clipart files (src/assets/cliparts). Only the book uses them; the Layouts overview shows none.
const urls = import.meta.glob<string>('../assets/cliparts/*', { eager: true, query: '?url', import: 'default' })

// A page names its clipart by a fragment of the file name (e.g. 'kaktus', 'lemon'), so the files keep their names.
export const clipartUrl = (fragment: string) => Object.entries(urls).find(([path]) => path.includes(fragment))?.[1]
