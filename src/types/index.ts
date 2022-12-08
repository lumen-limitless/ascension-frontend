import { ChainId } from '@usedapp/core'

export type AddressMap = { [chainId: number]: string }

export type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  chainId: ChainId
}

export type ContractEventInput = {
  indexed: boolean
  name: string
  type: string
}
export type ContractFunctionInput = {
  name: string
  type: string
}
export type ContractEvent = {
  anonymous: boolean
  inputs: ContractEventInput[]
  name: string
  type: 'event'
}

export type ContractFunction = {
  constant: boolean
  inputs?: ContractFunctionInput[]
  name: string
  outputs?: any[]
  payable: boolean
  stateMutability: 'view' | 'nonpayable' | 'payable'
  type: 'function'
}
