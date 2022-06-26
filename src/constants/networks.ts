import { Arbitrum, Avalanche, BSC, Chain, ChainId, Hardhat, Mainnet, Polygon } from '@usedapp/core'

export const SUPPORTED_CHAINS: Chain[] = [Hardhat, Arbitrum, Mainnet, Polygon, BSC, Avalanche]
export const RPC: { [chainId in ChainId]?: string } = {
  [ChainId.Hardhat]: 'http://localhost:8545',
  [ChainId.Arbitrum]: 'https://arb-mainnet.g.alchemy.com/v2/Xpu3xuFHbBEKuScjXwICcPUXBv-JK6Kd',
  [ChainId.Mainnet]: 'https://eth-mainnet.alchemyapi.io/v2/U_UAKx6kDChbizvp1_WVIWRCcXbZy8nI',
  [ChainId.Polygon]: 'https://polygon-mainnet.g.alchemy.com/v2/pq0GDkTLABUlK6V_xzwuS0lOolO6-PnK',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.Avalanche]: 'https://api.avax.network/ext/bc/C/rpc',
}

export const WS: { [chainId in ChainId]?: string } = {
  [ChainId.Hardhat]: 'ws://localhost:8546',
  [ChainId.Arbitrum]: 'wss://arb-mainnet.g.alchemy.com/v2/Xpu3xuFHbBEKuScjXwICcPUXBv-JK6Kd',
  [ChainId.Mainnet]: 'wss://eth-mainnet.alchemyapi.io/v2/U_UAKx6kDChbizvp1_WVIWRCcXbZy8nI',
  [ChainId.Polygon]: 'wss://polygon-mainnet.g.alchemy.com/v2/pq0GDkTLABUlK6V_xzwuS0lOolO6-PnK',
}

export const CHAIN_NAME: { [chainId in ChainId]?: string } = {
  [ChainId.Hardhat]: 'Hardhat',
  [ChainId.ArbitrumRinkeby]: 'Arbtest',
  [ChainId.Arbitrum]: 'Arbitrum',
  [ChainId.Mainnet]: 'Ethereum',
  [ChainId.Ropsten]: 'Ropsten',
  [ChainId.Rinkeby]: 'Rinkeby',
  [ChainId.Goerli]: 'Gorli',
  [ChainId.Kovan]: 'Kovan',
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
  [ChainId.ArbitrumRinkeby]: 'aETH',
  [ChainId.Arbitrum]: 'aETH',
  [ChainId.Mainnet]: 'ETH',
  [ChainId.Ropsten]: 'rETH',
  [ChainId.Rinkeby]: 'rETH',
  [ChainId.Goerli]: 'rETH',
  [ChainId.Kovan]: 'ETH',
  [ChainId.Fantom]: 'FTM',
  [ChainId.Polygon]: 'MATIC',
  [ChainId.Gnosis]: 'XDAI',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSCTestnet]: 'BSC',
  [ChainId.Avalanche]: 'AVAX',
  [ChainId.Harmony]: 'HARM',
}
