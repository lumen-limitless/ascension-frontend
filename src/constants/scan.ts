import { ChainId } from '@usedapp/core'

export const SCAN_INFO = {
  [ChainId.Mainnet]: {
    name: 'etherscan.io',
    apiKey: 'G1ES5CA7MZKFTNBX4Z9ND2SZWYVP5AZT76',
  },
  [ChainId.Arbitrum]: {
    name: 'arbiscan.io',
    apiKey: '53GED146Z1HAVXMAGGGKYEDPQRBVZPNUXW',
  },
  [ChainId.Optimism]: {
    name: 'optimistic.etherscan.io',
    apiKey: '	G2J8CAK1P1NVC5EAR7KHS3N3VGB17GVHJF',
  },
  [ChainId.BSC]: {
    name: 'bscscan.com',
    apiKey: 'IK5KGCTDN62CWR784KHE1R5TQ3Y784AJMB',
  },
  [ChainId.Polygon]: {
    name: 'polygonscan.com',
    apiKey: '5R5WV51PN18DJKJH9BGVVADQY53BM1NJ4K',
  },
}
