import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { revalidateGlobal } from './hooks/RevalidateGlobal'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  access: {
    read: () => true,
    update: adminOnly,
  },
  hooks: {
    afterChange: [revalidateGlobal('home')],
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero text',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Boma · Handcrafted furniture',
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: 'Furniture that makes a house feel like home',
          admin: { description: 'Main title of the page (H1). Keep it short and clear.' },
        },
        {
          name: 'intro',
          type: 'textarea',
          defaultValue:
            'Design-led sofas, tables and storage, made to bring warmth, character and lasting quality to every room.',
        },
        {
          name: 'introImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Small intro image',
        },
        {
          name: 'introBadge',
          type: 'text',
          defaultValue: 'New collection 2026',
        },
      ],
    },
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Hero slider images',
      labels: { singular: 'Slide', plural: 'Slides' },
      minRows: 1,

      maxRows:6,
      admin: {
        description:
          'Click "Add Slide" to add a maximum of 6 photos, and drag to reorder. Wide photos, about 2560 × 1360 px, under 400 KB. The first slide loads first. The alt text comes from the Media item.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'heroAutoplaySeconds',
      type: 'number',
      label: 'Seconds per slide',
      defaultValue: 4,
      min: 2,
      max: 12,
    },
    {
      name: 'heroCard',
      type: 'group',
      label: 'Product card on the slider',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Cozy Curve Sofa' },
        { name: 'collection', type: 'text', defaultValue: 'Signature' },
        { name: 'priceLabel', type: 'text', defaultValue: 'KES 145,000' },
        { name: 'link', type: 'text', defaultValue: '/shop' },
      ],
    },
    /* -------------------------------------------------------------------------- */
    /* 2. SHOP BY ROOM SECTION                                                   */
    /* -------------------------------------------------------------------------- */
    {
      name: 'shopByRoom',
      type: 'group',
      label: 'Shop by Room Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: '01 ROOMS',
          admin: { description: 'Petit texte en sur-titre (ex: 01 ROOMS)' },
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Shop by room',
          admin: { description: 'Titre principal de la section' },
        },
        {
          name: 'description',
          type: 'text',
          defaultValue: 'Carefully chosen furniture for every room in your home.',
          admin: { description: 'Description à droite du titre' },
        },
        {
          name: 'rooms',
          type: 'array',
          label: 'Rooms List',
          labels: { singular: 'Room', plural: 'Rooms' },
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Ajoutez et ordonnez les pièces affichées sur la page d\'accueil.',
          },
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
              admin: { description: 'Numéro d\'affichage (ex: 01, 02, 03...)' },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Nom de la pièce (ex: Living Room, Bedroom...)' },
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              admin: { description: 'Description courte (ex: Sofas, armchairs & statement pieces)' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              defaultValue: '/shop?category=living-room',
              admin: { description: 'Lien de redirection de la carte pour filtrer les produits' },
            },
          ],
        },
      ],
    },
    /* -------------------------------------------------------------------------- */
    /* 3. OUR STORY SECTION                                                       */
    /* -------------------------------------------------------------------------- */
    {
      name: 'ourStory',
      type: 'group',
      label: 'Our Story Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'OUR STORY',
        },
        {
          name: 'headline',
          type: 'text',
          defaultValue: 'Design that feels considered, made from honest materials to live with you for decades.',
        },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            'Every Boma piece is designed with care, built to last and delivered to your door. Replace this paragraph with the studio\'s own story: who you are, how you work and what makes your furniture different.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageCaption',
          type: 'text',
          defaultValue: 'Handcrafted in our studio since 2009',
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Discover our story',
        },
        {
          name: 'buttonLink',
          type: 'text',
          defaultValue: '/about',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          minRows: 1,
          maxRows: 4,
          defaultValue: [
            { value: '4.9', label: 'CUSTOMER RATING' },
            { value: '2,400+', label: 'PIECES DELIVERED' },
            { value: '12+', label: 'YEARS OF CRAFT' },
            { value: '98%', label: 'WOULD RECOMMEND' },
          ],
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}