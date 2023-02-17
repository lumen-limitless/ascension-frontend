import { useBalance } from 'wagmi'
import { ASCENSION } from '../constants'

export const useASCENDBalance = (address: `0x${string}`) => {
  return useBalance({
    address: address,
    token: ASCENSION.AscensionToken.address as `0x${string}`,
    chainId: 42161,
  })
}
export const useStakedASCENDBalance = (address: `0x${string}`) => {
  return useBalance({
    address: address,
    token: ASCENSION.AscensionStakedToken.address as `0x${string}`,
    chainId: 42161,
  })
}
