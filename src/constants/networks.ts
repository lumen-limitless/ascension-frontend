import { ChainId } from '@usedapp/core'
import { StaticImageData } from 'next/image'
import ethereum from '../../public/images/networks/mainnet-network.jpg'
import arbitrum from '../../public/images/networks/arbitrum-network.jpg'
import fantom from '../../public/images/networks/fantom-network.jpg'
import polygon from '../../public/images/networks/polygon-network.jpg'
import xdai from '../../public/images/networks/xdai-network.jpg'
import bsc from '../../public/images/networks/bsc-network.jpg'
import avax from '../../public/images/networks/avalanche-network.jpg'
import harmony from '../../public/images/networks/harmonyone-network.jpg'

export const RPC: { [chainId in ChainId]?: string } = {
  [ChainId.Hardhat]: 'http://localhost:8545',
  [ChainId.ArbitrumRinkeby]: 'https://rinkeby.arbitrum.io/rpc',
  [ChainId.Arbitrum]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.Mainnet]: 'https://rpc.ankr.com/eth',
  [ChainId.Rinkeby]: 'https://eth-rinkeby.alchemyapi.io/v2/iF972RTEF1QUpvKqswWivu4DmvUVYNSr',
  [ChainId.Fantom]: 'https://rpcapi.fantom.network',
  [ChainId.Polygon]: 'https://rpc-mainnet.matic.network',
  [ChainId.xDai]: 'https://rpc.xdaichain.com',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSCTestnet]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
  [ChainId.Avalanche]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.Harmony]: 'https://api.harmony.one',
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
  [ChainId.xDai]: 'XDAI',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSCTestnet]: 'BSCtest',
  [ChainId.Avalanche]: 'Avalanche',
  [ChainId.Harmony]: 'Harmony',
}

export const CHAIN_IMG: { [chainId in ChainId]?: StaticImageData } = {
  [ChainId.Hardhat]: ethereum,
  [ChainId.ArbitrumRinkeby]: arbitrum,
  [ChainId.Arbitrum]: arbitrum,
  [ChainId.Mainnet]: ethereum,
  [ChainId.Ropsten]: ethereum,
  [ChainId.Rinkeby]: ethereum,
  [ChainId.Goerli]: ethereum,
  [ChainId.Kovan]: ethereum,
  [ChainId.Fantom]: fantom,
  [ChainId.Polygon]: polygon,
  [ChainId.xDai]: xdai,
  [ChainId.BSC]: bsc,
  [ChainId.BSCTestnet]: bsc,
  [ChainId.Avalanche]: avax,
  [ChainId.Harmony]: harmony,
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
  [ChainId.xDai]: 'XDAI',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSCTestnet]: 'BSC',
  [ChainId.Avalanche]: 'AVAX',
  [ChainId.Harmony]: 'HARM',
}
