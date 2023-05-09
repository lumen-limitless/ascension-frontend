const SIZE = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  none: '',
}

const VARIANT = {
  none: '',
  blue: 'bg-blue-500 hover:bg-blue-600',
  green: 'bg-green-500 hover:bg-green-600',
  red: 'bg-red-500 hover:bg-red-600',
  yellow: 'bg-yellow-500 hover:bg-yellow-600',
  pink: 'bg-pink-500 hover:bg-pink-600',
  gray: 'bg-gray-800 hover:bg-gray-900',
  gradient:
    'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600',
  telegram: 'bg-[#2AABEE] hover:bg-[#2AABEE] ',
  discord: 'bg-[#5865F2] hover:bg-[#5865F2] ',
}

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  > {
  children?: React.ReactNode
  className?: string
  variant?: keyof typeof VARIANT
  size?: keyof typeof SIZE
  full?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'none',
  size = 'md',
  full = false,
  ...props
}) => {
  return (
    <button
      className={[
        VARIANT[variant],
        SIZE[size],
        full && 'w-full',
        'inline-flex items-center justify-center gap-1 rounded text-white transition duration-200 ease-in-out',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
