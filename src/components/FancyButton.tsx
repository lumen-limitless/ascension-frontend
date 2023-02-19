import clsx from 'clsx'
import { ReactNode } from 'react'
import Button from './ui/Button'

export default function FancyButton({
  buttonClassName,
  backgroundClassName,
  children,
}: {
  buttonClassName?: string
  backgroundClassName?: string
  children?: ReactNode
}) {
  return (
    <>
      <div className="relative flex">
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-r p-px blur',
            backgroundClassName
          )}
        ></div>
        <Button color="gray" className={clsx('z-10', buttonClassName)}>
          {children}
        </Button>
      </div>
    </>
  )
}
