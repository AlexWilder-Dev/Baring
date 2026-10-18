// One-off: public/og.jpg (1200x630) from HR-26, the first-floor room, with their logo on the dark wall.
import sharp from 'sharp'
import { stat } from 'node:fs/promises'
import { logoSvg } from './logo-svg.mjs'

const W = 1200
const H = 630
const logo = await logoSvg({ variant: 'stacked', color: '#f3ebdc' })
const lw = 320
const lh = (lw * logo.box[3]) / logo.box[2]
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <svg x="${W - lw - 64}" y="${(H - lh) / 2 - 8}" width="${lw}" height="${lh}" viewBox="${logo.box.join(' ')}">${logo.inner}</svg>
</svg>`

await sharp('research/photos/HR-26.jpg')
  .extract({ left: 0, top: 230, width: 2500, height: 1312 })
  .resize(W, H)
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 88, mozjpeg: true, progressive: false })
  .toFile('public/og.jpg')

const meta = await sharp('public/og.jpg').metadata()
const { size } = await stat('public/og.jpg')
console.log(`og.jpg ${meta.width}x${meta.height} ${meta.format} ${Math.round(size / 1024)}KB`)
