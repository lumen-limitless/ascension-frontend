import { Arbitrum, ChainId, Mainnet } from '@usedapp/core'

const SUPPORTED_CHAINS_DEV = [Arbitrum, Mainnet]
const SUPPORTED_CHAINS_PROD = [Arbitrum, Mainnet]
export const SUPPORTED_CHAINS =
  process.env.NODE_ENV === 'development'
    ? SUPPORTED_CHAINS_DEV
    : SUPPORTED_CHAINS_PROD

export const RPC: { [chainId in ChainId]?: string } = {
  [ChainId.Arbitrum]: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB}`,
  [ChainId.Mainnet]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET}`,
}

export const CHAIN_NAME: { [chainId in ChainId]?: string } = {
  [ChainId.Hardhat]: 'Hardhat',
  [ChainId.Arbitrum]: 'Arbitrum',
  [ChainId.Mainnet]: 'Ethereum',
  [ChainId.Goerli]: 'Goerli',
  [ChainId.Fantom]: 'Fantom',
  [ChainId.Polygon]: 'Polygon',
  [ChainId.Gnosis]: 'Gnosis',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSCTestnet]: 'BSCtest',
  [ChainId.Avalanche]: 'Avalanche',
  [ChainId.Harmony]: 'Harmony',
}

export const CHAIN_SYMBOL: { [chainId in ChainId]?: string } = {
  [ChainId.Hardhat]: 'ETH',
  [ChainId.Arbitrum]: 'ETH',
  [ChainId.Optimism]: 'ETH',
  [ChainId.Mainnet]: 'ETH',
  [ChainId.Goerli]: 'ETH',
  [ChainId.Fantom]: 'FTM',
  [ChainId.Polygon]: 'MATIC',
  [ChainId.Gnosis]: 'xDAI',
  [ChainId.BSC]: 'BNB',
  [ChainId.BSCTestnet]: 'BNB',
  [ChainId.Avalanche]: 'AVAX',
  [ChainId.Harmony]: 'HARM',
}
