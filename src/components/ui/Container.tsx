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
      className={[
        className,
        'container z-10 mx-auto px-3 md:px-6 lg:px-9 xl:px-12',
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      {children}
    </div>
  )
}
