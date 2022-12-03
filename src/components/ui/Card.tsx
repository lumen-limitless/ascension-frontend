import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div
      className={[
        className,
        ' flex-1 flex-grow rounded bg-purple-900/60 shadow-pink-glow ring-2 ring-purple-500/30 backdrop-blur transition-all hover:shadow-pink-glow-hovered',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

const Header = ({ children }) => (
  <div className="relative rounded-t bg-purple-500/30 p-1">{children}</div>
)
Card.Header = Header

const Body = ({ children }) => (
  <div className="relative p-3 sm:p-9">{children}</div>
)
Card.Body = Body

const Footer = (children) => <div className="relative">{children}</div>
Card.Footer = Footer
