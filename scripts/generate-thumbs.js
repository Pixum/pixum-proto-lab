import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const SRC = join(__dirname, '../rsc/figma')
const OUT = join(__dirname, '../rsc/figma-thumbs')

await mkdir(OUT, { recursive: true })
const files = await readdir(SRC)

let done = 0
await Promise.all(files.map(async (file) => {
  const stem = basename(file, extname(file))
  await sharp(join(SRC, file))
    .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(join(OUT, `${stem}.jpg`))
  done++
  if (done % 20 === 0) process.stdout.write(`  ${done}/${files.length}\n`)
}))
console.log(`Done: generated ${files.length} thumbnails → rsc/figma-thumbs/`)
