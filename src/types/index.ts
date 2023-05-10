import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type AddressMap = Record<number, string>

export interface TokenData {
  contractAddress: string
  tokenBalance: string
  priceUSD: number
  owner: string
  chainId: number
  tokenMetadata: {
    decimals: number | null
    logo: string | null
    name: string | null
    symbol: string | null
  }
}

export type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  chainId: number
  logoURI?: string
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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
