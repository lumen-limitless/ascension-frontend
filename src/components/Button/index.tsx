import React from 'react'
import { classNames } from '../../functions'

const SIZE = {
  xs: 'p-1 text-xs max-w-xs w-full',
  sm: 'p-2 text-sm max-w-sm w-full',
  default: 'p-3 text-base max-w-md w-full',
  lg: 'p-6 text-base w-full max-w-lg',
  none: 'p-1 text-base',
}

const FILLED = {
  default: 'rounded text-high-emphesis bg-opacity-90 hover:bg-opacity-100',
  gray: 'bg-gray-500 rounded text-high-emphesis bg-opacity-90 hover:bg-opacity-100',
  red: 'bg-red  rounded text-high-emphesis bg-opacity-90 hover:bg-opacity-100',
  blue: 'bg-blue  rounded text-high-emphesis bg-opacity-90 hover:bg-opacity-100',
  green: 'bg-green rounded text-high-emphesis bg-opacity-90 hover:bg-opacity-100',
  gradient:
    'bg-gradient-to-r from-ascend-purple via-ascend-magenta to-ascend-orange text-high-emphesis opacity-90 hover:opacity-100',
}

const OUTLINED = {
  default: 'bg-opacity-20 hover:bg-opacity-40',
  red: 'bg-red bg-opacity-20 rounded text-red hover:bg-opacity-40',
  blue: 'bg-blue bg-opacity-20 rounded text-blue  hover:bg-opacity-40',
  gray: 'bg-dark-700  bg-opacity-20  outline-gray rounded hover:bg-opacity-40',
  green: 'bg-green bg-opacity-20 rounded text-green hover:bg-opacity-40',
}

const EMPTY = {
  default: 'bg-transparent ',
}

const VARIANT = {
  outlined: OUTLINED,
  filled: FILLED,
  empty: EMPTY,
}

export type ButtonColor = 'blue' | 'pink' | 'gray' | 'gradient' | 'default' | 'red' | 'green' | 'yellow'

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'default' | 'none'

export type ButtonVariant = 'outlined' | 'filled' | 'empty' | 'link'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor
  size?: ButtonSize
  variant?: ButtonVariant
  ref?: React.Ref<HTMLButtonElement>
}

export default function Button({
  children,
  className = undefined,
  color = 'default',
  size = 'default',
  variant = 'filled',
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      className={classNames(
        VARIANT[variant][color],
        variant !== 'empty' && SIZE[size],
        'inline-flex flex-grow items-center justify-center gap-1 rounded transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-opacity-20',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
