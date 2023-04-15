interface SkeletonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  animationDuration?: string
  animationDelay?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '3rem',
  height,
  borderRadius = 'rounded-sm',
  animationDuration,
  animationDelay,
  className = '',
  ...rest
}) => {
  const styles = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    animationDuration,
    animationDelay,
  }

  return (
    <div
      className={[
        'animate-pulse',
        borderRadius,
        'bg-gray-200/30',
        'text-transparent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={styles}
      {...rest}
    >
      .
    </div>
  )
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
