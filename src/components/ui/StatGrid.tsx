import { ReactNode } from 'react'

export default function StatGrid({
  stats,
}: {
  stats: {
    name?: string
    stat?: ReactNode
  }[]
}) {
  return (
    <div>
      <dl className=" grid grid-cols-1 gap-3  sm:grid-cols-3 ">
        {stats &&
          stats.map((item, i) => (
            <div
              className="relative h-full flex-1  flex-grow rounded bg-purple-900 p-4 shadow-pink-glow ring-2 ring-purple-500 "
              key={i}
            >
              <dt className=" truncate text-sm font-medium text-secondary">
                {item.name || ''}
              </dt>
              <dd className=" mt-1 flex max-w-[66%] items-center text-2xl font-semibold text-primary">
                <span>{item.stat}</span>
              </dd>
            </div>
          ))}
      </dl>
    </div>
  )
}
