import '../globals.css'
import { Jura } from 'next/font/google'
import HomeProviders from './HomeProviders'
import Footer from '@/components/Footer'
import Analytics from '../Analytics'
import { defaultMetadata } from '../DefaultMetadata'

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
        <HomeProviders>
          <main id="main">{children}</main>
          <footer id="footer">
            <Footer />
          </footer>
        </HomeProviders>
      </body>
      <Analytics />
    </html>
  )
}
