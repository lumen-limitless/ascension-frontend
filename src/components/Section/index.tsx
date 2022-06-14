import { DetailedHTMLProps, HTMLProps } from 'react'
import { classNames } from '../../functions'

interface SectionProps extends DetailedHTMLProps<HTMLProps<HTMLElement>, HTMLElement> {
  fullscreen?: boolean
}

const Section: React.FC<SectionProps> = ({ children, className, fullscreen, ...rest }) => {
  return (
    <section
      className={classNames(
        'relative grid h-full w-full flex-col place-items-center',
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
