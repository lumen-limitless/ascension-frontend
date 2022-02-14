import { useContractCalls, useTokenBalance } from '@usedapp/core'
import { BigNumber, ethers } from 'ethers'
import { ASCENSION } from '../constants'

export function useASCENDBalance(address: string) {
  return useTokenBalance(ASCENSION.AscensionToken.address, address) ?? ethers.constants.Zero
}

export function useStakedASCENDBalance(address: string) {
  return useTokenBalance(ASCENSION.AscensionStakedToken.address, address) ?? ethers.constants.Zero
}

export function useASCENDVotes(address: string) {
  return useContractCalls([]) ?? []
}
