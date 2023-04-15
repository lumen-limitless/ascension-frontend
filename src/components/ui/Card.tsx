import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithoutRef,
} from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

interface CardSectionProps {
  children: React.ReactNode
  className?: string
}

const CardBase = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          className,
          'flex flex-col rounded  bg-purple-900 shadow-pink-glow ring-2 ring-purple-500  transition-all hover:shadow-pink-glow-hovered',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    )
  }
)

const Header = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = '' }, ref) => (
    <div
      ref={ref}
      className={[
        'relative mx-3 flex items-center gap-3 rounded-t border-b-2 border-purple-500 py-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
)

const Body = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = '' }, ref) => (
    <div
      ref={ref}
      className={['relative flex-grow p-3 md:p-6 lg:p-9', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
)

const Footer = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = '' }, ref) => (
    <div
      ref={ref}
      className={[
        'relative mx-3 flex items-center gap-3 rounded-b border-t-2 border-purple-500 py-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
)

type CardType = ForwardRefExoticComponent<
  PropsWithoutRef<CardProps> & RefAttributes<HTMLDivElement>
> & {
  Header: typeof Header
  Body: typeof Body
  Footer: typeof Footer
}

const Card = CardBase as CardType
Card.Header = Header
Card.Body = Body
Card.Footer = Footer

Card.displayName = 'Card'
CardBase.displayName = 'CardBase'
Header.displayName = 'Card.Header'
Body.displayName = 'Card.Body'
Footer.displayName = 'Card.Footer'

export default Card
