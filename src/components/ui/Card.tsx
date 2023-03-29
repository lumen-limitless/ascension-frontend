import { ReactNode } from 'react'

export default function Card({
  children,
  className = '',
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        className,
        ' flex flex-col rounded  bg-purple-900 shadow-pink-glow ring-2 ring-purple-500/50  transition-all hover:shadow-pink-glow-hovered',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

const Header = ({ children }: { children?: ReactNode }) => (
  <div className="relative mx-3 flex items-center gap-3 rounded-t border-b-2 border-purple-500/50 py-3">
    {children}
  </div>
)
Card.Header = Header

const Body = ({ children }: { children?: ReactNode }) => (
  <div className="relative flex-grow p-3 md:p-6 lg:p-9">{children}</div>
)
Card.Body = Body

const Footer = ({ children }: { children?: ReactNode }) => (
  <div className="relative mx-3 flex items-center gap-3 rounded-b border-t-2 border-purple-500/50 py-3">
    {children}
  </div>
)
Card.Footer = Footer
