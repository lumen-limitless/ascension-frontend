function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

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
      className={cn(className, 'container z-10 mx-auto px-3 md:px-6 lg:px-9')}
      id={id}
    >
      {children}
    </div>
  )
}
