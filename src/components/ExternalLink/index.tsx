import { HTMLProps } from 'react'

interface ExternalLinkProps extends Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> {
  href: string
}

export default function ExternalLink({
  children,
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  className = 'text-gray-400 transition hover:text-white',
  ...rest
}: ExternalLinkProps) {
  return (
    <a href={href} target={target} rel={rel} className={className} {...rest}>
      {children}
    </a>
  )
}
