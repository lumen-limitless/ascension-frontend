import { useMemo } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'

const ALCHEMY_API_KEY: { [chainId: number]: string } = {
  1: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET || '',
  42161: process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB || '',
}
const NETWORK_BY_CHAINID: { [chainId: number]: Network } = {
  1: Network.ETH_MAINNET,
  42161: Network.ARB_MAINNET,
}
/**
 * Returns an instance of the Alchemy SDK for the specified chain.
 * @param chainId The chain id for which the user wants an Alchemy SDK instance
 */
export const useAlchemySDK = (chainId: number) => {
  return useMemo(() => {
    return new Alchemy({
      apiKey: ALCHEMY_API_KEY[chainId],
      network: NETWORK_BY_CHAINID[chainId],
    })
  }, [chainId])
}
