import { useTokenBalance } from '@usedapp/core'

import { ASCENSION } from '../constants'

export const useASCENDBalance = (address: string) => {
  return useTokenBalance(ASCENSION.AscensionToken.address, address)
}

export const useStakedASCENDBalance = (address: string) => {
  return useTokenBalance(ASCENSION.AscensionStakedToken.address, address)
}
