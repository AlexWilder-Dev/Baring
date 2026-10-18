import { Link } from 'react-router-dom'
import PubFront from '../components/PubFront'
import Rule from '../components/Rule'
import WeekStrip from '../components/WeekStrip'
import { contact, hoursText, story } from '../data/baring'

export default function Visit() {
  return (
    <article className="page visit">
      <header className="page-head">
        <h1>Visit</h1>
        <p className="page-lead">
          {contact.street}, {contact.town} {contact.postcode}. On the corner of a quiet crescent, a few minutes from the
          Regent’s Canal.
        </p>
        <p className="actions-row">
          <a className="button button-primary" href={contact.booking} target="_blank" rel="noopener">
            Book a table
          </a>
          <a className="button" href={contact.maps} target="_blank" rel="noopener">
            Open in Maps
          </a>
        </p>
      </header>

      <PubFront className="visit-front" />

      <section className="block" id="hours">
        <p className="eyebrow">Opening hours</p>
        <table className="hours">
          <tbody>
            {hoursText.map((h) => (
              <tr key={h.days}>
                <th scope="row">{h.days}</th>
                <td>
                  {h.open}
                  {h.food && <span className="hours-food">{h.food}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <WeekStrip />
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">Getting here</p>
        <ul className="plain-list">
          {story.stations.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong> station, {s.note}
            </li>
          ))}
          <li>Buses on New North Road, a minute away</li>
          <li>The Regent’s Canal towpath, a few minutes’ walk</li>
        </ul>
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">Good to know</p>
        <ul className="plain-list">
          <li>No need to book for a drink. There are stools at the bar.</li>
          <li>Dogs are welcome.</li>
          <li>
            The first-floor room seats up to 32. <Link to="/private-dining">Private dining</Link>
          </li>
          <li>Allergies: please speak to a member of staff before ordering.</li>
          <li>
            <a href={contact.vouchers} target="_blank" rel="noopener">
              Gift vouchers
            </a>{' '}
            can be bought online.
          </li>
        </ul>
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">Contact</p>
        <ul className="contact-list">
          <li>
            <a className="contact-big" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </li>
          <li>
            <a className="contact-big" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </li>
          <li>
            <a className="contact-big" href={contact.instagramUrl} target="_blank" rel="noopener">
              Instagram {contact.instagram}
            </a>
          </li>
        </ul>
      </section>
    </article>
  )
}
