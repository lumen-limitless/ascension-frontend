import { useMemo } from 'react'
import { useAscensionTokenSubgraph } from './useSubgraph'

export default function useRequiredBalance(account: string, amountRequired: number) {
  const tokenData = useAscensionTokenSubgraph(account)

  const pass = useMemo(() => {
    if (!tokenData) return null
    return parseFloat(tokenData.totalBalance) >= amountRequired
  }, [tokenData, amountRequired])

  return pass
}
