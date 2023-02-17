import React from 'react'
// export const SUPPORTED_CHAINS =
//   process.env.NODE_ENV === 'production'
//     ? SUPPORTED_CHAINS_PROD
//     : SUPPORTED_CHAINS_DEV

// export const RPC: { [chainId in ChainId]?: string } = {
//   [ChainId.Arbitrum]: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB}`,
//   [ChainId.Mainnet]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET}`,
// }

export const CHAIN_NAME: { [chainId: number]: string } = {
  [42161]: 'arbitrum',
  [1]: 'ethereum',
  [5]: 'goerli',
  [137]: 'polygon',
  [56]: 'bsc',
}

// export const CHAIN_SYMBOL: { [chainId in ChainId]?: string } = {
//   [ChainId.Hardhat]: 'ETH',
//   [ChainId.Arbitrum]: 'ETH',
//   [ChainId.Optimism]: 'ETH',
//   [ChainId.Mainnet]: 'ETH',
//   [ChainId.Goerli]: 'ETH',
//   [ChainId.Fantom]: 'FTM',
//   [ChainId.Polygon]: 'MATIC',
//   [ChainId.Gnosis]: 'xDAI',
//   [ChainId.BSC]: 'BNB',
//   [ChainId.BSCTestnet]: 'BNB',
//   [ChainId.Avalanche]: 'AVAX',
//   [ChainId.Harmony]: 'HARM',
// }
