import {
  SUSHI_FACTORY_ADDRESS,
  SUSHI_ROUTER_ADDRESS,
  UNI_FACTORYV2_ADDRESS,
  UNI_ROUTERV2_ADDRESS,
} from '.'

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
  [1]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[1],
      factory: SUSHI_FACTORY_ADDRESS[1],
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    },
    uniswapV2: {
      initHash: UNI_INIT_HASH,
      router: UNI_ROUTERV2_ADDRESS[1],
      factory: UNI_FACTORYV2_ADDRESS[1],
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    },
    uniswapV3: {
      initHash: '',
      router: '',
      factory: '',
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/kalinbas/uniswap-v3-mainnet',
    },
  },
  [42161]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[42161],
      factory: SUSHI_FACTORY_ADDRESS[42161],
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange',
    },
  },
  [56]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[56],
      factory: SUSHI_FACTORY_ADDRESS[56],
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/sushiswap/bsc-exchange',
    },
  },
  [137]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[137],
      factory: SUSHI_FACTORY_ADDRESS[137],
      subgraphUrl:
        'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange',
    },
  },
}
