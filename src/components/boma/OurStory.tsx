import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Home } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

const FALLBACK_DATA = {
  eyebrow: 'OUR STORY',
  headline: 'Design that feels considered, made from honest materials to live with you for decades.',
  text: 'Every Boma piece is designed with care, built to last and delivered to your door. Replace this paragraph with the studio\'s own story: who you are, how you work and what makes your furniture different.',
  image: {
    src: '/api/media/file/furniture1.webp',
    alt: 'Handcrafted sofa in a minimalist studio setting',
  },
  caption: 'Handcrafted in our studio since 2009',
  buttonText: 'Discover our story',
  buttonLink: '/about',
  stats: [
    { value: '4.9', label: 'CUSTOMER RATING' },
    { value: '2,400+', label: 'PIECES DELIVERED' },
    { value: '12+', label: 'YEARS OF CRAFT' },
    { value: '98%', label: 'WOULD RECOMMEND' },
  ],
}

export async function OurStory() {
  const home = ((await getCachedGlobal('home', 1)()) ?? {}) as Partial<Home>
  const cmsStory = home.ourStory

 const imgObj = cmsStory?.image

  let imageSrc = FALLBACK_DATA.image.src
  let imageAlt = FALLBACK_DATA.image.alt

  if (imgObj) {
    if (typeof imgObj === 'object' && imgObj !== null) {
      // Si Payload renvoie l'objet média complet
      if ('url' in imgObj && typeof imgObj.url === 'string') {
        imageSrc = imgObj.url
      }
      if ('alt' in imgObj && typeof imgObj.alt === 'string' && imgObj.alt) {
        imageAlt = imgObj.alt
      }
    } else if (typeof imgObj === 'string') {
      // Si Payload ne renvoie que l'ID, on reconstruit l'URL de l'API media
      imageSrc = `/api/media/file/${imgObj}` 
    }
  }

  const eyebrow = cmsStory?.eyebrow || FALLBACK_DATA.eyebrow
  const headline = cmsStory?.headline || FALLBACK_DATA.headline
  const text = cmsStory?.text || FALLBACK_DATA.text
  const caption = cmsStory?.imageCaption || FALLBACK_DATA.caption
  const buttonText = cmsStory?.buttonText || FALLBACK_DATA.buttonText
  const buttonLink = cmsStory?.buttonLink || FALLBACK_DATA.buttonLink

  const stats =
    cmsStory?.stats && cmsStory.stats.length > 0
      ? cmsStory.stats
      : FALLBACK_DATA.stats

  return (
    <section className="bg-page py-[--space-section-y]">
      <div className="">
        {/* Conteneur principal beige/alt arrondi */}
        <div className="bg-alt p-6 sm:p-10  lg:p-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            
            {/* Colonne Gauche : Image + Caption + Bouton */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="relative h-[420px] w-full overflow-hidden rounded-[20px] bg-surface sm:h-[500px] lg:h-[560px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute bottom-4 left-4 right-4 text-xs text-inverse drop-shadow-xs lg:bottom-6 lg:left-6">
                  {caption}
                </span>
              </div>

              <Button
                asChild
                className="h-auto w-full justify-between rounded-full bg-dark px-7 py-4 text-[15px] font-medium text-inverse hover:bg-dark-soft"
              >
                <Link href={buttonLink}>
                  <span>{buttonText}</span>
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>

            {/* Colonne Droite : Textes & Statistiques */}
            <div className="flex flex-col justify-between py-2 lg:col-span-7">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  <span className="size-1.5 rounded-full bg-brand" />
                  {eyebrow}
                </span>

                <h2 className="font-serif text-[36px] leading-[42px] tracking-tight text-ink sm:text-[44px] sm:leading-[50px] lg:text-[56px] lg:leading-[62px]">
                  {headline}
                </h2>

                <p className="max-w-[620px] text-base leading-[26px] text-ink-soft lg:text-[17px] lg:leading-[28px]">
                  {text}
                </p>
              </div>

              {/* Ligne des statistiques */}
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-line/80 pt-8 sm:grid-cols-4 lg:mt-16">
                {stats.map((stat, i) => (
                  <div key={stat.label || i} className="space-y-2 border-line  border-r">
                    <div className="relative inline-block">
                      <p className="font-serif text-[36px] font-normal leading-none text-ink lg:text-[44px]">
                        {stat.value}
                      </p>
                      <span className="mt-2 block h-[2px] w-8 bg-brand" />
                    </div>
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-ink-soft lg:text-[11px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}