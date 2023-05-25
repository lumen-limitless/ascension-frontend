import '../globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import AppProviders from './AppProviders'
import Nav from '@/components/Nav'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Footer from '@/components/Footer'
import { Jura } from 'next/font/google'
import UI from './UI'
import NetworkStats from './NetworkStats'
import Analytics from '../analytics'
import { defaultMetadata } from '../metadata'

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>

      <body className={`${jura.className}`}>
        <a href="#main" className="sr-only" aria-label="skip">
          skip to main content
        </a>
        <AppProviders>
          <UI />
          <header id="header">
            {/* <Banner>TEST</Banner> */}
            <Nav />
          </header>
          <main id="main"> {children}</main>
          <footer id="footer">
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
