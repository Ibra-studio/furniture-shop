import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Fraunces, Inter } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import AnnouncementBar from '@/components/boma/AnnouncementBar'
import { Footer } from '@/components/Footer'
import { SiteHeader } from '@/components/boma/SiteHeader'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'

import './globals.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HeaderClient } from '@/components/Header/index.client'
import { Header } from '@/components/Header'

/* ------------------------------ Polices ------------------------------ */
// Corps de texte, boutons, navigation
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Titres (équivalent de « Fraunces » dans Figma)
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

/* ------------------------------ Métadonnées -------------------------- */
const siteName = process.env.SITE_NAME || 'Boma Design Studio'
const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: 'Design-led furniture: sofas, tables, beds and storage for every room of your home.',
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    siteName,
    type: 'website',
  },
}

/* ------------------------------ Layout ------------------------------- */
export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={[inter.variable, fraunces.variable, GeistMono.variable].join(' ')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />
          <AnnouncementBar />
          <Header/>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}