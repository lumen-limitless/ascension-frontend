import { DetailedHTMLProps, HTMLProps } from 'react'
import cn from 'clsx'
interface SectionProps extends DetailedHTMLProps<HTMLProps<HTMLElement>, HTMLElement> {
  fullscreen?: boolean
  layout?: 'start' | 'center' | 'grid'
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  fullscreen,
  layout = 'center',
  ...rest
}) => {
  return (
    <section
      className={cn(
        layout === 'grid' && 'grid grid-cols-12',
        layout === 'center' && 'flex flex-col items-center justify-center',
        layout === 'start' && 'flex flex-col items-center justify-start',
        'relative h-full w-full ',
        fullscreen && 'min-h-screen',
        className
      )}
      {...rest}
    >
      {children}
    </section>
  )
}

export default Section
