import { useState } from 'react'
import { bar, wineList, type Wine } from '../data/baring'
import { Row } from './MenuCard'

function splitGrapes(name: string) {
  const i = name.lastIndexOf(' (')
  return i > 0 ? [name.slice(0, i), name.slice(i + 1)] : [name, '']
}

function WineRow({ wine, columns }: { wine: Wine; columns: string[] }) {
  const [title, grapes] = splitGrapes(wine.name)
  const value = (c: string) => (c === '125ml' ? wine.glass : c === '500ml' ? wine.carafe : wine.bottle)
  return (
    <li className="wine">
      <span className="wine-name">
        {title}
        {grapes && <span className="wine-grapes"> {grapes}</span>}
        {wine.chilled && <span className="wine-chilled"> (chilled)</span>}
      </span>
      <span className="wine-prices">
        {columns.map((c) => (
          <span key={c} className="wine-price">
            {value(c) ?? ''}
          </span>
        ))}
      </span>
    </li>
  )
}

export default function DrinksList() {
  const [glassOnly, setGlassOnly] = useState(false)

  return (
    <div className="drinks">
      <nav className="jump" aria-label="Drinks sections">
        {wineList.sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => jump(e, s.id)}>
            {s.title}
          </a>
        ))}
        {bar.map((b) => (
          <a key={b.id} href={`#${b.id}`} onClick={(e) => jump(e, b.id)}>
            {b.title}
          </a>
        ))}
      </nav>

      <p className="cellar">{wineList.cellarNote}</p>

      <label className="toggle">
        <input type="checkbox" checked={glassOnly} onChange={(e) => setGlassOnly(e.target.checked)} />
        <span className="toggle-box" aria-hidden="true" />
        <span>Only wines by the glass</span>
      </label>

      {wineList.sections.map((s) => {
        const wines = glassOnly ? s.wines.filter((w) => w.glass) : s.wines
        if (!wines.length) return null
        return (
          <section key={s.id} id={s.id} className="drinks-section">
            <header className="wine-head">
              <h3>{s.title}</h3>
              <span className="wine-prices">
                {s.columns.map((c) => (
                  <span key={c} className="wine-price">
                    {c}
                  </span>
                ))}
              </span>
            </header>
            <ul>
              {wines.map((w) => (
                <WineRow key={w.name} wine={w} columns={s.columns} />
              ))}
            </ul>
          </section>
        )
      })}

      {bar.map((b) => (
        <section key={b.id} id={b.id} className="drinks-section">
          {b.lists.map((l, i) => (
            <div key={`${l.title}${i}`} className="bar-list">
              <header className="wine-head">
                <h3>{l.title}</h3>
                {l.unit && <span className="wine-price">{l.unit}</span>}
              </header>
              <ul>
                {l.items.map((item) => (
                  <Row key={item.name} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

function jump(e: React.MouseEvent, id: string) {
  // HashRouter owns the hash, so scroll by hand.
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
