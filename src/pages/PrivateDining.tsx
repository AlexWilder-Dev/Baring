import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import FeastPlanner from '../components/FeastPlanner'
import Rule from '../components/Rule'
import { contact, feasting, photos, privateDining } from '../data/baring'
import { useTime } from '../lib/time'

export default function PrivateDining() {
  const { candle } = useTime()
  const set = candle
    ? [photos.served, photos.toasts, photos.pudding]
    : [photos.roomWide, photos.pendant, photos.longTable]

  return (
    <article className="page">
      <header className="page-head">
        <p className="eyebrow">First floor</p>
        <h1>Private dining</h1>
        <p className="page-lead">{privateDining.lead}</p>
      </header>

      <div className="gallery">
        <Photo photo={set[0]} eager className="gallery-wide" />
        <Photo photo={set[1]} sizes="(min-width: 960px) 360px, 50vw" />
        <Photo photo={set[2]} sizes="(min-width: 960px) 360px, 50vw" />
      </div>

      <section className="block prose">
        {privateDining.room.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          Groups eat from the feasting menu: £{feasting.perPerson} a head, starters to share, then one main course and
          one dessert for the whole table. Guests with allergies or dietary restrictions are looked after separately.
        </p>
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">{feasting.title}</p>
        <h2 className="block-title">Plan a feast</h2>
        <p className="page-lead">
          Choose for the table and see what it comes to. It reaches us as an enquiry and we’ll reply with availability.
        </p>
        <FeastPlanner />
      </section>

      <Rule />

      <section className="block prose">
        <p>
          Or email{' '}
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent('Group Booking')}`}>{contact.email}</a> for
          further information and availability. The full menu is on the <Link to="/menus/feasting">menus page</Link>.
        </p>
      </section>
    </article>
  )
}
