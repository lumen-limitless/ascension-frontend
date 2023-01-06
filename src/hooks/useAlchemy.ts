import { useMemo } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'

const ALCHEMY_API_KEY = {
  1: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET,
  42161: process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB,
}

export const useAlchemySDK = (chainId: number) => {
  return useMemo(() => {
    const NETWORK_BY_CHAINID = {
      1: Network.ETH_MAINNET,
      42161: Network.ARB_MAINNET,
    }
    return new Alchemy({
      apiKey: ALCHEMY_API_KEY[chainId],
      network: NETWORK_BY_CHAINID[chainId],
    })
  }, [chainId])
}
