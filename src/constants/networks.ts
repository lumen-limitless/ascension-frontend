import { arbitrum, foundry } from 'wagmi/chains'

export const CHAIN_ID =
  process.env.NODE_ENV === 'production' ? arbitrum.id : foundry.id

export const CHAIN_NAME: { [chainId: number]: string } = {
  [42161]: 'arbitrum',
  [1]: 'ethereum',
  [5]: 'goerli',
  [137]: 'polygon',
  [56]: 'bsc',
}
