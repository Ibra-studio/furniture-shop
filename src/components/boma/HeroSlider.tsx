'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export type HeroSlide = {
  src: string
  alt: string
}

export type HeroCard = {
  title: string
  collection: string
  priceLabel: string
  href: string
}

type Props = {
  slides: HeroSlide[]
  card: HeroCard
  /** Durée d'affichage de chaque slide, en millisecondes */
  interval?: number
}

// ✏️ Réglages de l'animation « rideau » (la nouvelle image se dévoile de droite à gauche)
const WIPE_DURATION_MS = 1100
const WIPE_EASING = 'cubic-bezier(0.77, 0, 0.175, 1)' // départ et arrivée en douceur
// Pour dévoiler de gauche à droite à la place, remplace par :
//   from: 'inset(0 100% 0 0)'
const WIPE_FROM = 'inset(0 0 0 100%)'
const WIPE_TO = 'inset(0 0 0 0)'

// useLayoutEffect évite un flash d'une image avant le début de l'animation
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function HeroSlider({ slides, card, interval = 4000 }: Props) {
  const [state, setState] = useState({ current: 0, previous: -1 })
  const [paused, setPaused] = useState(false)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastAnimated = useRef(0)

  // Défilement automatique : pausé au survol, désactivé si l'utilisateur
  // préfère réduire les animations.
  useEffect(() => {
    if (slides.length < 2 || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setState((s) => ({ current: (s.current + 1) % slides.length, previous: s.current }))
    }, interval)

    return () => window.clearInterval(id)
  }, [slides.length, paused, interval])

  // Animation : la nouvelle slide est dévoilée par-dessus l'ancienne
  useIsoLayoutEffect(() => {
    if (lastAnimated.current === state.current) return
    lastAnimated.current = state.current

    const el = slideRefs.current[state.current]
    if (!el) return

    const animation = el.animate([{ clipPath: WIPE_FROM }, { clipPath: WIPE_TO }], {
      duration: WIPE_DURATION_MS,
      easing: WIPE_EASING,
    })
    return () => animation.cancel()
  }, [state.current])

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured rooms"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[460px] overflow-hidden rounded-[28px] bg-alt sm:h-[540px] lg:h-[680px] lg:rounded-[32px]"
    >
      {slides.map((slide, i) => {
        const isCurrent = i === state.current
        const isPrevious = i === state.previous

        return (
          <div
            key={slide.src}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            aria-hidden={!isCurrent}
            className="absolute inset-0"
            style={{
              // la slide qui arrive passe au-dessus de celle qui part
              zIndex: isCurrent ? 2 : isPrevious ? 1 : 0,
              visibility: isCurrent || isPrevious ? 'visible' : 'hidden',
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : 'eager'}
              sizes="(min-width: 1440px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        )
      })}

      {/* Carte produit, fixe pendant le défilement */}
      <div className="absolute bottom-3.5 left-3.5 z-10 w-[296px] rounded-(--radius-card) bg-page p-5 lg:bottom-10 lg:left-10 lg:w-[360px] lg:p-8">
        <p className="font-serif text-2xl text-ink lg:text-[30px]">{card.title}</p>
        <hr className="my-3.5 border-line lg:my-[18px]" />

        <div className="flex gap-9 lg:flex-col lg:gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-soft lg:text-[11px]">
              Collection
            </p>
            <p className="mt-1 font-serif text-xl text-ink lg:text-[26px]">{card.collection}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-soft lg:text-[11px]">
              From
            </p>
            <p className="mt-1 font-serif text-xl text-ink lg:text-[26px]">{card.priceLabel}</p>
          </div>
        </div>

        <Link
          href={card.href}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand lg:mt-[18px] lg:text-[15px]"
        >
          View product
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  )
}