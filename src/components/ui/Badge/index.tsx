import { FC } from 'react'

export interface BadgeProps {
  text?: string
}
const Badge: FC<BadgeProps> = ({ text }) => {
  return (
    <span className="ml-3 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium leading-5 text-indigo-800">
      {text}
    </span>
  )
}

export default Badge
