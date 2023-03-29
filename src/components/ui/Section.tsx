interface SectionProps
  extends React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement> {
  fullscreen?: boolean
  centered?: boolean
  col?: boolean
}

export default function Section({
  children,
  className,
  fullscreen,
  centered,
  col,
  ...props
}: SectionProps) {
  return (
    <section
      className={[
        'relative flex h-full w-full flex-grow items-center',
        col ? 'flex-col' : 'flex-row',
        fullscreen && 'min-h-screen',
        centered ? ' justify-center' : 'justify-start',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </section>
  )
}
