// One-off: resize the photos from research/photos into web sizes in public/photos.
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const src = 'research/photos'
const out = 'public/photos'
const widths = [800, 1600]

const files = (await readdir(src)).filter((f) => f.endsWith('.jpg'))
for (const file of files) {
  const name = path.basename(file, '.jpg').toLowerCase()
  for (const w of widths) {
    const info = await sharp(path.join(src, file))
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 76, mozjpeg: true, progressive: true })
      .toFile(path.join(out, `${name}-${w}.jpg`))
    console.log(`${name}-${w}.jpg ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`)
  }
}
