import '../globals.css'
import { Jura } from 'next/font/google'
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/constants'
import { Metadata } from 'next'
import HomeProviders from './HomeProviders'
import Footer from '@/components/Footer'

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

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        <HomeProviders>
          <main id="main" className="flex flex-grow flex-col">
            {children}
          </main>

          <footer>
            <Footer />
          </footer>
        </HomeProviders>
      </body>
    </html>
  )
}
