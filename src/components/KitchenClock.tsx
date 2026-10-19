import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTime } from '../lib/time'
import { openTime } from '../lib/clock'
import { contact, week } from '../data/baring'
import WeekStrip from './WeekStrip'
import StatusStar from './StatusStar'

type Props = { showWeek?: boolean }

export function whenLabel(day: number, minutes: number) {
  return `${week[day].name}, ${openTime(minutes)}`
}

export default function KitchenClock({ showWeek = false }: Props) {
  const { status, moment, previewing, setPreview } = useTime()
  const [open, setOpen] = useState(showWeek)
  const reduce = useReducedMotion()
  const state = status.kitchen ? 'kitchen' : status.bar ? 'bar' : 'closed'

  // While someone drags through the week, hold the tallest height seen so the strip doesn't jump.
  const wrap = useRef<HTMLDivElement>(null)
  const [hold, setHold] = useState(0)
  useLayoutEffect(() => {
    if (!previewing) return setHold(0)
    setHold((h) => Math.max(h, wrap.current?.offsetHeight ?? 0))
  }, [previewing, status.headline, status.detail])

  return (
    <section className="clock" aria-label="Is the kitchen open?">
      <p className="clock-when">
        <StatusStar state={state} />
        <span>
          {previewing ? `Showing ${whenLabel(moment.day, moment.minutes)}` : whenLabel(moment.day, moment.minutes)}
        </span>
        {previewing && (
          <button type="button" className="link-button" onClick={() => setPreview(null)}>
            Back to now
          </button>
        )}
      </p>

      <div ref={wrap} className="clock-headline-wrap" aria-live="polite" style={hold ? { minHeight: hold } : undefined}>
        <h2 key={status.headline} className="clock-headline rise-in">
          {status.headline}
        </h2>
        <p className="clock-detail">{status.detail}</p>
      </div>

      <div className="clock-actions">
        <a className="button button-primary" href={contact.booking} target="_blank" rel="noopener">
          Book a table
        </a>
        <Link className="button" to={`/menus/${status.menu}`}>
          {status.menu === 'sunday' ? 'Sunday menu' : 'This week’s menu'}
        </Link>
      </div>

      <button
        type="button"
        className="clock-toggle"
        aria-expanded={open}
        aria-controls="week-strip"
        onClick={() => setOpen((v) => !v)}
      >
        <span>Opening hours</span>
        <span className={`chevron ${open ? 'is-open' : ''}`} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="week-strip"
            className="clock-week"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <WeekStrip />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
