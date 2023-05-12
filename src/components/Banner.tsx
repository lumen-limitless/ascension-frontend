'use client'
import { ReactNode } from 'react'
import { useSessionStorage } from 'react-use'

export default function Banner({ children }: { children?: ReactNode }) {
  const [viewing, setViewing] = useSessionStorage('viewingBanner', true)
  return (
    <>
      {viewing && (
        <div
          className="relative flex h-8 w-full items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600"
          id="banner"
          aria-label="banner"
        >
          {children}
          <button
            onClick={() => setViewing(false)}
            className="absolute right-1 hover:brightness-125"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
