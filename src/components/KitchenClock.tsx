import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTime } from '../lib/time'
import { openTime } from '../lib/clock'
import { contact, week } from '../data/baring'
import WeekStrip from './WeekStrip'
import StatusStar from './StatusStar'

type Props = { heading?: 'h1' | 'h2'; showWeek?: boolean }

export function whenLabel(day: number, minutes: number) {
  return `${week[day].name}, ${openTime(minutes)}`
}

export default function KitchenClock({ heading = 'h2', showWeek = false }: Props) {
  const { status, moment, previewing, setPreview } = useTime()
  const [open, setOpen] = useState(showWeek)
  const reduce = useReducedMotion()
  const Heading = motion[heading]
  const state = status.kitchen ? 'kitchen' : status.bar ? 'bar' : 'closed'

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

      <div className="clock-headline-wrap" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <Heading
            key={status.headline}
            className="clock-headline"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {status.headline}
          </Heading>
        </AnimatePresence>
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
