import { ReactNode } from 'react'
import { Skeleton } from './ui/skeleton'

export default function StatGrid({
  stats,
}: {
  stats: {
    name: string
    stat?: ReactNode | null
  }[]
}) {
  return (
    <div>
      <dl className=" grid grid-cols-1 gap-3  sm:grid-cols-2">
        {stats?.map((item, i) => (
          <div
            className="relative h-full flex-1 flex-grow rounded border border-border bg-background p-4"
            key={i}
          >
            <dt className="truncate text-sm font-medium text-secondary-foreground">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold">
              {item?.stat ?? <Skeleton className="h-8 w-24" />}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
