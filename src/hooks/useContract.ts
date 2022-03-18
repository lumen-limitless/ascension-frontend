import { useMemo } from 'react'
import { getContract } from '../functions'
import { Contract } from '@ethersproject/contracts'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ASCENSION, ENS_REGISTRAR_ADDRESS, HOME_CHAINID, RPC } from '../constants'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'

import { ChainId } from '@usedapp/core'

// returns null on errors
export const useContract = (address: string | undefined, ABI: any, chainId: ChainId): Contract | null => {
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

export const useAscensionToken = () => {
  return useContract(ASCENSION.AscensionToken.address, ASCENSION.AscensionToken.abi, HOME_CHAINID)
}
export const useAscensionStakedToken = () => {
  return useContract(ASCENSION.AscensionStakedToken.address, ASCENSION.AscensionStakedToken.abi, HOME_CHAINID)
}
export const useAscensionStaking = () => {
  return useContract(ASCENSION.AscensionStaking.address, ASCENSION.AscensionStaking.abi, HOME_CHAINID)
}

export const useENSRegistrarContract = (): Contract | null => {
  return useContract(ENS_REGISTRAR_ADDRESS[ChainId.Mainnet], ENS_ABI, ChainId.Mainnet)
}

export const useENSResolverContract = (address: string | undefined): Contract | null => {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, ChainId.Mainnet)
}
