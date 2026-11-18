import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type PromoCardProps = {
  readonly title: string
  readonly subtitle: string
  readonly href: string
  readonly image?: Media | number | null // L'objet image provenant de Payload CMS
  readonly onClose: () => void
}

export function PromoCard({ title, subtitle, href, image, onClose }: PromoCardProps) {
  // Récupération sécurisée de l'URL et du texte alternatif de l'image Payload
  const imageUrl = typeof image === 'object' && image !== null ? image.url : null
  const imageAlt = (typeof image === 'object' && image !== null && image.alt) || title

  return (
  <Link
      href={href}
      onClick={onClose}
      className="group relative overflow-hidden rounded-2xl bg-dark-soft flex flex-col justify-end p-6 text-inverse h-64"
    >
      {/* 1. L'image en premier plan (fond de la carte), sans -z-10 */}
      <div className="absolute inset-0 w-full h-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800" />
        )}
      </div>

      {/* 2. Le dégradé sombre par-dessus l'image */}
      <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/30 to-transparent z-10" />

      {/* 3. Le texte tout au-dessus */}
      <div className="relative z-20">
        <span className="text-xs uppercase tracking-wider text-inverse-muted">{subtitle}</span>
        <p className="font-serif text-xl font-normal mt-1">{title}</p>
      </div>
    </Link>
  )
}
