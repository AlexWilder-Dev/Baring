import { Star } from './Logo'

// The thin rule with a star at each end, from their group booking brochure.
export default function Rule({ ends = 'both' }: { ends?: 'both' | 'left' | 'none' }) {
  return (
    <div className="rule" role="presentation">
      {ends !== 'none' && <Star className="rule-star" />}
      <span className="rule-line" />
      {ends === 'both' && <Star className="rule-star" />}
    </div>
  )
}
