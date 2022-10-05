import { useTokenBalance } from '@usedapp/core'

import { ASCENSION, HOME_CHAINID } from '../constants'

export const useASCENDBalance = (address: string) => {
  return useTokenBalance(ASCENSION.AscensionToken.address, address, {
    chainId: HOME_CHAINID,
  })
}

export const useStakedASCENDBalance = (address: string) => {
  return useTokenBalance(ASCENSION.AscensionStakedToken.address, address, {
    chainId: HOME_CHAINID,
  })
}
