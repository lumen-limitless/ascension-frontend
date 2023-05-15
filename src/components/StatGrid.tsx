import { ReactNode } from 'react'
import { Skeleton } from './ui/skeleton'

export default function StatGrid({
  stats,
}: {
  stats: {
    name: string
    stat?: ReactNode
  }[]
}) {
  return (
    <div>
      <dl className=" grid grid-cols-1 gap-3  sm:grid-cols-3 ">
        {stats?.map((item, i) => (
          <div
            className="shadow-pink-glow relative h-full  flex-1 flex-grow rounded border border-border bg-background p-4"
            key={i}
          >
            <dt className="truncate text-sm font-medium text-secondary-foreground">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold">
              <span>{item?.stat || <Skeleton className="h-6 w-24" />}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
