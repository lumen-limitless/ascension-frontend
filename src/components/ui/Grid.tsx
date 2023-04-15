type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AutoFlow = 'row' | 'column' | 'row-dense' | 'column-dense'
type AutoSize = 'auto' | 'min' | 'max' | 'fr'

interface GridProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  gap?: GapSize
  autoFlow?: AutoFlow
  autoColumns?: AutoSize
  autoRows?: AutoSize
}

const GAP: Record<GapSize, string> = {
  none: '',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
}

const Grid: React.FC<GridProps> = ({
  gap = 'none',
  autoFlow,
  autoColumns,
  autoRows,
  children,
  className = '',
  ...rest
}) => (
  <div
    className={[
      'grid grid-cols-12',
      GAP[gap],
      autoFlow && `grid-auto-flow-autoFlow`,
      autoColumns && `grid-auto-columns-autoColumns`,
      autoRows && `grid-auto-rows-autoRows`,
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </div>
)

Grid.displayName = 'Grid'

export default Grid
