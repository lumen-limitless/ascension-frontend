import { useMemo } from 'react'
import { parseBalance } from '../functions'
import { useASCENDTokenDataQuery } from './useASCEND'

export default function useRequiredBalance(account: string, amountRequired: number) {
  const tokenData = useASCENDTokenDataQuery(account)

  const pass = useMemo(() => {
    if (!tokenData) return null
    return parseFloat(tokenData.totalBalance) >= amountRequired
  }, [tokenData, amountRequired])

  return pass
}
