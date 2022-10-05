import React from 'react'
import Nav from './Nav'

export default function Header() {
  return (
    <>
      <header
        className={
          'fixed z-20 w-full border-b-2 border-dark-700/30 bg-dark-1000/60 backdrop-blur-lg'
        }
      >
        <Nav />
      </header>
    </>
  )
}
