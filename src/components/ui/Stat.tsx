import React from 'react'
import Skeleton from './Skeleton'
import { formatBalance, formatPercent } from '../../functions'
import { BigNumberish } from 'ethers'
import Typography from './Typography'
import { commify } from 'ethers/lib/utils'

type Stat = {
  name?: string
  stat?: BigNumberish
  before?: React.ReactNode
  after?: React.ReactNode
  isBalance?: boolean
  isPercent?: boolean
}
export interface StatProps {
  title?: string
  maxCols?: number
  stats?: Stat[]
}
export default function Stat({ title, stats }: StatProps) {
  return (
    <div>
      <Typography as="h3" className="text-lg font-medium leading-6 ">
        {title}
      </Typography>

      <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 ">
        {stats &&
          stats.map((item, i) => (
            <div
              className="relative h-full flex-1  flex-grow rounded bg-purple-900/60 p-4 shadow-pink-glow ring-2 ring-purple-500/50 backdrop-blur transition-all hover:shadow-pink-glow-hovered "
              key={i}
            >
              <dt className="truncate text-sm font-medium text-secondary">
                {item?.name && item.name}
              </dt>
              <dd className="mt-1 flex items-center text-2xl font-semibold text-primary">
                {item.stat ? (
                  <>
                    {item.before}

                    {item.isBalance
                      ? commify(formatBalance(item.stat))
                      : item.isPercent
                      ? formatPercent(item.stat)
                      : item.stat}

                    {item.after}
                  </>
                ) : (
                  <Skeleton />
                )}
              </dd>
            </div>
          ))}
      </dl>
    </div>
  )
}
