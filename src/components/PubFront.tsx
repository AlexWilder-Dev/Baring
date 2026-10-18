import { useTime } from '../lib/time'

// The 1840s front at 55 Baring Street, drawn from its local listing: three storeys, five bays,
// quoins and a parapet, a pediment over the middle first-floor window, pilasters and a central door below.
// The ground floor lights up when the pub's open; the first floor (the private room) glows after dark.

const W = 400
const BAYS = [59.2, 129.6, 200, 270.4, 340.8]
const PILASTERS = [24, 94.4, 164.8, 235.2, 305.6, 376]

function Sash({
  c,
  top,
  bottom,
  width,
  lit,
}: {
  c: number
  top: number
  bottom: number
  width: number
  lit?: boolean
}) {
  const l = c - width / 2
  const mid = (top + bottom) / 2
  const third = width / 3
  return (
    <g>
      <rect
        className={lit ? 'glass glass-upper' : 'glass glass-dark'}
        x={l}
        y={top}
        width={width}
        height={bottom - top}
      />
      <rect x={l} y={top} width={width} height={bottom - top} />
      <line x1={l} x2={l + width} y1={mid} y2={mid} />
      <line className="fine" x1={l} x2={l + width} y1={(top + mid) / 2} y2={(top + mid) / 2} />
      <line className="fine" x1={l} x2={l + width} y1={(mid + bottom) / 2} y2={(mid + bottom) / 2} />
      <line className="fine" x1={l + third} x2={l + third} y1={top} y2={bottom} />
      <line className="fine" x1={l + 2 * third} x2={l + 2 * third} y1={top} y2={bottom} />
    </g>
  )
}

export default function PubFront({ className }: { className?: string }) {
  const { status, candle } = useTime()
  const state = status.bar ? (candle ? 'evening' : 'open') : 'closed'

  const quoins = (x: number, side: 1 | -1) =>
    Array.from({ length: 13 }, (_, i) => {
      const y = 36 + i * 13.4
      const w = i % 2 ? 9 : 14
      return <rect key={i} x={side === 1 ? x : x - w} y={y} width={w} height={13.4} />
    })

  return (
    <svg
      className={`pubfront pubfront-${state} ${className ?? ''}`}
      viewBox={`0 0 ${W} 340`}
      role="img"
      aria-label={
        state === 'closed'
          ? 'Drawing of the pub front at 55 Baring Street, lights off'
          : 'Drawing of the pub front at 55 Baring Street, windows lit'
      }
    >
      {/* parapet and cornice */}
      <rect x="22" y="14" width="356" height="16" />
      <line x1="16" x2="384" y1="30" y2="30" />
      <line x1="18" x2="382" y1="35" y2="35" />
      <line x1="24" x2="24" y1="35" y2="214" />
      <line x1="376" x2="376" y1="35" y2="214" />
      {quoins(24, 1)}
      {quoins(376, -1)}

      {/* second floor */}
      {BAYS.map((c) => (
        <g key={`s${c}`}>
          <rect className="fine" x={c - 19} y={48} width={38} height={60} />
          <Sash c={c} top={52} bottom={104} width={30} />
          <line x1={c - 21} x2={c + 21} y1={109} y2={109} />
        </g>
      ))}

      {/* first floor: the private dining room */}
      {BAYS.map((c, i) => (
        <g key={`f${c}`}>
          {i === 2 ? (
            <path d={`M${c - 25} 127 L${c} 112 L${c + 25} 127 Z`} />
          ) : (
            <>
              <line x1={c - 23} x2={c + 23} y1={125} y2={125} />
              <line x1={c - 21} x2={c + 21} y1={128} y2={128} />
              <rect className="fine" x={c - 21} y={128} width={4} height={6} />
              <rect className="fine" x={c + 17} y={128} width={4} height={6} />
            </>
          )}
          <rect className="fine" x={c - 20} y={130} width={40} height={74} />
          <Sash c={c} top={134} bottom={200} width={32} lit />
          <g className="flames">
            <ellipse cx={c - 6} cy={192} rx={1.3} ry={2.6} />
            <ellipse cx={c + 6} cy={193} rx={1.3} ry={2.6} />
          </g>
          <line x1={c - 22} x2={c + 22} y1={205} y2={205} />
        </g>
      ))}

      {/* cornice, fascia */}
      <line x1="14" x2="386" y1="214" y2="214" />
      <line x1="18" x2="382" y1="218" y2="218" />
      <rect x="24" y="218" width="352" height="22" />
      <text className="fascia" x={W / 2} y="233" textAnchor="middle">
        THE BARING
      </text>
      <line x1="20" x2="380" y1="244" y2="244" />

      {/* pilasters with capitals */}
      {PILASTERS.map((x, i) => {
        const left = i === 0 ? x : i === PILASTERS.length - 1 ? x - 8 : x - 4
        return (
          <g key={`p${x}`}>
            <rect x={left - 2} y={244} width={12} height={8} />
            <path className="fine" d={`M${left - 1} 248 q2 -3 4 0 M${left + 5} 248 q2 -3 4 0`} />
            <rect x={left} y={252} width={8} height={66} />
          </g>
        )
      })}

      {/* ground floor: four windows and the door */}
      {BAYS.map((c, i) =>
        i === 2 ? (
          <g key={`d${c}`}>
            <rect className="glass glass-ground" x={c - 26} y={256} width={52} height={14} />
            <rect x={c - 26} y={256} width={52} height={14} />
            <line className="fine" x1={c} x2={c} y1={256} y2={270} />
            <rect x={c - 26} y={270} width={52} height={48} />
            <line x1={c} x2={c} y1={270} y2={318} />
            <rect className="glass glass-ground" x={c - 21} y={275} width={16} height={18} />
            <rect className="glass glass-ground" x={c + 5} y={275} width={16} height={18} />
            <rect className="fine" x={c - 21} y={275} width={16} height={18} />
            <rect className="fine" x={c + 5} y={275} width={16} height={18} />
            <rect className="fine" x={c - 21} y={298} width={16} height={15} />
            <rect className="fine" x={c + 5} y={298} width={16} height={15} />
          </g>
        ) : (
          <g key={`w${c}`}>
            <rect className="glass glass-ground" x={c - 27} y={256} width={54} height={44} />
            <rect x={c - 27} y={256} width={54} height={44} />
            <line className="fine" x1={c - 27} x2={c + 27} y1={268} y2={268} />
            <line className="fine" x1={c} x2={c} y1={256} y2={268} />
            <rect x={c - 27} y={302} width={54} height={14} />
            <rect className="fine" x={c - 23} y={305} width={46} height={8} />
          </g>
        ),
      )}

      {/* pavement */}
      <line x1="0" x2={W} y1="318" y2="318" />
      <line className="fine" x1="0" x2={W} y1="326" y2="326" />
    </svg>
  )
}
