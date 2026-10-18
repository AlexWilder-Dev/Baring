import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo'
import KitchenClock from './KitchenClock'
import StatusStar from './StatusStar'
import { contact } from '../data/baring'
import { useTime, type Lights } from '../lib/time'

const nav = [
  { to: '/menus', label: 'Menus' },
  { to: '/private-dining', label: 'Private dining' },
  { to: '/the-pub', label: 'The pub' },
  { to: '/visit', label: 'Visit' },
]

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="nav-list">
      {nav.map((n) => (
        <li key={n.to}>
          <NavLink to={n.to} onClick={onNavigate}>
            {n.label}
          </NavLink>
        </li>
      ))}
      <li>
        <a href={contact.vouchers} target="_blank" rel="noopener">
          Gift vouchers
        </a>
      </li>
    </ul>
  )
}

function StatusStrip() {
  const { status } = useTime()
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  const state = status.kitchen ? 'kitchen' : status.bar ? 'bar' : 'closed'
  return (
    <div className="strip only-phone">
      <button type="button" className="strip-line" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <StatusStar state={state} />
        <span className="strip-text">{status.headline}</span>
        <span className={`chevron ${open ? 'is-open' : ''}`} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="strip-panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <KitchenClock />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LightsControl() {
  const { lights, setLights } = useTime()
  const options: { v: Lights; label: string }[] = [
    { v: 'auto', label: 'By the clock' },
    { v: 'day', label: 'Daylight' },
    { v: 'candle', label: 'Candlelight' },
  ]
  return (
    <div className="lights" role="radiogroup" aria-label="Lights">
      <span className="lights-label">Lights</span>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={lights === o.v}
          className={lights === o.v ? 'is-on' : ''}
          onClick={() => setLights(o.v)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()
  const isHome = location.pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <div className="shell">
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        Skip to content
      </a>

      <header className="topbar only-phone">
        <Link to="/" className="topbar-logo" aria-label="The Baring, home">
          <Logo />
        </Link>
        <div className="topbar-actions">
          <a className="topbar-book" href={contact.booking} target="_blank" rel="noopener">
            Book
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls="phone-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={`burger-lines ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="phone-nav"
            className="phone-nav only-phone"
            aria-label="Main"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <NavList onNavigate={() => setMenuOpen(false)} />
            <p className="phone-nav-address">
              {contact.street}, {contact.town} {contact.postcode}
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={contact.instagramUrl} target="_blank" rel="noopener">
                Instagram {contact.instagram}
              </a>
            </p>
            <div className="phone-nav-foot">
              <a className="button button-primary" href={contact.booking} target="_blank" rel="noopener">
                Book a table
              </a>
              <a className="button" href={contact.phoneHref}>
                Call {contact.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {!isHome && <StatusStrip />}

      <aside className="side only-desk">
        <Link to="/" className="side-logo" aria-label="The Baring, home">
          <Logo />
        </Link>
        <KitchenClock />
        <nav aria-label="Main">
          <NavList />
        </nav>
        <p className="side-address">
          {contact.street}, {contact.town} {contact.postcode}
          <br />
          <a href={contact.phoneHref}>{contact.phone}</a>
        </p>
      </aside>

      <main id="main" className="main" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname.split('/')[1] || 'home'}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        <footer className="footer">
          <Logo variant="stacked" className="footer-logo" />
          <div className="footer-cols">
            <p>
              {contact.street}
              <br />
              {contact.town} {contact.postcode}
            </p>
            <p>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={contact.instagramUrl} target="_blank" rel="noopener">
                Instagram {contact.instagram}
              </a>
            </p>
            <p>
              <a href={contact.booking} target="_blank" rel="noopener">
                Book a table
              </a>
              <br />
              <a href={contact.vouchers} target="_blank" rel="noopener">
                Gift vouchers
              </a>
              <br />
              <Link to="/private-dining">Private dining</Link>
            </p>
          </div>
          <LightsControl />
          <p className="credit">Site by AlexWilder-Dev</p>
        </footer>
      </main>
    </div>
  )
}
