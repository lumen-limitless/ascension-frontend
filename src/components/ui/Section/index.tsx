import { DetailedHTMLProps, HTMLProps } from 'react'
import cn from 'clsx'
interface SectionProps extends DetailedHTMLProps<HTMLProps<HTMLElement>, HTMLElement> {
  fullscreen?: boolean
  layout?: 'start' | 'center'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const PADDING = {
  none: '',
  xs: 'p-6',
  sm: 'p-12',
  md: 'p-24',
  lg: 'p-36',
  xl: 'p-48',
}
const Section: React.FC<SectionProps> = ({
  children,
  className,
  fullscreen,
  padding = 'none',
  layout = 'center',
  ...rest
}) => {
  return (
    <section
      className={cn(
        layout === 'center' && 'flex flex-col items-center justify-center',
        layout === 'start' && 'flex flex-col items-center justify-start',
        'relative h-full w-full ',
        fullscreen && 'min-h-screen',
        PADDING[padding],
        className
      )}
      {...rest}
    >
      {children}
    </section>
  )
}

export default Section
