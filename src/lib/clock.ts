import { week, type Day } from '../data/baring'

export type Moment = { day: number; minutes: number } // day 0 = Sunday, London time

export function londonNow(date = new Date()): Moment {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

// Their site writes opening hours as 12:00 and food times as 14.30. We keep both.
export const openTime = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
export const foodTime = (m: number) => openTime(m).replace(':', '.')

export type Status = {
  kitchen: boolean
  bar: boolean
  headline: string
  detail: string
  menu: 'a-la-carte' | 'sunday'
  candle: boolean
}

function nextOpening(from: number): { day: Day } {
  for (let i = 1; i <= 7; i++) {
    const d = week[(from + i) % 7]
    if (d.open) return { day: d }
  }
  return { day: week[2] }
}

function backLine(dayIndex: number) {
  const next = nextOpening(dayIndex)
  return `Back ${next.day.name} at ${openTime(next.day.open!.from)}.`
}

export function statusAt({ day, minutes }: Moment): Status {
  const today = week[day]
  const candle = minutes >= 18 * 60 || minutes < 6 * 60
  // The menu that's on (or next on): Sunday's from Saturday night until 16.00 Sunday.
  const sundayNext = (day === 0 && minutes < 16 * 60) || (day === 6 && minutes >= 21 * 60 + 30)
  const menu = sundayNext ? 'sunday' : 'a-la-carte'
  const base = { menu, candle } as const

  if (!today.open) {
    return { ...base, kitchen: false, bar: false, headline: 'Closed today.', detail: backLine(day) }
  }

  const { from, to } = today.open
  const firstFood = today.food[0]

  if (minutes < from) {
    const lunch =
      day === 0
        ? `Roasts from ${foodTime(firstFood.from)} to ${foodTime(firstFood.to)}.`
        : `Lunch from ${foodTime(firstFood.from)} to ${foodTime(firstFood.to)}.`
    return { ...base, kitchen: false, bar: false, headline: `Open at ${openTime(from)}.`, detail: lunch }
  }

  if (minutes >= to) {
    return { ...base, kitchen: false, bar: false, headline: 'Closed for the night.', detail: backLine(day) }
  }

  const serving = today.food.find((w) => minutes >= w.from && minutes < w.to)
  if (serving) {
    const headline =
      day === 0 ? `Roasts until ${foodTime(serving.to)}.` : `${serving.label} until ${foodTime(serving.to)}.`
    return { ...base, kitchen: true, bar: true, headline, detail: `Kitchen open. Bar open until ${openTime(to)}.` }
  }

  const later = today.food.find((w) => w.from > minutes)
  if (later) {
    return {
      ...base,
      kitchen: false,
      bar: true,
      headline: `Kitchen back at ${foodTime(later.from)}.`,
      detail: `The bar’s open, no need to book for a drink.`,
    }
  }

  if (day === 0) {
    return {
      ...base,
      kitchen: false,
      bar: true,
      headline: 'Kitchen’s closed.',
      detail: `The bar’s open until ${openTime(to)}. ${backLine(day)}`,
    }
  }
  return {
    ...base,
    kitchen: false,
    bar: true,
    headline: 'Kitchen’s closed for the night.',
    detail: `The bar’s open until ${openTime(to)}.`,
  }
}
