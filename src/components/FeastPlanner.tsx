import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { contact, feasting, privateDining } from '../data/baring'
import { Star } from './Logo'

// "Main course - please choose one option…" → "Please choose one option…"
const instruction = (label: string) => {
  const rest = label.split(' - ').slice(1).join(' - ') || label
  return rest.charAt(0).toUpperCase() + rest.slice(1)
}

const money = (v: number) => {
  const rounded = Math.round(v * 100) / 100
  return `£${rounded.toLocaleString('en-GB', {
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`
}

function Money({ value }: { value: number }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(value)
  const spring = useSpring(mv, { stiffness: 220, damping: 32 })
  const text = useTransform(reduce ? mv : spring, (v) => money(v))
  useEffect(() => mv.set(value), [mv, value])
  return <motion.span>{text}</motion.span>
}

type Choice = { starters: string[]; main?: string; dessert?: string }

export default function FeastPlanner() {
  const [guests, setGuests] = useState(12)
  const [choice, setChoice] = useState<Choice>({ starters: [] })
  const [cheese, setCheese] = useState(false)
  const [coffee, setCoffee] = useState(0)
  const [linen, setLinen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', sitting: 'Dinner', notes: '' })

  const main = feasting.mains.options.find((m) => m.id === choice.main)
  const dessert = feasting.desserts.options.find((d) => d.id === choice.dessert)
  const perHead = feasting.perPerson + (main?.supplement ?? 0)
  const feast = perHead * guests
  const cheeseCost = cheese ? guests * 10 : 0
  const coffeeCost = coffee * 12
  const linenCost = linen ? 50 : 0
  const subtotal = feast + cheeseCost + coffeeCost + linenCost
  const service = subtotal * feasting.serviceRate
  const total = subtotal + service

  const summary = useMemo(() => {
    const starters = feasting.starters.options.filter((s) => choice.starters.includes(s.id)).map((s) => s.name)
    const lines = [
      `${feasting.title}, ${guests} guests`,
      '',
      `Starters: ${starters.length ? starters.join('; ') : 'to choose'}`,
      `Main: ${main ? main.name : 'to choose'}`,
      `Dessert: ${dessert ? dessert.name : 'to choose'}`,
    ]
    const extras = [
      cheese && `Additional cheese course × ${guests}`,
      coffee > 0 && `Cafetière coffee × ${coffee}`,
      linen && 'Linen table cloth hire',
    ].filter(Boolean)
    if (extras.length) lines.push(`Extras: ${extras.join('; ')}`)
    lines.push(
      '',
      `Estimate: ${money(total)} including 12.5% service (${money(total / guests)} a head), before drinks.`,
    )
    return lines.join('\n')
  }, [choice.starters, guests, main, dessert, cheese, coffee, linen, total])

  useEffect(() => {
    setForm((f) => ({ ...f, notes: summary }))
  }, [summary])

  const setGuestCount = (n: number) => {
    const next = Math.min(Math.max(n, 2), privateDining.capacity)
    setGuests(next)
    if (coffee > 0) setCoffee(Math.ceil(next / 3))
  }

  const toggleStarter = (id: string) =>
    setChoice((c) => ({
      ...c,
      starters: c.starters.includes(id) ? c.starters.filter((s) => s !== id) : [...c.starters, id],
    }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Private dining enquiry, ${guests} guests`)}&body=${encodeURIComponent(
    `${form.name ? `Name: ${form.name}\n` : ''}${form.date ? `Date: ${form.date} (${form.sitting})\n\n` : ''}${summary}`,
  )}`

  return (
    <div className="planner">
      <div className="planner-steps">
        <fieldset className="step">
          <legend>
            <span className="step-n">1</span> How many of you?
          </legend>
          <div className="guests">
            <button
              type="button"
              className="stepper"
              aria-label="One fewer guest"
              onClick={() => setGuestCount(guests - 1)}
              disabled={guests <= 2}
            >
              −
            </button>
            <output className="guests-n" aria-live="polite">
              {guests}
            </output>
            <button
              type="button"
              className="stepper"
              aria-label="One more guest"
              onClick={() => setGuestCount(guests + 1)}
              disabled={guests >= privateDining.capacity}
            >
              +
            </button>
            <input
              type="range"
              min={2}
              max={privateDining.capacity}
              value={guests}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              aria-label="Number of guests"
            />
          </div>
          <p className="step-note">The room seats up to {privateDining.capacity}.</p>
        </fieldset>

        <fieldset className="step">
          <legend>
            <span className="step-n">2</span> Starters
          </legend>
          <p className="step-note">{instruction(feasting.starters.label)}</p>
          {feasting.starters.options.map((s) => (
            <label key={s.id} className={`option ${choice.starters.includes(s.id) ? 'is-on' : ''}`}>
              <input type="checkbox" checked={choice.starters.includes(s.id)} onChange={() => toggleStarter(s.id)} />
              <span className="option-mark option-check" aria-hidden="true" />
              <span className="option-name">{s.name}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="step">
          <legend>
            <span className="step-n">3</span> Main course
          </legend>
          <p className="step-note">{instruction(feasting.mains.label)}</p>
          {feasting.mains.options.map((m) => (
            <label key={m.id} className={`option ${choice.main === m.id ? 'is-on' : ''}`}>
              <input
                type="radio"
                name="main"
                checked={choice.main === m.id}
                onChange={() => setChoice((c) => ({ ...c, main: m.id }))}
              />
              <span className="option-mark" aria-hidden="true" />
              <span className="option-name">
                {m.name}
                {m.supplementText && <em className="option-extra"> {m.supplementText}</em>}
              </span>
            </label>
          ))}
        </fieldset>

        <fieldset className="step">
          <legend>
            <span className="step-n">4</span> Dessert
          </legend>
          <p className="step-note">{instruction(feasting.desserts.label)}</p>
          {feasting.desserts.options.map((d) => (
            <label key={d.id} className={`option ${choice.dessert === d.id ? 'is-on' : ''}`}>
              <input
                type="radio"
                name="dessert"
                checked={choice.dessert === d.id}
                onChange={() => setChoice((c) => ({ ...c, dessert: d.id }))}
              />
              <span className="option-mark" aria-hidden="true" />
              <span className="option-name">{d.name}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="step">
          <legend>
            <span className="step-n">5</span> Optional extras
          </legend>
          <label className={`option ${cheese ? 'is-on' : ''}`}>
            <input type="checkbox" checked={cheese} onChange={(e) => setCheese(e.target.checked)} />
            <span className="option-mark option-check" aria-hidden="true" />
            <span className="option-name">
              Additional cheese course £10 <span className="option-sum">{cheese ? `× ${guests}` : ''}</span>
            </span>
          </label>
          <div className={`option option-qty ${coffee > 0 ? 'is-on' : ''}`}>
            <span className="option-name">
              Cafetière coffee - serves 3 £12 <span className="option-sum">{coffee > 0 ? `× ${coffee}` : ''}</span>
            </span>
            <span className="qty">
              <button
                type="button"
                className="stepper small"
                aria-label="One fewer cafetière"
                onClick={() => setCoffee((n) => Math.max(0, n - 1))}
                disabled={coffee === 0}
              >
                −
              </button>
              <button
                type="button"
                className="stepper small"
                aria-label="One more cafetière"
                onClick={() => setCoffee((n) => (n === 0 ? Math.ceil(guests / 3) : n + 1))}
              >
                +
              </button>
            </span>
          </div>
          <label className={`option ${linen ? 'is-on' : ''}`}>
            <input type="checkbox" checked={linen} onChange={(e) => setLinen(e.target.checked)} />
            <span className="option-mark option-check" aria-hidden="true" />
            <span className="option-name">Linen table cloth hire £50</span>
          </label>
          <p className="step-note">
            {feasting.intro[1]}. {feasting.intro[2]}
          </p>
        </fieldset>
      </div>

      <aside className="tally" aria-label="Your feast">
        <div className="tally-inner">
          <p className="eyebrow">Your feast</p>
          <dl>
            <div>
              <dt>
                {guests} × {money(perHead)}
              </dt>
              <dd>
                <Money value={feast} />
              </dd>
            </div>
            {cheese && (
              <div>
                <dt>Cheese × {guests}</dt>
                <dd>{money(cheeseCost)}</dd>
              </div>
            )}
            {coffee > 0 && (
              <div>
                <dt>Cafetière × {coffee}</dt>
                <dd>{money(coffeeCost)}</dd>
              </div>
            )}
            {linen && (
              <div>
                <dt>Linen</dt>
                <dd>{money(linenCost)}</dd>
              </div>
            )}
            <div>
              <dt>Service 12.5%</dt>
              <dd>
                <Money value={service} />
              </dd>
            </div>
            <div className="tally-total">
              <dt>Total</dt>
              <dd>
                <Money value={total} />
              </dd>
            </div>
          </dl>
          <p className="tally-head">
            <Money value={total / guests} /> a head, before drinks
          </p>
          <a
            className="button button-primary tally-cta"
            href="#enquire"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="cta-long">Send this as an enquiry</span>
            <span className="cta-short">Enquire</span>
          </a>
        </div>
      </aside>

      <section id="enquire" className="enquire">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="sent"
              className="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Star className="sent-star" />
              <h3>Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h3>
              <p>
                We’ll reply from {contact.email} about {form.date ? `${formatDate(form.date)}` : 'dates'} and
                availability for {guests}.
              </p>
              <pre className="sent-summary">{form.notes}</pre>
              <p className="demo-note">This is a demo, so nothing has been sent.</p>
              <p className="sent-actions">
                <a className="button" href={mailto}>
                  Email it instead
                </a>
                <button type="button" className="link-button" onClick={() => setSent(false)}>
                  Change something
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} initial={false} exit={{ opacity: 0 }}>
              <h3>Enquire about the room</h3>
              <p className="step-note">Your choices are filled in below. We’ll come back to you by email.</p>
              <div className="fields">
                <label>
                  <span>Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                  />
                </label>
                <label>
                  <span>Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    autoComplete="tel"
                  />
                </label>
                <label>
                  <span>Date</span>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </label>
                <fieldset className="sitting">
                  <legend>Lunch or dinner</legend>
                  {['Lunch', 'Dinner'].map((s) => (
                    <label key={s}>
                      <input
                        type="radio"
                        name="sitting"
                        checked={form.sitting === s}
                        onChange={() => setForm({ ...form, sitting: s })}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </fieldset>
                <label className="wide">
                  <span>Your feast</span>
                  <textarea rows={9} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </label>
              </div>
              <button type="submit" className="button button-primary">
                Send enquiry
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}
