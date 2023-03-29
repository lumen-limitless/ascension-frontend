import { clsx } from 'clsx'
import { ReactNode } from 'react'

const SIZE = {
  xs: 'p-1 text-xs ',
  sm: 'p-2 text-sm ',
  default: 'p-3 text-base ',
  lg: 'p-5 text-lg ',
  none: '',
}

const VARIANT = {
  transparent: 'border border-purple-500',
  default: '',
  blue: 'bg-blue-500  ',
  green: 'bg-green-500  ',
  red: 'bg-red-500  ',
  yellow: 'bg-yellow-500   ',
  pink: 'bg-pink-500  ',
  gray: 'bg-gray-800  ',
  gradient: 'bg-gradient-to-r from-pink  to-purple  ',
  telegram: 'bg-[#2AABEE]',
  discord: 'bg-[#5865F2]',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  variant?: keyof typeof VARIANT
  size?: keyof typeof SIZE
  full?: boolean
  ref?: React.Ref<HTMLButtonElement>
}
export default function Button({
  children,
  className = undefined,
  variant = 'default',
  size = 'default',
  full,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        VARIANT[variant],
        SIZE[size],
        full && 'w-full',
        ' inline-flex items-center justify-center gap-1 rounded text-white  transition focus:outline-none  hover:enabled:brightness-125 hover:enabled:drop-shadow-xl disabled:cursor-not-allowed disabled:bg-opacity-20 disabled:text-opacity-60 ',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
