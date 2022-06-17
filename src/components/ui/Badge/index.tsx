import { FC } from 'react'

type Props = {
  text?: string
}
const Badge: FC<Props> = ({ text }) => {
  return (
    <span className="ml-3 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium leading-5 text-indigo-800">
      {text}
    </span>
  )
}

export default Badge
