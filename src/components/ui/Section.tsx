interface SectionProps
  extends React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement> {
  fullscreen?: boolean
  centered?: boolean
}

export default function Section({
  children,
  className,
  fullscreen,
  centered,
  ...props
}: SectionProps) {
  return (
    <section
      className={[
        'relative flex h-full w-full flex-grow flex-col items-center',
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
