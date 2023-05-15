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
      className={[className, 'container px-5'].filter(Boolean).join(' ')}
      id={id}
    >
      {children}
    </div>
  )
}

Container.displayName = 'Container'

export default Container
