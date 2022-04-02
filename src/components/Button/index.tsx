import React from 'react'
import { classNames } from '../../functions'

const SIZE = {
  xs: 'p-1 text-xs',
  sm: 'p-2 text-sm',
  default: 'p-3 text-base',
  lg: 'p-6 text-base',
  none: 'p-0 text-base',
}

const FILLED = {
  default: 'bg-transparent opacity-80 hover:opacity-100',
  red: 'bg-red bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80',
  blue: 'bg-blue bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80',
  pink: 'bg-gradient-to-r from-pink to-opaque-pink w-full rounded text-high-emphesis opacity-80 hover:opacity-100 disabled:bg-opacity-80',
  gray: 'border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80',
  green: 'bg-green bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80',
  gradient:
    'w-full text-high-emphesis bg-gradient-to-r from-ascend-purple via-ascend-magenta to-ascend-orange opacity-80 hover:opacity-100 disabled:bg-opacity-80',
}

const OUTLINED = {
  default: 'bg-transparent opacity-80 hover:opacity-100',
  red: 'bg-red bg-opacity-20 outline-red rounded text-red hover:bg-opacity-40 disabled:bg-opacity-20',
  blue: 'bg-blue bg-opacity-20 outline-blue rounded text-blue hover:bg-opacity-40 disabled:bg-opacity-20',
  pink: 'bg-pink bg-opacity-20 outline-pink rounded text-pink hover:bg-opacity-40 disabled:bg-opacity-20',
  gray: 'bg-dark-700 bg-opacity-20 outline-gray rounded text-gray hover:bg-opacity-40 disabled:bg-opacity-20',
  green: 'bg-green bg-opacity-20 border border-green rounded text-green hover:bg-opacity-40 disabled:bg-opacity-20',
  gradient:
    'border border-transparent border-gradient-r-blue-pink-dark-900 opacity-80 hover:opacity-100 disabled:bg-opacity-20',
}

const EMPTY = {
  default: ' bg-transparent disabled:opacity-50 disabled:cursor-auto bg-opacity-80 hover:bg-opacity-100',
}

const LINK = {
  default: 'text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap focus:ring-0',
  blue: 'text-blue text-opacity-80 hover:text-opacity-100 focus:text-opacity-100 whitespace-nowrap focus:ring-0',
}

const VARIANT = {
  outlined: OUTLINED,
  filled: FILLED,
  empty: EMPTY,
  link: LINK,
}

export type ButtonColor = 'blue' | 'pink' | 'gradient' | 'gray' | 'default' | 'red' | 'green' | 'yellow'

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
        'flex items-center justify-center rounded focus:outline-none disabled:cursor-not-allowed disabled:opacity-40',
        // 'rounded focus:outline-none focus:ring disabled:opacity-50 disabled:cursor-not-allowed font-medium',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
