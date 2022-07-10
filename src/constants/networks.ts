import {
  Arbitrum,
  Avalanche,
  BSC,
  Chain,
  ChainId,
  Hardhat,
  Mainnet,
  Optimism,
  Polygon,
} from '@usedapp/core'

export const SUPPORTED_CHAINS: Chain[] = [
  Hardhat,
  Arbitrum,
  Optimism,
  Mainnet,
  Polygon,
  BSC,
  Avalanche,
]
export const RPC: { [chainId in ChainId]?: string } = {
  [ChainId.Hardhat]: 'http://localhost:8545',
  [ChainId.Arbitrum]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.Optimism]: 'https://mainnet.optimism.io',
  [ChainId.Mainnet]: 'https://rpc.ankr.com/eth',
  [ChainId.Polygon]: 'https://polygon-rpc.com',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.Avalanche]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.Harmony]: 'https://rpc.ankr.com/harmony',
  [ChainId.Fantom]: 'https://rpc.fantom.network',
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
  [ChainId.Gnosis]: 'xDAI',
  [ChainId.BSC]: 'BNB',
  [ChainId.BSCTestnet]: 'BNB',
  [ChainId.Avalanche]: 'AVAX',
  [ChainId.Harmony]: 'HARM',
}
