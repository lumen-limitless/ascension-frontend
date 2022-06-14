const COLORS = {
  red: 'bg-red',
}

export default function Badge({ text }: { text: string }) {
  return (
    <span className="ml-3 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium leading-5 text-indigo-800">
      {text}
    </span>
  )
}
