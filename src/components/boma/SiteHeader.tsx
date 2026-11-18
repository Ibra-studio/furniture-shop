'use client'

import { ArrowUpRight, ChevronDown, Menu, Search, ShoppingBag, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { OpenCartButton } from '../Cart/OpenCart'
import { Cart } from '../Cart'
import { PromoCard } from '../Header/PromoCard'
import type { Header } from 'src/payload-types'


type NavItem = {
  label: string
  href?: string
  isMegaMenu?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Shop', isMegaMenu: true },
  { label: 'Collections', href: '/collections' },
  { label: 'Our Story', href: '/about' },
  { label: 'Blog', href: '/Blog' },
  { label: 'Contact', href: '/contact' },
]

const SHOP_ROOMS = [
  { label: 'Living Room', href: '/shop?category=living-room' },
  { label: 'Bedroom', href: '/shop?category=bedroom' },
  { label: 'Dining', href: '/shop?category=dining' },
  { label: 'Storage', href: '/shop?category=storage' },
  { label: 'Home Office', href: '/shop?category=home-office' },
]

const SHOP_CATEGORIES = [
  { label: 'Sofa', href: '/shop?category=sofa' },
  { label: 'Chair', href: '/shop?category=chair' },
  { label: 'Table', href: '/shop?category=table' },
  { label: 'Storage', href: '/shop?category=storage' },
  { label: 'Lighting', href: '/shop?category=lighting' },
]

type Props = {
 readonly header: Header
  cartCount?: number
}

function Logo() {
  return (
    <Link href="/" aria-label="Boma Design Studio, home" className="flex items-center gap-2.5 lg:gap-3.5">
      <span className="grid size-10 place-items-center rounded-xl bg-dark font-serif text-2xl text-inverse lg:size-12 lg:rounded-[14px] lg:text-[30px]">
        B
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-2xl tracking-[0.06em] text-ink lg:text-[28px]">BOMA</span>
        <span className="mt-1 text-[8px] font-medium tracking-[0.22em] text-ink-soft lg:text-[10px]">
          DESIGN STUDIO
        </span>
      </span>
    </Link>
  )
}

export function SiteHeader({ header , cartCount = 0 }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const pathname = usePathname()

  // Ferme les menus lors d'un changement de route
  useEffect(() => {
    setMobileMenuOpen(false)
    setIsShopOpen(false)
  }, [pathname])

  // Bloque le scroll et ferme sur Échap
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setIsShopOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileMenuOpen])

  return (
    <header className="relative z-40 bg-page border-b border-line">
      <div className="container-boma flex items-center justify-between py-4 lg:py-6">
        
        {/* Logo */}
        <Logo />

        {/* Navigation Desktop */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative">
                {item.isMegaMenu ? (
                  <button
                    type="button"
                    onClick={() => setIsShopOpen((prev) => !prev)}
                    className={`flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium transition-colors cursor-pointer hover:text-brand ${
                  isShopOpen ? 'bg-alt text-brand' : 'text-ink'
                     }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        isShopOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || '#'}
                   className="flex w-full items-center justify-center rounded-full px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions Droite */}
        <div className="flex items-center gap-3.5 lg:gap-6">
          <Link href="/search" aria-label="Search" className="hidden lg:block text-ink hover:text-brand transition-colors">
            <Search className="size-[22px]" strokeWidth={1.75} />
          </Link>

          <Suspense fallback={<OpenCartButton quantity={0} />}>
            <Cart />
          </Suspense>

          <span aria-hidden className="h-7 w-px bg-line lg:hidden" />

          <Link
            href="/shop"
            className="hidden items-center gap-2.5 rounded-full bg-dark px-7 py-3.5 text-[15px] font-medium text-inverse transition-opacity hover:opacity-90 lg:inline-flex"
          >
            Shop now
            <ArrowUpRight className="size-4" />
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="grid size-12 place-items-center rounded-[14px] bg-brand text-inverse lg:hidden cursor-pointer"
          >
            <Menu className="size-[22px]" />
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* MEGA MENU SHOP (DESKTOP) - Déclenché uniquement au clic                   */}
      {/* -------------------------------------------------------------------------- */}
      {isShopOpen && (
        <div className="hidden lg:block absolute left-0 top-full w-full bg-page border-b border-line shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="container-boma py-10 grid grid-cols-12 gap-8">
            
            {/* Colonne 1 : Shop by Room */}
            <div className="col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-5">
                Shop by Room
              </h4>
              <ul className="space-y-2">
                {SHOP_ROOMS.map((room) => (
                  <li key={room.label} className="border-b border-line/60 pb-2 group cursor-pointer hover:border-brand">
                    <Link
                      href={room.href}
                      onClick={() => setIsShopOpen(false)}
                      className="block text-[15px] text-ink transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-brand"
                    >
                      {room.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 2 : Shop by Category */}
            <div className="col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-5">
                Shop by Category
              </h4>
              <ul className="space-y-2">
                {SHOP_CATEGORIES.map((cat) => (
                  <li key={cat.label} className="border-b border-line/60 pb-2 group cursor-pointer hover:border-brand">
                    <Link
                      href={cat.href}
                      onClick={() => setIsShopOpen(false)}
                      className="block text-[15px] text-ink transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-brand"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonnes 3 & 4 : Cartes promo (Placeholders) */}
             <div className="col-span-6 grid grid-cols-2 gap-5">
                    
                    {/* Carte Promo 1 (Reliée à Payload) */}
                    <PromoCard 
                      title={header?.promoCards?.card1?.title || "Autumn Collection"}
                      subtitle={header?.promoCards?.card1?.subtitle || "New Arrivals"}
                      href={header?.promoCards?.card1?.link || "/shop?collection=new-arrivals"}
                      image={header?.promoCards?.card1?.image}
                      onClose={() => setIsShopOpen(false)}
                    />
            
                    {/* Carte Promo 2 (Reliée à Payload) */}
                    <PromoCard 
                      title={header?.promoCards?.card2?.title || "Loved by 1,200+ homes"}
                      subtitle={header?.promoCards?.card2?.subtitle || "Best Sellers"}
                      href={header?.promoCards?.card2?.link || "/shop?collection=best-sellers"}
                      image={header?.promoCards?.card2?.image}
                      onClose={() => setIsShopOpen(false)}
                    />
            
                  </div>

          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MENU MOBILE                                                                */}
      {/* -------------------------------------------------------------------------- */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-dark/55 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Tiroir Mobile */}
        <aside
          className={`absolute left-0 top-0 flex h-full w-[88%] max-w-[340px] flex-col bg-page transition-transform duration-300 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-line">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="grid size-10 place-items-center rounded-full bg-alt text-ink cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="px-6 pt-3">
            <ul className="divide-y divide-line">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="py-3">
                  {item.isMegaMenu ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsShopOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between py-2 font-serif text-[28px] text-ink cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`size-6 transition-transform duration-200 ${
                            isShopOpen ? 'rotate-180 text-brand' : ''
                          }`}
                        />
                      </button>

                      {/* Sous-accordéon Shop sur Mobile */}
                      {isShopOpen && (
                        <div className="pl-2 pt-2 pb-4 space-y-5 animate-in fade-in duration-200">
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                              Shop by Room
                            </span>
                            <ul className="mt-2 space-y-2 border-l-2 border-line pl-4">
                              {SHOP_ROOMS.map((room) => (
                                <li key={room.label}>
                                  <Link
                                    href={room.href}
                                    className="block text-base text-ink hover:text-brand"
                                  >
                                    {room.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                              Shop by Category
                            </span>
                            <ul className="mt-2 space-y-2 border-l-2 border-line pl-4">
                              {SHOP_CATEGORIES.map((cat) => (
                                <li key={cat.label}>
                                  <Link
                                    href={cat.href}
                                    className="block text-base text-ink hover:text-brand"
                                  >
                                    {cat.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="block py-2 font-serif text-[28px] text-ink hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pt-6">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2.5 rounded-full bg-dark px-7 py-4 text-[15px] font-medium text-inverse"
            >
              Shop now
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-auto space-y-1.5 px-6 py-6 text-[12px] text-ink-soft border-t border-line mt-6">
            <p>Pay with M-Pesa, card or bank transfer</p>
            <p>Free delivery on orders over KES 50,000</p>
          </div>
        </aside>
      </div>
    </header>
  )
}