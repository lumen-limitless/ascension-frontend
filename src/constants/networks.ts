import {
  Arbitrum,
  Chain,
  ChainId,
  Hardhat,
  Mainnet,
  Optimism,
  Polygon,
} from '@usedapp/core'

export const SUPPORTED_CHAINS: Chain[] = [Arbitrum, Optimism, Mainnet, Polygon]

export const RPC: { [chainId in ChainId]?: string } = {
  [ChainId.Arbitrum]:
    'https://arb-mainnet.g.alchemy.com/v2/Xpu3xuFHbBEKuScjXwICcPUXBv-JK6Kd',
  [ChainId.Optimism]:
    'https://opt-mainnet.g.alchemy.com/v2/9YdE0-k34MYuWKV1Ogj6HHeo1gvTa4o5',
  [ChainId.Mainnet]:
    'https://eth-mainnet.g.alchemy.com/v2/U_UAKx6kDChbizvp1_WVIWRCcXbZy8nI',
  [ChainId.Polygon]:
    'https://polygon-mainnet.g.alchemy.com/v2/pq0GDkTLABUlK6V_xzwuS0lOolO6-PnK',
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
