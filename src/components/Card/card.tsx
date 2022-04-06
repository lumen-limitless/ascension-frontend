import React from 'react'
import { classNames } from '../../functions'

function Header({ className, children }) {
  return (
    <div className={classNames('flex items-center rounded-t px-4 py-4 sm:px-8 sm:py-6', className)}>{children}</div>
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
      className={classNames(
        className,
        'relative  bg-dark-900 text-white shadow-pink-glow transition-all hover:shadow-pink-glow-hovered'
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
        {title && <div className="text-lg font-medium leading-6 text-secondary">{title}</div>}
        {description && <div className="text-base text-primary">{description}</div>}
        {children}
      </div>

      {footer && <>{footer}</>}
    </div>
  )
}

Card.Header = Header

export default Card
