import ascension from '../json/ascension.json'
export const APP_NAME = 'Ascension Protocol'
export const APP_DESCRIPTION =
  'Ascension Protocol is a Decentralized Autonomous Organization(DAO) dedicated to providing DeFi tools and opportunities for its constituents.'

export * from './addresses'
export * from './networks'
export * from './dex'
export * from './scan'

export const ASCENSION: {
  [key: string]: { address: string; abi: any }
} = {
  AscensionToken: {
    address: ascension.contracts.AscensionToken.address,
    abi: ascension.contracts.AscensionToken.abi,
  },
  AscensionStakedToken: {
    address: ascension.contracts.AscensionStakedToken.address,
    abi: ascension.contracts.AscensionStakedToken.abi,
  },
  AscensionStaking: {
    address: ascension.contracts.AscensionStaking.address,
    abi: ascension.contracts.AscensionStaking.abi,
  },
}
