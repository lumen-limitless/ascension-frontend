import { useMemo } from 'react'
import { useAscendSubgraph } from './useSubgraph'

export const useRequiredBalance = (account: string, amountRequired: number) => {
  const tokenData = useAscendSubgraph(account)

  const pass = useMemo(() => {
    if (!tokenData) return null
    return tokenData.totalBalance >= amountRequired
  }, [tokenData, amountRequired])

  return pass
}
