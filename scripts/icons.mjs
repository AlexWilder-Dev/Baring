// One-off: favicon and apple-touch-icon from their logo.
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { logoSvg } from './logo-svg.mjs'

const linen = '#f1ece2'
const ink = '#1d1b17'

// Favicon: the four-point star from the logo.
const star = await logoSvg({ variant: 'star', color: ink })
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${linen}"/><svg x="10" y="10" width="44" height="44" viewBox="${star.box.join(' ')}">${star.inner}</svg></svg>`
await writeFile('public/favicon.svg', favicon)
await sharp(Buffer.from(favicon), { density: 300 }).resize(32, 32).png().toFile('public/favicon-32.png')

// Apple touch icon: the stacked mark, THE / BARING / star / N1.
const mark = await logoSvg({ variant: 'stacked', color: ink })
const w = 150
const h = (w * mark.box[3]) / mark.box[2]
const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" fill="${linen}"/><svg x="${(180 - w) / 2}" y="${(180 - h) / 2}" width="${w}" height="${h}" viewBox="${mark.box.join(' ')}">${mark.inner}</svg></svg>`
await sharp(Buffer.from(touch), { density: 300 }).resize(180, 180).png().toFile('public/apple-touch-icon.png')
console.log('icons written')
