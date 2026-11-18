import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { DefaultDocumentIDType, Where } from 'payload'

export const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', 'enableVariants', '_status', 'variants.variants'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    variantOptions: true,
    variants: true,
    enableVariants: true,
    gallery: true,
    priceInUSD: true,
    inventory: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'variantOption',
                  type: 'relationship',
                  relationTo: 'variantOptions',
                  admin: {
                    condition: (data) => {
                      return data?.enableVariants === true && data?.variantTypes?.length > 0
                    },
                  },
                  filterOptions: ({ data }) => {
                    if (data?.enableVariants && data?.variantTypes?.length) {
                      const variantTypeIDs = data.variantTypes.map((item: any) => {
                        if (typeof item === 'object' && item?.id) {
                          return item.id
                        }
                        return item
                      }) as DefaultDocumentIDType[]

                      if (variantTypeIDs.length === 0)
                        return {
                          variantType: {
                            in: [],
                          },
                        }

                      const query: Where = {
                        variantType: {
                          in: variantTypeIDs,
                        },
                      }

                      return query
                    }

                    return {
                      variantType: {
                        in: [],
                      },
                    }
                  },
                },
              ],
            },

            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            ...defaultCollection.fields,
            {
              name: 'relatedProducts',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }

                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'products',
            },
          ],
          label: 'Product Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    // --- CHAMPS AJOUTÉS POUR CORRESPONDRE À VOS BESOINS E-COMMERCE & UI ---
    {
      name: 'roomCategory',
      type: 'select',
      label: 'Pièce associée (Shop by Room)',
      admin: {
        position: 'sidebar',
        description: 'Permet de lier le produit au filtre des pièces de la page d’accueil',
      },
      options: [
        { label: 'Living Room', value: 'living-room' },
        { label: 'Bedroom', value: 'bedroom' },
        { label: 'Dining', value: 'dining' },
        { label: 'Storage', value: 'storage' },
        { label: 'Home Office', value: 'home-office' },
      ],
    },
    {
      name: 'badge',
      type: 'select',
      label: 'Badge produit',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Best Seller', value: 'best-seller' },
        { label: 'New', value: 'new' },
        { label: 'Sale', value: 'sale' },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Note moyenne (ex: 4.9)',
      defaultValue: 4.9,
      admin: { position: 'sidebar' },
    },
    {
      name: 'reviewsCount',
      type: 'number',
      label: "Nombre d'avis (ex: 128)",
      defaultValue: 128,
      admin: { position: 'sidebar' },
    },
    {
      name: 'colors',
      type: 'array',
      label: 'Pastilles de couleurs disponibles',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'colorHex', type: 'text', label: 'Code Hex (ex: #A4522F)' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    slugField(),
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Prix actuel (ex: 1480)',
      admin: {
        position: 'sidebar',
        description: 'Le prix de vente actuel du produit',
      },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      label: 'Prix d’origine / Barré (ex: 1150)',
      admin: {
        position: 'sidebar',
        description: 'Optionnel : Remplir uniquement si le produit est en solde (pour afficher le prix barré)',
      },
    },
  ],
})