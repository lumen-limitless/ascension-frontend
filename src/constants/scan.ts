export const SCAN_INFO: {
  [chainId: number]: { name: string; apiKey: string }
} = {
  [1]: {
    name: 'etherscan.io',
    apiKey: 'G1ES5CA7MZKFTNBX4Z9ND2SZWYVP5AZT76',
  },
  [42161]: {
    name: 'arbiscan.io',
    apiKey: '53GED146Z1HAVXMAGGGKYEDPQRBVZPNUXW',
  },
  [10]: {
    name: 'optimistic.etherscan.io',
    apiKey: '	G2J8CAK1P1NVC5EAR7KHS3N3VGB17GVHJF',
  },
  [56]: {
    name: 'bscscan.com',
    apiKey: 'IK5KGCTDN62CWR784KHE1R5TQ3Y784AJMB',
  },
  [137]: {
    name: 'polygonscan.com',
    apiKey: '5R5WV51PN18DJKJH9BGVVADQY53BM1NJ4K',
  },
}
