import { ChainId } from '@usedapp/core'
import abis from './abis/abis.json'

export const APP_NAME = 'Ascension Protocol'
export const APP_DESCRIPTION =
  'Ascension Protocol is a Decentralized Autonomous Organization(DAO) dedicated to providing DeFi tools and opportunities for its constituents.'

export * from './addresses'
export * from './networks'
export * from './dex'
export * from './scan'

export const HOME_CHAINID: ChainId = parseInt(abis.chainId)
