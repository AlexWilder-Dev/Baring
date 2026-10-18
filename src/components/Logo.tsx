import parts from './logoPaths'

type Props = {
  variant?: 'stacked' | 'name'
  className?: string
  title?: string
}

const views = {
  stacked: { box: '640 393 642 451', keys: ['the', 'baring', 'star', 'n1a', 'n1b'] },
  name: { box: '640 393 642 238', keys: ['the', 'baring'] },
}

export default function Logo({ variant = 'name', className, title = 'The Baring' }: Props) {
  const view = views[variant]
  return (
    <svg className={className} viewBox={view.box} role="img" aria-label={title} fill="currentColor">
      {view.keys.map((k) => {
        const p = parts[k]
        return (
          <path
            key={k}
            d={p.d}
            transform={p.transform}
            stroke={p.stroke ? 'currentColor' : undefined}
            strokeWidth={p.stroke}
          />
        )
      })}
    </svg>
  )
}

export function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="943.4 675.4 33.2 33.2" aria-hidden="true" fill="currentColor">
      <path d={parts.star.d} />
    </svg>
  )
}
