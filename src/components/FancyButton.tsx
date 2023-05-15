import { cn } from '@/lib/utils'
import { Button, ButtonProps } from './ui/button'

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
          className={cn(
            'absolute inset-0 bg-gradient-to-r p-px blur',
            backgroundClassName
          )}
        ></div>
        <Button {...props} className={cn('z-10', className)}>
          {children}
        </Button>
      </div>
    </>
  )
}
