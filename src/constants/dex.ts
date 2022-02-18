import { SUSHI_FACTORY_ADDRESS, SUSHI_ROUTER_ADDRESS, UNI_FACTORY_ADDRESS, UNI_ROUTER_ADDRESS } from '.'
import { ChainId } from '@usedapp/core'

export const SUSHI_INIT_HASH = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'
export const UNI_INIT_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export const PCS_INIT_HASH = ''

export const DEX_BY_CHAIN = {
  [ChainId.Mainnet]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.Mainnet],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.Mainnet],
      subgraphUrl: '',
    },
    uniswap: {
      initHash: UNI_INIT_HASH,
      router: UNI_ROUTER_ADDRESS[ChainId.Mainnet],
      factory: UNI_FACTORY_ADDRESS[ChainId.Mainnet],
      subgraphUrl: '',
    },
    uniswapV3: {
      initHash: UNI_INIT_HASH,
      router: UNI_ROUTER_ADDRESS[ChainId.Mainnet],
      factory: UNI_FACTORY_ADDRESS[ChainId.Mainnet],
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/kalinbas/uniswap-v3-mainnet',
    },
  },
  [ChainId.Arbitrum]: {
    sushiswap: {
      initHash: SUSHI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.Arbitrum],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.Arbitrum],
    },
    uniswap: {
      initHash: UNI_INIT_HASH,
      router: SUSHI_ROUTER_ADDRESS[ChainId.Mainnet],
      factory: SUSHI_FACTORY_ADDRESS[ChainId.Mainnet],
    },
  },
}
