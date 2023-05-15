import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { CHAIN_ID } from '@/constants'
import { commify, formatBalance, formatPercent, parseBalance } from '@/utils'
import {
  ascensionTokenAddress,
  useAscensionPolyStakingPoolPoolInfo,
  useAscensionPolyStakingPoolTotalAssets,
} from '@/wagmi/generated'
import StatGrid from '@/components/StatGrid'
import { Skeleton } from '@/components/ui/skeleton'

export default function EarnStats() {
  const { address } = useAccount()
  const { data: totalAssets } = useAscensionPolyStakingPoolTotalAssets({
    watch: true,
    enabled: !!address,
    chainId: CHAIN_ID,
  })

  const { data: poolInfo } = useAscensionPolyStakingPoolPoolInfo({
    args: [ascensionTokenAddress],
    watch: true,
    chainId: CHAIN_ID,
  })

  const apy = useMemo(() => {
    if (!totalAssets) return null
    if (!poolInfo) return null

    //APY = (1 + r / n) ** n - 1
    const t = parseBalance(totalAssets) as number
    const r =
      ((parseBalance(poolInfo.reward) as number) / t) *
      (31557600 / poolInfo.duration)

    const apy = (1 + r / 365) ** 365 - 1
    console.debug({
      r,
      t,
      apy,
    })
    return formatPercent(apy)
  }, [totalAssets, poolInfo])

  return (
    <>
      {' '}
      <StatGrid
        stats={[
          {
            name: 'Total Staked',
            stat: totalAssets ? (
              commify(formatBalance(totalAssets) as string)
            ) : (
              <Skeleton className="h-5 w-24" />
            ),
          },
          {
            name: 'ASCEND APY',
            stat: apy ?? <Skeleton className="h-5 w-24" />,
          },
          {
            name: 'Total Staked',
            stat: totalAssets ? (
              commify(formatBalance(totalAssets) as string)
            ) : (
              <Skeleton className="h-5 w-24" />
            ),
          },
        ]}
      />
    </>
  )
}
