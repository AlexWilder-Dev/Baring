import type { MenuItem, PrintedMenu } from '../data/baring'
import { Star } from './Logo'

export function Row({ item }: { item: MenuItem }) {
  return (
    <li className="row">
      <span className="row-name">{item.name}</span>
      {item.price && <span className="row-price">{item.price}</span>}
    </li>
  )
}

// Set like the printed card: no section headings, groups divided by space, prices in a column.
export default function MenuCard({ menu, limit }: { menu: PrintedMenu; limit?: number }) {
  const groups = limit ? menu.groups.slice(0, limit) : menu.groups
  return (
    <div className="card">
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
      {!limit && (
        <div className="card-notes">
          {menu.notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      )}
    </div>
  )
}
