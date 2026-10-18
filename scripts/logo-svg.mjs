// Builds standalone SVG strings of the logo from the same path data the site uses.
import { readFile } from 'node:fs/promises'

export async function logoSvg({ variant = 'stacked', color = '#1d1b17' } = {}) {
  const src = await readFile(new URL('../src/components/logoPaths.ts', import.meta.url), 'utf8')
  const parts = {}
  for (const m of src.matchAll(/(\w+): \{ d: '([^']+)'(?:, transform: '([^']+)')?(?:, stroke: ([\d.]+))? \}/g)) {
    parts[m[1]] = { d: m[2], transform: m[3], stroke: m[4] }
  }
  const views = {
    stacked: { box: [640, 393, 642, 451], keys: ['the', 'baring', 'star', 'n1a', 'n1b'] },
    name: { box: [640, 393, 642, 238], keys: ['the', 'baring'] },
    star: { box: [941, 673.4, 37.2, 37.2], keys: ['star'] },
  }
  const v = views[variant]
  const paths = v.keys
    .map((k) => {
      const p = parts[k]
      return `<path d="${p.d}"${p.transform ? ` transform="${p.transform}"` : ''}${p.stroke ? ` stroke="${color}" stroke-width="${p.stroke}"` : ''}/>`
    })
    .join('')
  return { box: v.box, inner: `<g fill="${color}">${paths}</g>` }
}
