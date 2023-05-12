import '../globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import AppProviders from './AppProviders'
import Nav from '@/components/Nav'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Footer from '@/components/Footer'
import { Jura } from 'next/font/google'
import UI from './UI'
import NetworkStats from './NetworkStats'
import Analytics from '../Analytics'
import { defaultMetadata } from '../DefaultMetadata'
import Banner from '@/components/Banner'

const jura = Jura({
  subsets: ['latin'],
})

export const metadata = defaultMetadata

export default function RootLayout({
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
        <AppProviders>
          <UI />
          <header className="z-20 border-b border-purple-500">
            <Banner>TEST</Banner>
            <Nav />
          </header>
          <main className="flex flex-grow flex-col"> {children}</main>
          <footer className="border-t border-purple-500">
            <Footer />
            <NetworkStats />
          </footer>
          <ReactQueryDevtools />
        </AppProviders>
      </body>
      <Analytics />
    </html>
  )
}
