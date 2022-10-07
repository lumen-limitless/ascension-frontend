import { ChainId } from '@usedapp/core'
import contractsInfo from '../json/contractsInfo.json'
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
    address: contractsInfo.contracts.AscensionToken.address,
    abi: contractsInfo.contracts.AscensionToken.abi,
  },
  AscensionStakedToken: {
    address: contractsInfo.contracts.AscensionStakedToken.address,
    abi: contractsInfo.contracts.AscensionStakedToken.abi,
  },
  AscensionStaking: {
    address: contractsInfo.contracts.AscensionStaking.address,
    abi: contractsInfo.contracts.AscensionStaking.abi,
  },
}

export const HOME_CHAINID: ChainId = parseInt(contractsInfo.chainId)
