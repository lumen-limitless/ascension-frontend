import { Arbitrum, Chain, ChainId, Mainnet } from '@usedapp/core'

export const SUPPORTED_CHAINS: Chain[] = [Arbitrum, Mainnet]

export const RPC: { [chainId in ChainId]?: string } = {
  [ChainId.Arbitrum]:
    'https://arb-mainnet.g.alchemy.com/v2/Xpu3xuFHbBEKuScjXwICcPUXBv-JK6Kd',
  [ChainId.Mainnet]:
    'https://eth-mainnet.g.alchemy.com/v2/U_UAKx6kDChbizvp1_WVIWRCcXbZy8nI',
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
  [ChainId.Arbitrum]: 'aETH',
  [ChainId.Optimism]: 'oETH',
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
