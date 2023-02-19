import { ReactNode } from 'react'
import Footer from '../components/Footer'

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main
        className=" relative flex h-full w-full flex-grow flex-col overflow-clip"
        id="main"
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
