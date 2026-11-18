import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const jobs = [
  {
    src: join(__dirname, '../rsc/figma'),
    out: join(__dirname, '../rsc/figma-thumbs'),
    label: 'figma',
  },
  {
    src: join(__dirname, '../rsc/Fotoset'),
    out: join(__dirname, '../rsc/fotoset-thumbs'),
    label: 'fotoset',
  },
]

for (const { src, out, label } of jobs) {
  await mkdir(out, { recursive: true })
  const files = (await readdir(src)).filter(f => !f.startsWith('.'))
  let done = 0
  await Promise.all(files.map(async (file) => {
    const stem = basename(file, extname(file))
    await sharp(join(src, file))
      .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(join(out, `${stem}.jpg`))
    done++
    if (done % 20 === 0) process.stdout.write(`  [${label}] ${done}/${files.length}\n`)
  }))
  console.log(`Done: generated ${files.length} thumbnails → rsc/${label}-thumbs/`)
}
