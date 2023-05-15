export const CHAIN_ID = process.env.NODE_ENV === 'production' ? 42161 : 31337

export const CHAIN_NAME: Record<number, string> = {
  [42161]: 'arbitrum',
  [1]: 'ethereum',
  [5]: 'goerli',
  [137]: 'polygon',
  [56]: 'bsc',
}
