import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import MenuCard from '../components/MenuCard'
import DrinksList from '../components/DrinksList'
import { Star } from '../components/Logo'
import { aLaCarte, feasting, sunday, wineList } from '../data/baring'
import { useTime } from '../lib/time'

const tabs = [
  { id: 'a-la-carte', label: 'À la carte' },
  { id: 'sunday', label: 'Sunday' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'feasting', label: 'Feasting' },
]

function Printed({ label, pdf }: { label: string; pdf: string }) {
  return (
    <p className="printed">
      {label}{' '}
      <a href={pdf} target="_blank" rel="noopener">
        PDF
      </a>
    </p>
  )
}

function Feasting() {
  return (
    <div className="card feasting">
      <p className="feasting-title">{feasting.title}</p>
      <p className="feasting-price">£{feasting.perPerson} Per Person</p>
      <div className="feasting-intro">
        {feasting.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {[feasting.starters, feasting.mains, feasting.desserts].map((course) => (
        <div className="feasting-course" key={course.label}>
          <p className="feasting-label">{course.label}</p>
          <ul>
            {course.options.map((o: { id: string; name: string; supplementText?: string }) => (
              <li key={o.id}>
                {o.name}
                {o.supplementText && <em> {o.supplementText}</em>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="feasting-course">
        <p className="feasting-label">Optional extras</p>
        <ul>
          <li>Additional cheese course £10</li>
          <li>Cafetière coffee - serves 3 £12</li>
          <li>Linen table cloth hire £50</li>
        </ul>
      </div>
      <div className="card-notes">
        {feasting.notes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </div>
  )
}

export default function Menus() {
  const { which } = useParams()
  const { status } = useTime()

  if (!which || !tabs.some((t) => t.id === which)) return <Navigate to={`/menus/${status.menu}`} replace />

  return (
    <article className="page menus">
      <header className="page-head">
        <h1>Menus</h1>
        <p className="page-lead">The menus change every week. These are the current ones.</p>
      </header>

      <nav className="tabs" aria-label="Menus">
        {tabs.map((t) => (
          <NavLink key={t.id} to={`/menus/${t.id}`} className="tab">
            {({ isActive }) => (
              <>
                {t.label}
                {t.id === status.menu && <Star className="tab-star" />}
                {isActive && <motion.span layoutId="tab-line" className="tab-line" transition={{ duration: 0.25 }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {which === 'a-la-carte' && (
        <section>
          <Printed label={`Printed ${aLaCarte.printed}.`} pdf={aLaCarte.pdf} />
          <MenuCard menu={aLaCarte} />
        </section>
      )}
      {which === 'sunday' && (
        <section>
          <Printed label={`Printed ${sunday.printed}.`} pdf={sunday.pdf} />
          <MenuCard menu={sunday} />
        </section>
      )}
      {which === 'drinks' && (
        <section>
          <Printed label={`Printed ${wineList.printed}.`} pdf={wineList.pdf} />
          <DrinksList />
        </section>
      )}
      {which === 'feasting' && (
        <section>
          <Printed label="For October 2026." pdf={feasting.pdf} />
          <Feasting />
          <p className="more">
            <Link to="/private-dining">Plan a feast for the room upstairs</Link>
          </p>
        </section>
      )}
    </article>
  )
}
