function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props
  extends React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement> {
  fullscreen?: boolean
  layout?: 'start' | 'center'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const PADDING = {
  none: '',
  xs: 'py-6',
  sm: 'py-12',
  md: 'py-24',
  lg: 'py-36',
  xl: 'py-48',
}
export default function Section({
  children,
  className,
  fullscreen,
  padding = 'none',
  layout = 'center',
  ...rest
}: Props) {
  return (
    <section
      className={cn(
        layout === 'center' && 'flex flex-col items-center justify-center',
        layout === 'start' && 'flex flex-col items-center justify-start',
        fullscreen && 'min-h-screen',
        PADDING[padding],
        'relative h-full w-full ',
        className
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
