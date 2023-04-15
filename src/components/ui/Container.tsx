interface ContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <div
      className={[
        className,
        'container z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24',
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      {children}
    </div>
  )
}

Container.displayName = 'Container'

export default Container
