interface Props {
  className?: string
  text?: string
}

export default function Badge({ className = '', text = 'badge' }: Props) {
  return (
    <div
      className={
        className +
        'ml-3 inline-flex items-center rounded-full bg-indigo-100 px-3  py-0.5 text-xs font-medium leading-5 text-indigo-900 '
      }
    >
      {text}
    </div>
  )
}
