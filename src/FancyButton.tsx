import clsx from 'clsx'
import { ReactNode } from 'react'
import Button from './components/ui/Button'

export default function FancyButton({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <>
      <div className="relative flex">
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-r p-px blur',
            className
          )}
        ></div>
        <Button color="gray" className="z-10 w-48">
          {children}
        </Button>
      </div>
    </>
  )
}
