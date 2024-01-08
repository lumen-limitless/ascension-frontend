import { commify, formatBalance } from '@/lib'
import { Card } from '@/components/ui/card'
import AscendTokenSVG from 'public/assets/ascendtoken.svg'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function BalanceCard({
  ascendBalance,
  stakedBalance,
}: {
  ascendBalance?: bigint
  stakedBalance?: bigint
}) {
  return (
    <>
      <Card>
        <div className="p-2">
          <div className="flex min-w-max items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
                className=" h-6 w-6 text-yellow"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl text-secondary">Staked</h2>
              <span>
                {stakedBalance ? (
                  commify(formatBalance(stakedBalance, 18, 2) as string)
                ) : (
                  <Skeleton />
                )}
              </span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex min-w-max items-center gap-3 ">
            <AscendTokenSVG className="h-10 w-10" />
            <div>
              <h2 className="text-2xl text-secondary">Balance</h2>
              <span>
                {ascendBalance ? (
                  commify(formatBalance(ascendBalance, 18, 2) as string)
                ) : (
                  <Skeleton className="h-5 w-24" />
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
