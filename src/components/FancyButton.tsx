import clsx from 'clsx'
import Button, { ButtonProps } from './ui/Button'

interface FancyButtonProps extends ButtonProps {
  backgroundClassName?: string
}
export default function FancyButton({
  className,
  backgroundClassName,
  children,
  ...props
}: FancyButtonProps) {
  return (
    <>
      <div className="relative flex">
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-r p-px blur',
            backgroundClassName
          )}
        ></div>
        <Button {...props} className={clsx('z-10', className)}>
          {children}
        </Button>
      </div>
    </>
  )
}
