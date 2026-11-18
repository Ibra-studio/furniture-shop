import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { Home } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeroCard, HeroSlide, HeroSlider } from './HeroSlider'



// Valeurs de secours : utilisées tant que le Global « Home » n'est pas rempli dans /admin.
// (Images dans public/images/hero/ ; tu pourras supprimer ces fichiers une fois le CMS rempli.)
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    src: '/images/hero/slide-1.jpg',
    alt: 'Living room with tan armchairs around a round coffee table',
  },
  {
    src: '/images/hero/slide-2.jpg',
    alt: 'Lounge with two brown sofas under a golden tree artwork',
  },
  {
    src: '/images/hero/slide-3.jpg',
    alt: 'Sunlit living room with a cream sofa and an arched alcove',
  },
]

const FALLBACK_CARD: HeroCard = {
  title: 'Cozy Curve Sofa',
  collection: 'Signature',
  priceLabel: 'KES 145,000',
  href: '/shop',
}

const FALLBACK_INTRO_IMAGE = {
  src: '/images/hero/intro.jpg',
  alt: 'A grey sofa with blue and white cushions',
}
const FALLBACK_HEADLINE = 'Furniture that makes a house feel like home'
const FALLBACK_EYEBROW = 'Boma · Handcrafted furniture'
const FALLBACK_INTRO =
  'Design-led sofas, tables and storage, made to bring warmth, character and lasting quality to every room.'
const FALLBACK_BADGE = 'New collection 2026'

// Animation d'entrée (tw-animate-css) : désactivée si l'utilisateur réduit les animations
const enter = 'animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 motion-reduce:animate-none'

export async function Hero() {
  const home = ((await getCachedGlobal('home', 1)()) ?? {}) as Partial<Home>

  // Slides : images envoyées dans /admin (Globals > Home page)
  const cmsSlides: HeroSlide[] = (home.heroSlides ?? []).flatMap((slide) => {
    const img = slide.image
    if (typeof img !== 'object' || !img?.url) return []
    return [{ src: img.url, alt: img.alt || 'Boma Design Studio interior' }]
  })
  const slides = cmsSlides.length > 0 ? cmsSlides : FALLBACK_SLIDES

  const introImg = home.hero?.introImage
  const introImage =
    typeof introImg === 'object' && introImg?.url
      ? { src: introImg.url, alt: introImg.alt || 'Boma Design Studio' }
      : FALLBACK_INTRO_IMAGE

  const card: HeroCard = {
    title: home.heroCard?.title || FALLBACK_CARD.title,
    collection: home.heroCard?.collection || FALLBACK_CARD.collection,
    priceLabel: home.heroCard?.priceLabel || FALLBACK_CARD.priceLabel,
    href: home.heroCard?.link || FALLBACK_CARD.href,
  }

  const eyebrow = home.hero?.eyebrow || FALLBACK_EYEBROW
  const headline = home.hero?.headline || FALLBACK_HEADLINE
  const intro = home.hero?.intro || FALLBACK_INTRO
  const badge = home.hero?.introBadge || FALLBACK_BADGE
  const interval = (home.heroAutoplaySeconds || 4) * 1000

  return (
    <section className="bg-page pb-(--space-section-y) pt-7 lg:pt-14">
      <div className="container-boma flex flex-col gap-7 lg:gap-14">
        {/* Ligne du haut : titre à gauche, introduction à droite (desktop) */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-7 lg:gap-9">
            <span
              className={`${enter} inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink lg:px-[18px] lg:text-xs`}
            >
              <span aria-hidden className="size-[7px] rounded-full bg-brand lg:size-2" />
              {eyebrow}
            </span>

            <h1
              className={`${enter} delay-100 max-w-[870px] font-serif text-[44px] leading-[50px] tracking-[-0.02em] text-ink md:text-[64px] md:leading-[68px] lg:text-[88px] lg:leading-[98px] lg:tracking-[-0.025em]`}
            >
              {headline}
            </h1>

            <div className={`${enter} delay-200`}>
              {/* Mobile : un seul bouton */}
              <Button
                asChild
                className="h-auto rounded-full px-6 py-4 text-[15px] font-medium lg:hidden"
              >
                <Link href="/contact">
                  Book a consultation
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </Button>

              {/* Desktop : deux boutons */}
              <div className="hidden gap-3.5 lg:flex">
                <Button asChild className="h-auto rounded-full px-7 py-4 text-[15px] font-medium">
                  <Link href="/shop">
                    Shop the collection
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-full border-ink bg-transparent px-7 py-4 text-[15px] font-medium text-ink hover:bg-alt"
                >
                  <Link href="/contact">
                    Book a consultation
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Image d'introduction + texte */}
          <div className={`${enter} flex flex-col gap-5 delay-300 lg:w-[360px]`}>
            <div className="relative h-[220px] w-full overflow-hidden rounded-(--radius-card) bg-alt lg:h-[171px]">
              <Image
                src={introImage.src}
                alt={introImage.alt}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-surface px-3.5 py-2 text-xs font-medium text-ink">
                {badge}
              </span>
            </div>
            <p className="text-base leading-[26px] text-ink-soft lg:text-[17px] lg:leading-[27px]">
              {intro}
            </p>
          </div>
        </div>

        {/* Slider d'images */}
        <HeroSlider slides={slides} card={card} interval={interval} />
      </div>
    </section>
  )
}