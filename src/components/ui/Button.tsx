import { clsx } from 'clsx'
import { ReactNode } from 'react'

const SIZE = {
  xs: 'p-1 text-xs ',
  sm: 'p-2 text-sm ',
  default: 'p-3 text-base ',
  lg: 'p-5 text-lg ',
  none: '',
}

const COLORS = {
  transparent: 'border border-purple-500/30',
  default: '',
  blue: 'bg-blue-500 shadow-blue ring-blue/30',
  green: 'bg-green-500 shadow-green ring-green/30 ',
  red: 'bg-red-500 shadow-red ring-red/30 ',
  yellow: 'bg-yellow-500 shadow-yellow ring-yellow/30 ',
  pink: 'bg-pink-500 shadow-pink ring-pink/30',
  gray: 'bg-gray-800 shadow-black ring-gray/30',
  gradient: 'bg-gradient-to-r from-pink  to-purple shadow-pink ring-pink/30',
}

export type ButtonColor =
  | 'transparent'
  | 'default'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'pink'
  | 'gray'
  | 'gradient'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  color?: ButtonColor
  size?: 'xs' | 'sm' | 'lg' | 'default' | 'none'
  full?: boolean
  ref?: React.Ref<HTMLButtonElement>
}
export default function Button({
  children,
  className = undefined,
  color = 'default',
  size = 'default',
  full,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        COLORS[color],
        SIZE[size],
        full && 'w-full',
        ' inline-flex items-center justify-center gap-1 rounded text-white  transition focus:outline-none  hover:enabled:brightness-125 hover:enabled:drop-shadow-xl disabled:cursor-not-allowed disabled:bg-opacity-20 disabled:text-opacity-60 ',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
