import { useMemo } from 'react'
import { parseBalance } from '../functions'
import { useASCENDBalance, useStakedASCENDBalance } from './useASCEND'

export const useRequiredBalance = (account: string, amountRequired: number) => {
  const ascendBalance = useASCENDBalance(account)
  const stakedBalance = useStakedASCENDBalance(account)

  const pass = useMemo(() => {
    if (!ascendBalance || !stakedBalance) return null
    return parseBalance(ascendBalance.add(stakedBalance)) >= amountRequired
  }, [ascendBalance, stakedBalance, amountRequired])

  return pass
}
