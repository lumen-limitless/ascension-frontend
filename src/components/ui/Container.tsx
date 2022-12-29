export default function Container({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <div
      className={[className, 'container z-10 mx-auto px-3 md:px-9 lg:px-27']
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      {children}
    </div>
  )
}
