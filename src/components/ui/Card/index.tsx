import React from 'react'
import cn from 'clsx'
function Header({ className, children }) {
  return (
    <div className={cn('flex items-center rounded-t px-4 py-4 sm:px-8 sm:py-6', className)}>
      {children}
    </div>
  )
}

type CardProps = {
  header?: React.ReactChild
  footer?: React.ReactChild
  backgroundImage?: string
  title?: string
  description?: string
} & React.HTMLAttributes<HTMLDivElement>

function Card({
  header = undefined,
  footer = undefined,
  backgroundImage = '',
  title = '',
  description = '',
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        className,
        'relative flex-1 flex-grow border border-dark-900  bg-dark-1000/40 shadow-pink-glow backdrop-blur-md transition-all hover:shadow-pink-glow-hovered'
      )}
      style={{
        borderRadius: '10px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center bottom',
      }}
    >
      {header && <>{header}</>}

      <div className="h-full px-2 py-4 sm:p-8">
        {title && <div className="pb-3 text-lg font-medium leading-6 text-primary">{title}</div>}
        {description && <div className="text-base text-secondary">{description}</div>}
        {children}
      </div>

      {footer && <>{footer}</>}
    </div>
  )
}

Card.Header = Header

export default Card
