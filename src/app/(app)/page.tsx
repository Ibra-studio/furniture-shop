import type { Metadata } from 'next'

import { Hero } from '@/components/boma/Hero'
import { ShopByRoom } from '@/components/boma/ShopByRoom'
import { OurStory } from '@/components/boma/OurStory'

export const metadata: Metadata = {
  title: { absolute: 'Boma Design Studio | Design-led furniture in Kenya' },
  description: 'Sofas, tables, beds and storage designed to bring warmth to every room.',
}

export default function HomePage() {
  return (
    <> 
    <Hero />
    <ShopByRoom />
    <OurStory />
    </>
  )
}