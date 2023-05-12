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
      className={[className, 'z-10 mx-auto max-w-7xl px-5']
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
