import { useMemo } from 'react'
import { getCreate2Address, keccak256, solidityPack } from 'ethers/lib/utils'
import { DEX_BY_CHAIN } from '../constants'
import { isAddress } from '../functions'
import { ChainId } from '@usedapp/core'

export const useCREATE2PairAddress = (dexName: string, chainId: ChainId, token0: string, token1: string) => {
  const pair = useMemo(() => {
    if (!isAddress(token0) || !isAddress(token1) || !chainId) return null

    return getCreate2Address(
      DEX_BY_CHAIN[chainId][dexName]?.factory,
      keccak256(solidityPack(['address', 'address'], [token0, token1].sort())),
      DEX_BY_CHAIN[chainId][dexName]?.initHash
    )
  }, [token0, token1, dexName, chainId])

  return pair
}
