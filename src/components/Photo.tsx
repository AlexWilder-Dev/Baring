import type { Photo as PhotoData } from '../data/baring'

const base = import.meta.env.BASE_URL

type Props = {
  photo: PhotoData
  caption?: string
  price?: string
  sizes?: string
  eager?: boolean
  className?: string
}

export default function Photo({
  photo,
  caption,
  price,
  sizes = '(min-width: 960px) 720px, 100vw',
  eager,
  className,
}: Props) {
  const src = (w: number) => `${base}photos/${photo.id}-${w}.jpg`
  return (
    <figure className={`photo ${className ?? ''}`}>
      <div className="photo-frame" style={{ aspectRatio: `${photo.w} / ${photo.h}` }}>
        <img
          src={src(800)}
          srcSet={`${src(800)} 800w, ${src(1600)} 1600w`}
          sizes={sizes}
          alt={photo.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {caption && (
        <figcaption>
          <span>{caption}</span>
          {price && <span className="photo-price">{price}</span>}
        </figcaption>
      )}
    </figure>
  )
}
