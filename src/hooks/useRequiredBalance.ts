import { useMemo } from 'react'
import { useAscensionTokenSubgraph } from './useSubgraph'

export const useRequiredBalance = (account: string, amountRequired: number) => {
  const tokenData = useAscensionTokenSubgraph(account)

  const pass = useMemo(() => {
    if (!tokenData) return null
    return tokenData.totalBalance >= amountRequired
  }, [tokenData, amountRequired])

  return pass
}
