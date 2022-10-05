export default function Badge({
  text = 'badge',
}: {
  className?: string
  text: string
}) {
  return (
    <div
      className={
        'ml-3 inline-flex items-center rounded-full bg-zinc-100 px-3 py-0.5  text-xs font-medium leading-5 text-zinc-800'
      }
    >
      {text}
    </div>
  )
}
