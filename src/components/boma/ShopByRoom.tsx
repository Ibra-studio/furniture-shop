import Image from 'next/image'
import Link from 'next/link'
import type { Home } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

// Type pour une pièce (depuis Payload ou Fallback)
export type RoomItem = {
  number: string
  title: string
  subtitle: string
  image: {
    src: string
    alt: string
  }
  link: string
}

// Valeurs de secours (si le CMS n'est pas encore rempli)
const FALLBACK_ROOMS: RoomItem[] = [
  {
    number: '01',
    title: 'Living Room',
    subtitle: 'Sofas, armchairs & statement pieces',
    image: { src: '/images/rooms/living-room.jpg', alt: 'Living Room interior' },
    link: '/shop?category=living-room',
  },
  {
    number: '02',
    title: 'Bedroom',
    subtitle: 'Beds, wardrobes & calm bedside tables',
    image: { src: '/images/rooms/bedroom.jpg', alt: 'Bedroom interior' },
    link: '/shop?category=bedroom',
  },
  {
    number: '03',
    title: 'Dining',
    subtitle: 'Tables, chairs & sideboards',
    image: { src: '/images/rooms/dining.jpg', alt: 'Dining room interior' },
    link: '/shop?category=dining',
  },
  {
    number: '04',
    title: 'Storage',
    subtitle: 'Shelving, cabinets & smart organisers',
    image: { src: '/images/rooms/storage.jpg', alt: 'Storage solutions' },
    link: '/shop?category=storage',
  },
  {
    number: '05',
    title: 'Home Office',
    subtitle: 'Desks, chairs & bookcases',
    image: { src: '/images/rooms/office.jpg', alt: 'Home Office interior' },
    link: '/shop?category=home-office',
  },
]

export async function ShopByRoom() {
  const home = ((await getCachedGlobal('home', 1)()) ?? {}) as Partial<Home>
  const shopData = home.shopByRoom

  // Récupération des pièces depuis Payload CMS ou utilisation des fallbacks
  const cmsRooms: RoomItem[] = (shopData?.rooms ?? []).flatMap((room) => {
    const img = room.image
    if (typeof img !== 'object' || !img?.url) return []
    return [
      {
        number: room.number,
        title: room.title,
        subtitle: room.subtitle,
        image: { src: img.url, alt: img.alt || room.title },
        link: room.link,
      },
    ]
  })

  const rooms = cmsRooms.length > 0 ? cmsRooms : FALLBACK_ROOMS

  const eyebrow = shopData?.eyebrow || '01 ROOMS'
  const title = shopData?.title || 'Shop by room'
  const description =
    shopData?.description || 'Carefully chosen furniture for every room in your home.'

  return (
    <section className="bg-page py-[--space-section-y] pb-(--space-section-y)">
      <div className="container-boma flex flex-col gap-12 lg:gap-16">
        
        {/* En-tête de section : Titre à gauche, description à droite */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between border-b border-line pb-8">
          <div className="space-y-3">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {eyebrow}
            </span>
            <h2 className="font-serif text-[38px] leading-[44px] tracking-tight text-ink md:text-[52px] md:leading-[58px] lg:text-[64px] lg:leading-[70px]">
              {title}
            </h2>
          </div>
          <p className="max-w-[320px] text-base leading-[26px] text-ink-soft lg:text-[17px] lg:leading-[27px]">
            {description}
          </p>
        </div>

        {/* Grille asymétrique à 3 colonnes (similaire à votre maquette Figma) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          
          {/* COLONNE 1 : Living Room (01) & Storage (04) */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {rooms[0] && <RoomCard room={rooms[0]} heightClass="h-[420px] lg:h-[500px]" />}
            {rooms[3] && <RoomCard room={rooms[3]} heightClass="h-[380px] lg:h-[440px]" />}
          </div>

          {/* COLONNE 2 : Bedroom (02) avec effet Sticky au scroll */}
          <div className="flex flex-col gap-8 lg:gap-10 lg:sticky lg:top-28 lg:pt-12">
            {rooms[1] && <RoomCard room={rooms[1]} heightClass="h-[480px] lg:h-[580px]" />}
          </div>

          {/* COLONNE 3 : Dining (03) & Home Office (05) */}
          <div className="flex flex-col gap-8 lg:gap-10 ">
            {rooms[2] && <RoomCard room={rooms[2]} heightClass="h-[380px] lg:h-[440px]" />}
            {rooms[4] && <RoomCard room={rooms[4]} heightClass="h-[420px] lg:h-[500px]" />}
          </div>

        </div>

      </div>
    </section>
  )
}

/* --- Sous-composant pour une carte de pièce --- */
function RoomCard({ room, heightClass }: { room: RoomItem; heightClass: string }) {
  return (
    <Link 
      href={room.link}
      className="group flex flex-col gap-4 focus-visible:outline-none"
    >
      {ImageWrapper(room, heightClass)}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-medium text-brand">{room.number}</span>
            <h3 className="font-serif text-2xl text-ink group-hover:text-brand transition-colors lg:text-[28px]">
              {room.title}
            </h3>
          </div>
          <p className="mt-1 text-sm text-ink-soft lg:text-[15px]">
            {room.subtitle}
          </p>
        </div>
      </div>
    </Link>
  )
}

function ImageWrapper(room: RoomItem, heightClass: string) {
  return (
    <div className={`relative w-full overflow-hidden rounded-[var(--radius-card)] bg-alt ${heightClass}`}>
      <Image
        src={room.image.src}
        alt={room.image.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  )
}