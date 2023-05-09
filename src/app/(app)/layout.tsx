import '../globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import AppProviders from './AppProviders'
import Nav from '@/components/Nav'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Footer from '@/components/Footer'
import { Jura } from 'next/font/google'
import { Metadata } from 'next'
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/constants'
import UI from './UI'

const jura = Jura({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    absolute: APP_NAME,
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  themeColor: '#090514',
  generator: 'Next.js',
  keywords: [],
  icons: [
    { rel: 'icon', url: '/favicon.ico', sizes: 'any', type: undefined },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-57x57.png',
      sizes: '57x57',
    },
    { rel: 'apple-touch-icon', url: '/apple-icon-60x60.png', sizes: '60x60' },
    { rel: 'apple-touch-icon', url: '/apple-icon-72x72.png', sizes: '72x72' },
    { rel: 'apple-touch-icon', url: '/apple-icon-76x76.png', sizes: '76x76' },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-114x114.png',
      sizes: '114x114',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-120x120.png',
      sizes: '120x120',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-144x144.png',
      sizes: '144x144',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-152x152.png',
      sizes: '152x152',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon-180x180.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      url: '/android-icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
  ],

  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',

  openGraph: {
    type: 'website',
    url: APP_URL,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: '',
      },
    ],
  },

  twitter: {
    title: APP_NAME,
    site: APP_URL,
    images: '',
    creator: '@lumenlimitless',
    description: APP_DESCRIPTION,
    card: 'summary_large_image',
  },

  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: APP_NAME,
    capable: true,
  },

  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',

  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#090514',
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-tap-highlight': 'no',
  },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="m-0 box-border touch-manipulation scroll-smooth bg-purple-900 p-0 text-primary antialiased"
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>

      <body className={`flex min-h-screen flex-col ${jura.className}`}>
        <a href="#main" className="sr-only" aria-label="skip">
          skip to main content
        </a>
        <AppProviders>
          <UI />
          <header className="z-20 border-b border-purple-500">
            <Nav />
          </header>
          <main className="flex flex-grow flex-col"> {children}</main>
          <footer className="border-t border-purple-500">
            <Footer />
          </footer>

          <ReactQueryDevtools />
        </AppProviders>
      </body>
    </html>
  )
}
