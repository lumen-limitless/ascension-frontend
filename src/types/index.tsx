import { ChainId } from '@usedapp/core'

export type AddressMap = { [chainId: number]: string }

export type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  chainId: ChainId
}
