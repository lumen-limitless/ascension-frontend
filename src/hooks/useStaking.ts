import { useMemo } from 'react'
import { ASCENSION, HOME_CHAINID } from '../constants'
import { useCalls, useEthers } from '@usedapp/core'
import { parseBalance } from '../functions'
import { useContract } from './useContract'

export function useStaking() {
  const { account, chainId } = useEthers()
  const contract: any = useContract(
    ASCENSION.AscensionStaking.address,
    ASCENSION.AscensionStaking.abi,
    HOME_CHAINID
  )
  const [balanceOf, totalStaked, rewardRate, periodFinish, earned, paused] = useCalls(
    chainId === HOME_CHAINID && account
      ? [
          {
            contract: contract,
            method: 'balanceOf',
            args: [account],
          },
          {
            contract: contract,
            method: 'totalStaked',
            args: [],
          },
          {
            contract: contract,
            method: 'rewardRate',
            args: [],
          },
          {
            contract: contract,
            method: 'periodFinish',
            args: [],
          },
          {
            contract: contract,
            method: 'earned',
            args: [account],
          },
          {
            contract: contract,
            method: 'paused',
            args: [],
          },
        ]
      : []
  )

  const rewardsEndAt = useMemo(() => {
    if (!periodFinish || periodFinish?.error) return null
    const timestamp = parseInt(periodFinish.value[0])
    return new Date(timestamp * 1000).toLocaleDateString()
  }, [periodFinish])

  console.log(rewardRate)
  const apy = useMemo(() => {
    if (!rewardRate || rewardRate?.error) return null
    if (!totalStaked || totalStaked?.error) return null
    const r = parseBalance(rewardRate.value[0])
    const t = parseBalance(totalStaked.value[0])
    return ((r * 31557600) / t) * 100
  }, [rewardRate, totalStaked])

  return {
    totalStaked: totalStaked && !totalStaked.error ? totalStaked.value[0] : null,
    balanceOf: balanceOf && !balanceOf.error ? balanceOf.value[0] : null,
    earned: earned && !earned.error ? earned.value[0] : null,
    paused: paused && !paused.error ? paused.value[0] : null,
    rewardsEndAt,
    apy,
  }
}
