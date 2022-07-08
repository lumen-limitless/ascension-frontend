import { useMemo } from 'react'
import { getContract } from '../functions'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ASCENSION, ENS_REGISTRAR_ADDRESS, HOME_CHAINID, RPC } from '../constants'
import { ChainId, useEthers } from '@usedapp/core'
import { AscensionStakedToken, AscensionStaking, AscensionToken } from '../typechain'
import { Contract } from 'ethers'

// returns null on errors
export const useContract = (
  address: string | undefined,
  ABI: any,
  chainId: ChainId
): Contract | null => {
  return useMemo(() => {
    if (!address || !ABI || !chainId) return null
    try {
      return getContract(address, ABI, new JsonRpcProvider(RPC[chainId]))
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, chainId])
}

export const useTokenContract = (tokenAddress: string, chainId?: ChainId): Contract | null => {
  return useContract(tokenAddress, IERC20.abi, chainId)
}

export const useAscendTokenContract = () => {
  return useContract(
    ASCENSION.AscensionToken.address,
    ASCENSION.AscensionToken.abi,
    HOME_CHAINID
  ) as AscensionToken
}
export const useAscendStakedTokenContract = () => {
  return useContract(
    ASCENSION.AscensionStakedToken.address,
    ASCENSION.AscensionStakedToken.abi,
    HOME_CHAINID
  ) as AscensionStakedToken
}
export const useAscendStakingContract = () => {
  return useContract(
    ASCENSION.AscensionStaking.address,
    ASCENSION.AscensionStaking.abi,
    HOME_CHAINID
  ) as AscensionStaking
}
