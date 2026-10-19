import { Link } from 'react-router-dom'
import KitchenClock from '../components/KitchenClock'
import Photo from '../components/Photo'
import PubFront from '../components/PubFront'
import Rule from '../components/Rule'
import { Row } from '../components/MenuCard'
import { Star } from '../components/Logo'
import { accolades, aLaCarte, contact, photos, privateDining, story, sunday } from '../data/baring'
import { useTime } from '../lib/time'

function ThisWeek() {
  const { status } = useTime()
  const menu = status.menu === 'sunday' ? sunday : aLaCarte
  // Starters, then mains (and on Sunday, the roasts).
  const groups = menu.id === 'sunday' ? [menu.groups[2], menu.groups[4]] : [menu.groups[2], menu.groups[3]]
  return (
    <section className="block">
      <p className="eyebrow">
        {menu.id === 'sunday' ? 'Sunday' : 'This week'} · printed {menu.printed.replace(' 2026', '')}
      </p>
      <h2 className="block-title">{menu.id === 'sunday' ? 'Roasts until 16.00' : 'What’s on the card'}</h2>
      <div className="card card-preview">
        {groups.map((g, i) => (
          <div className="card-group" key={i}>
            {i > 0 && <Star className="card-star" />}
            {g.heading && <p className="card-heading">{g.heading}</p>}
            <ul>
              {g.items.map((item) => (
                <Row key={item.name} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="more">
        <Link to={`/menus/${menu.id}`}>The whole menu</Link>
        <Link to="/menus/drinks">Wine & drinks</Link>
      </p>
    </section>
  )
}

export default function Home() {
  const { candle } = useTime()
  const lead = candle ? photos.laughing : photos.quail
  const room = candle ? photos.served : photos.roomWide
  const quotes = accolades.filter((a) => a.by)

  return (
    <>
      <h1 className="visually-hidden">The Baring, a pub at 55 Baring Street, Islington</h1>

      <div className="only-phone home-clock">
        <KitchenClock />
      </div>

      <div className="home-lead">
        <div key={lead.id} className="lead-wrap fade-in">
          <Photo
            photo={lead}
            eager
            className="lead-photo"
            caption={candle ? 'Upstairs, after dark.' : 'Quail shish, garlic yoghurt & pul biber chilli'}
            price={candle ? undefined : '14'}
          />
        </div>

        <ThisWeek />
      </div>

      <Rule />

      <section className="block two">
        <div className="half">
          <p className="eyebrow">Downstairs</p>
          <h2 className="block-title">Walk in for a pint</h2>
          <PubFront className="home-front" />
          <p>
            There are stools at the bar and you don’t need to book for a drink. The house lager is Lost & Grounded X The
            Baring, there’s cask from Five Points and Belgian bottles to share. Dogs are welcome.
          </p>
          <p className="more">
            <Link to="/menus/drinks">The bar list</Link>
          </p>
        </div>
        <div className="half">
          <p className="eyebrow">First floor</p>
          <h2 className="block-title">A room for up to {privateDining.capacity}</h2>
          <Photo photo={room} sizes="(min-width: 960px) 360px, 100vw" />
          <p>
            Next to the open kitchen, with full height windows and candles in the evening. The feasting menu is £60 a
            head, shared by the whole table.
          </p>
          <p className="more">
            <Link to="/private-dining">Plan a feast</Link>
          </p>
        </div>
      </section>

      <Rule />

      <section className="block said">
        <p className="eyebrow">What’s been said</p>
        <ul className="said-list">
          {quotes.map((q) => (
            <li key={q.id}>
              <blockquote>
                <p>“{q.quote}”</p>
              </blockquote>
              <p className="said-by">
                {q.by}, {q.title}
              </p>
            </li>
          ))}
        </ul>
        <ul className="honours">
          {accolades
            .filter((a) => !a.by)
            .map((a) => (
              <li key={a.id}>
                <Star className="honours-star" />
                <span>
                  <strong>{a.title}</strong>
                  <span className="honours-detail">{a.detail}</span>
                </span>
              </li>
            ))}
        </ul>
        <p className="more">
          <Link to="/the-pub">About the pub</Link>
        </p>
      </section>

      <Rule />

      <section className="block visit-short">
        <p className="eyebrow">Find us</p>
        <h2 className="block-title">
          {contact.street}, {contact.postcode}
        </h2>
        <p>
          On the corner of a quiet crescent, a few minutes from the Regent’s Canal.{' '}
          {story.stations.map((s) => `${s.name} (${s.note})`).join(' and ')}.
        </p>
        <p className="actions-row">
          <a className="button" href={contact.maps} target="_blank" rel="noopener">
            Map
          </a>
          <a className="button" href={contact.phoneHref}>
            {contact.phone}
          </a>
          <a className="button" href={contact.vouchers} target="_blank" rel="noopener">
            Gift vouchers
          </a>
        </p>
      </section>
    </>
  )
}
