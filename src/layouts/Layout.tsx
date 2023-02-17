import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" aria-label="skip" className="sr-only">
        skip to main content
      </a>

      {children}
    </>
  )
}
