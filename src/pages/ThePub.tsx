import { Link } from 'react-router-dom'
import { Star } from '../components/Logo'
import Photo from '../components/Photo'
import PubFront from '../components/PubFront'
import Rule from '../components/Rule'
import { accolades, photos, story } from '../data/baring'
import { useTime } from '../lib/time'

export default function ThePub() {
  const { candle } = useTime()

  return (
    <article className="page pub">
      <header className="page-head">
        <h1>The pub</h1>
        <p className="page-lead">
          A corner pub on Baring Street, between Islington and Hoxton. It has been the{' '}
          {story.previousNames.join(' and ')}. Since {story.opened} it has been The Baring.
        </p>
      </header>

      <section className="block">
        <PubFront className="pub-front" />
        <p className="caption">The front dates from the 1840s and is locally listed.</p>
        <blockquote className="pull">
          <p>“It’s been a boozer, on and off, for 200 years.”</p>
          <footer>Adam Symonds, who runs the pub</footer>
        </blockquote>
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">The room</p>
        <h2 className="block-title">Linen walls, green panelling, candles at night</h2>
        <div className="prose">
          <p>
            Downstairs is the bar and the dining room: linen-coloured walls and white-painted brick, greige and forest
            green panelling, green banquettes, second-hand tables and chairs in polished wood, metal lamp shades and
            dried flowers. There are stools at the bar for anyone who just wants a drink.
          </p>
          <p>
            Upstairs, beside the open kitchen, is a room for up to 32 with full height windows. In the evening the
            lights go down and the candles are lit, in both rooms.
          </p>
        </div>
        <div className="pair">
          <Photo photo={candle ? photos.laughing : photos.candlesSun} sizes="(min-width: 960px) 360px, 50vw" />
          <Photo photo={candle ? photos.pudding : photos.settings} sizes="(min-width: 960px) 360px, 50vw" />
        </div>
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">The cooking</p>
        <h2 className="block-title">Three things on a plate</h2>
        <div className="prose">
          <p>
            A short menu, written plainly and changed every week. The cooking takes in Turkey, North Africa, Spain and
            Italy as readily as Cornwall and the Highlands, and on Sundays there are roasts.
          </p>
          <blockquote className="pull">
            <p>“Three things on a plate and very little fluff.”</p>
            <footer>Rob Tecwyn, chef</footer>
          </blockquote>
        </div>
        <Photo photo={photos.quail} caption="Quail shish, garlic yoghurt & pul biber chilli" />
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">Sourcing</p>
        <h2 className="block-title">Where it comes from</h2>
        <div className="prose">
          <p>We opened in 2022 buying from people we trust:</p>
          <ul className="suppliers">
            {story.suppliers.map((s) => (
              <li key={s.name}>
                <Star className="list-star" />
                <span>
                  <strong>{s.name}</strong> for {s.what}
                </span>
              </li>
            ))}
          </ul>
          <p>
            The bread was made with Wildfarmed flour, and we set out to keep waste down: no single-use plastics in the
            kitchen, and the oil from the fryer collected for biofuel.
          </p>
        </div>
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">The bar</p>
        <h2 className="block-title">Old World wine, a house lager</h2>
        <div className="prose">
          <p>
            The wine list is Old World and mostly low-intervention, with carafes and glasses as well as bottles. Ask for
            the cellar list of single bottles from rare and iconic producers. At the bar there’s Lost & Grounded X The
            Baring Lager, cask from Five Points, Belgian bottles from De Dolle, Dupont and Tilquin, and a short list of
            cocktails.
          </p>
          <p>
            <Link to="/menus/drinks">The full list</Link>
          </p>
        </div>
      </section>

      <Rule />

      <section className="block">
        <p className="eyebrow">Who runs it</p>
        <div className="prose">
          <p>
            Rob Tecwyn runs the kitchen and Adam Symonds runs the pub. They met working at the Bull & Last in Highgate.
            We opened on a 48-hour week for the team. Our second pub, {story.sister.name}, opened in{' '}
            {story.sister.where} in {story.sister.year}.
          </p>
        </div>
      </section>

      <Rule />

      <section className="block" id="said">
        <p className="eyebrow">Recognition</p>
        <h2 className="block-title">What’s been said</h2>
        <ul className="accolades">
          {accolades.map((a) => (
            <li key={a.id}>
              <p className="accolade-title">
                <a href={a.url} target="_blank" rel="noopener">
                  {a.title}
                </a>
              </p>
              {a.quote && <p className="accolade-quote">“{a.quote}”</p>}
              <p className="accolade-detail">{a.by ? `${a.by}, ${a.date}` : a.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
