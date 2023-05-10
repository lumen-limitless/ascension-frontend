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
      <Analytics />
    </html>
  )
}
