import React, { FC } from 'react'
import cn from 'clsx'
import { ReactNode } from 'react'

const SIZE = {
  xs: 'p-1 text-xs  w-full max-w-xs',
  sm: 'p-2 text-sm  w-full max-w-xs',
  default: 'p-3 text-base w-full max-w-xs',
  lg: 'p-5 text-lg w-full max-w-sm',
  none: '',
}

const COLORS = {
  transparent: 'border border-dark-900',
  default: '',
  blue: 'bg-blue-500 hover:enabled:shadow-blue/10',
  green: 'bg-green-500 hover:enabled:shadow-green/10',
  red: 'bg-red-500 hover:enabled:shadow-red/10',
  yellow: 'bg-yellow-500 hover:enabled:shadow-yellow/10',
  pink: 'bg-pink-500 hover:enabled:hadow-pink/10',
  gray: 'bg-gray-800 hover:enabled:shadow-black/10',
  gradient: 'bg-gradient-to-r from-pink  to-purple  hover:enabled:shadow-pink/10',
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

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'default' | 'none'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  color?: ButtonColor
  size?: ButtonSize
  ref?: React.Ref<HTMLButtonElement>
}
export default function Button({
  children,
  className = undefined,
  color = 'default',
  size = 'default',

  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        COLORS[color],
        SIZE[size],
        ' inline-flex  items-center justify-center gap-1 rounded text-white shadow-md transition focus:outline-none hover:enabled:brightness-125 disabled:cursor-not-allowed disabled:bg-opacity-20 disabled:text-opacity-60 disabled:shadow-none ',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
