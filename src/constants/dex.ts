import {
  SUSHI_FACTORY_ADDRESS,
  SUSHI_ROUTER_ADDRESS,
  UNI_FACTORYV2_ADDRESS,
  UNI_ROUTERV2_ADDRESS,
} from '.'
import { Avalanche, ChainId } from '@usedapp/core'

export const SUSHI_INIT_HASH =
  '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'
export const UNI_INIT_HASH =
  '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export const PCS_INIT_HASH = ''

export const DEX_BY_CHAIN: {
  [key: number]: {
    [key: string]: {
      initHash: string
      router: string
      factory: string
      subgraphUrl: string
    }
  }
} = {
  [ChainId.Mainnet]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.Mainnet],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.Mainnet],
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    },
    uniswapV2: {
      initHash: UNI_INIT_HASH,
      router: UNI_ROUTERV2_ADDRESS[ChainId.Mainnet],
      factory: UNI_FACTORYV2_ADDRESS[ChainId.Mainnet],
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    },
    uniswapV3: {
      initHash: null,
      router: '',
      factory: '',
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/kalinbas/uniswap-v3-mainnet',
    },
  },
  [ChainId.Arbitrum]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.Arbitrum],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.Arbitrum],
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange',
    },
  },
  [ChainId.BSC]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.BSC],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.BSC],
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/sushiswap/bsc-exchange',
    },
  },
  [ChainId.Polygon]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.Polygon],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.Polygon],
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange',
    },
  },
  [ChainId.Avalanche]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.Avalanche],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.Avalanche],
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/sushiswap/avalanche-exchange',
    },
  },
}
