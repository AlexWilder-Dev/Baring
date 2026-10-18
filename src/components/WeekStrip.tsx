import { useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { week } from '../data/baring'
import { foodTime, openTime } from '../lib/clock'
import { useTime } from '../lib/time'

// The week as their food windows: a thin line while the doors are open, a solid bar while the kitchen is.
// Drag along any day to see what the site says at that time.

const START = 11 * 60
const END = 24 * 60
const SPAN = END - START
const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first, as their site lists it
const pct = (m: number) => `${((Math.min(Math.max(m, START), END) - START) / SPAN) * 100}%`
const snap = (m: number) => Math.round(m / 15) * 15

const tries = [
  { label: 'Wed 13:00', day: 3, minutes: 13 * 60 },
  { label: 'Fri 16:00', day: 5, minutes: 16 * 60 },
  { label: 'Sat 20:00', day: 6, minutes: 20 * 60 },
  { label: 'Sun 13:30', day: 0, minutes: 13 * 60 + 30 },
  { label: 'Sun 17:00', day: 0, minutes: 17 * 60 },
  { label: 'Mon', day: 1, minutes: 13 * 60 },
]

export default function WeekStrip() {
  const { moment, real, previewing, setPreview } = useTime()
  const dragging = useRef(false)

  const fromPointer = (e: PointerEvent<HTMLDivElement>, day: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
    const minutes = Math.min(snap(START + (x / rect.width) * SPAN), END - 15)
    setPreview({ day, minutes })
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowLeft: -15, ArrowRight: 15 }[e.key as 'ArrowLeft' | 'ArrowRight']
    const dayStep = { ArrowUp: -1, ArrowDown: 1 }[e.key as 'ArrowUp' | 'ArrowDown']
    if (!step && !dayStep) return
    e.preventDefault()
    const idx = ORDER.indexOf(moment.day)
    const day = dayStep ? ORDER[(idx + dayStep + 7) % 7] : moment.day
    const minutes = Math.min(Math.max(moment.minutes + (step ?? 0), START), END - 15)
    setPreview({ day, minutes })
  }

  return (
    <div className="week">
      <div
        className="week-grid"
        role="group"
        tabIndex={0}
        aria-label="Opening hours by day. Use the arrow keys to see another time."
        onKeyDown={onKey}
      >
        {ORDER.map((d) => {
          const day = week[d]
          const isMoment = moment.day === d
          const summary = day.open
            ? `${day.name}: open ${openTime(day.open.from)} to ${openTime(day.open.to)}. ${day.food
                .map((f) => `${f.label} ${foodTime(f.from)} to ${foodTime(f.to)}`)
                .join(', ')}.`
            : `${day.name}: closed.`
          return (
            <div className={`week-row ${isMoment ? 'is-current' : ''}`} key={d}>
              <span className="week-day">{day.short}</span>
              <div
                className="week-track"
                aria-label={summary}
                role="img"
                onPointerDown={(e) => {
                  dragging.current = true
                  e.currentTarget.setPointerCapture(e.pointerId)
                  fromPointer(e, d)
                }}
                onPointerMove={(e) => dragging.current && fromPointer(e, d)}
                onPointerUp={() => (dragging.current = false)}
                onPointerCancel={() => (dragging.current = false)}
              >
                {day.open ? (
                  <>
                    <span
                      className="week-open"
                      style={{ left: pct(day.open.from), right: `calc(100% - ${pct(day.open.to)})` }}
                    />
                    {day.food.map((f) => (
                      <span
                        key={f.from}
                        className="week-food"
                        style={{ left: pct(f.from), right: `calc(100% - ${pct(f.to)})` }}
                      />
                    ))}
                  </>
                ) : (
                  <span className="week-closed">Closed</span>
                )}
                {real.day === d && <span className="week-now" style={{ left: pct(real.minutes) }} title="Now" />}
                {isMoment && previewing && <span className="week-preview" style={{ left: pct(moment.minutes) }} />}
              </div>
            </div>
          )
        })}
        <div className="week-row week-axis" aria-hidden="true">
          <span className="week-day" />
          <div className="week-ticks">
            {[12, 15, 18, 21, 24].map((h) => (
              <span key={h} style={{ left: pct(h * 60) }}>
                {h === 24 ? '24' : h}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="week-key">
        <span className="key key-open" /> Bar open <span className="key key-food" /> Kitchen serving
      </p>
      <p className="week-try">
        <span>Try</span>
        {tries.map((t) => (
          <button
            key={t.label}
            type="button"
            className="chip"
            onClick={() => setPreview({ day: t.day, minutes: t.minutes })}
          >
            {t.label}
          </button>
        ))}
      </p>
    </div>
  )
}
