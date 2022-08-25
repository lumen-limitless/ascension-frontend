import { useMemo } from 'react'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import { ASCENSION } from '../constants'
import { ChainId } from '@usedapp/core'
import {
  AscensionStakedToken,
  AscensionStaking,
  AscensionToken,
} from '../typechain'
import { Contract, ContractInterface } from 'ethers'

// returns null on errors
export const useContract = (
  address: string | undefined,
  ABI: ContractInterface | undefined
): Contract | null => {
  return useMemo(() => {
    if (!address || !ABI) return null
    try {
      return new Contract(address, ABI)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI])
}

export const useTokenContract = (
  tokenAddress: string,
  chainId?: ChainId
): Contract | null => {
  return useContract(tokenAddress, IERC20.abi)
}

export const useAscendTokenContract = () => {
  return useContract(
    ASCENSION.AscensionToken.address,
    ASCENSION.AscensionToken.abi
  ) as AscensionToken
}
export const useAscendStakedTokenContract = () => {
  return useContract(
    ASCENSION.AscensionStakedToken.address,
    ASCENSION.AscensionStakedToken.abi
  ) as AscensionStakedToken
}
export const useAscendStakingContract = () => {
  return useContract(
    ASCENSION.AscensionStaking.address,
    ASCENSION.AscensionStaking.abi
  ) as AscensionStaking
}
