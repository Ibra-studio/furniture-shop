import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'
import { revalidateGlobal } from './hooks/RevalidateGlobal'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: adminOnly,
  },
  hooks: {
      afterChange: [revalidateGlobal('header')],
    },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'promoCards',
      type: 'group',
      label: 'Menu Shop - Cartes Promo',
      fields: [
        {
          name: 'card1',
          type: 'group',
          label: 'Carte 1 (ex: New Arrivals)',
          fields: [
            { name: 'subtitle', type: 'text', defaultValue: 'New Arrivals' },
            { name: 'title', type: 'text', defaultValue: 'Autumn Collection' },
            { name: 'link', type: 'text', defaultValue: '/shop?collection=new-arrivals' },
            { 
              name: 'image', 
              type: 'upload', 
              relationTo: 'media',
              required: true 
            },
          ],
        },
        {
          name: 'card2',
          type: 'group',
          label: 'Carte 2 (ex: Best Sellers)',
          fields: [
            { name: 'subtitle', type: 'text', defaultValue: 'Best Sellers' },
            { name: 'title', type: 'text', defaultValue: 'Loved by 1,200+ homes' },
            { name: 'link', type: 'text', defaultValue: '/shop?collection=best-sellers' },
            { 
              name: 'image', 
              type: 'upload', 
              relationTo: 'media',
              required: true 
            },
          ],
        },
      ],
    },
  ],
}
