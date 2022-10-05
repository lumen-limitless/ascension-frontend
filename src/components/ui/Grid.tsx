function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const GAP = {
  none: '',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
}

export default function Grid({
  gap = 'none',
  children,
  className = '',
  ...props
}: Props) {
  return (
    <div className={cn('grid grid-cols-12', GAP[gap], className)} {...props}>
      {children}
    </div>
  )
}
