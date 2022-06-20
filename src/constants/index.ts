import { ChainId } from '@usedapp/core'
import contractsInfo from '../json/contractsInfo.json'
import contractsInfoLocal from '../json/contractsInfo.local.json'
export const APP_NAME = 'Ascension Protocol'
export const APP_DESCRIPTION =
  'Ascension Protocol is a Decentralized Autonomous Organization(DAO) dedicated to providing DeFi tools and opportunities for its constituents.'

export * from './addresses'
export * from './networks'
export * from './dex'
export * from './scan'

export const CONTRACTS_INFO =
  process.env.NODE_ENV === 'development' ? contractsInfoLocal : contractsInfo
export const ASCENSION: {
  [key: string]: { address: string; abi: any }
} = {
  AscensionToken: {
    address: CONTRACTS_INFO.contracts.AscensionToken.address,
    abi: CONTRACTS_INFO.contracts.AscensionToken.abi,
  },
  AscensionStakedToken: {
    address: CONTRACTS_INFO.contracts.AscensionStakedToken.address,
    abi: CONTRACTS_INFO.contracts.AscensionStakedToken.abi,
  },
  AscensionStaking: {
    address: CONTRACTS_INFO.contracts.AscensionStaking.address,
    abi: CONTRACTS_INFO.contracts.AscensionStaking.abi,
  },
}

export const HOME_CHAINID: ChainId = parseInt(CONTRACTS_INFO.chainId)
