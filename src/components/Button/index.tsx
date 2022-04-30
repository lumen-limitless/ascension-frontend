import React from 'react'
import { classNames } from '../../functions'

const SIZE = {
  xs: 'p-1 text-xs max-w-xs w-full',
  sm: 'p-2 text-sm max-w-sm w-full',
  default: 'p-3 text-base max-w-md w-full',
  lg: 'p-6 text-base w-full max-w-lg',
  none: '',
}

const COLORS = {
  default: 'rounded text-high-emphesis shadow-md hover:brightness-125',
  gray: 'bg-dark-800 rounded text-high-emphesis shadow-md hover:brightness-125',
  red: 'bg-red  rounded text-high-emphesis shadow-md  hover:shadow-red/30 hover:brightness-125',
  blue: 'bg-blue  rounded text-high-emphesis  shadow-md  hover:shadow-blue/30 hover:brightness-125',
  green:
    'bg-green rounded text-high-emphesis  shadow-md  hover:shadow-green/30 hover:brightness-125',
  gradient:
    'bg-gradient-to-r from-ascend-purple via-ascend-magenta to-ascend-orange text-high-emphesis shadow-md  hover:shadow-ascend-magenta/30 hover:brightness-125',
}

export type ButtonColor =
  | 'blue'
  | 'pink'
  | 'gray'
  | 'gradient'
  | 'default'
  | 'red'
  | 'green'
  | 'yellow'

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'default' | 'none'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}: ButtonProps): JSX.Element {
  return (
    <button
      className={classNames(
        COLORS[color],
        SIZE[size],
        'inline-flex flex-grow items-center justify-center gap-1 rounded transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-20 disabled:shadow-none disabled:hover:bg-opacity-30',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
