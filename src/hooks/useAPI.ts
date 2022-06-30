import { ChainId } from '@usedapp/core'
import _, { filter } from 'lodash'
import { useMemo } from 'react'
import useSWR from 'swr'
import { CHAIN_SYMBOL, SCAN_INFO } from '../constants'
import { isAddress } from '../functions'
import { ContractEvent, ContractFunction } from '../types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useEthUsdPrice = () => {
  const { data, error } = useSWR(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=VN4KZ196ME3XE9WB1WZ25E8HCBKE3B2GZM`
  )

  return {
    price: data ? parseFloat(data.result.ethusd) : undefined,
    error,
  }
}
export const useNativeUsdPrice = (chainId: ChainId) => {
  const { data, error } = useSWR(
    `https://api.${SCAN_INFO[chainId]?.name}.io/api?module=stats&action=${CHAIN_SYMBOL[
      chainId
    ]?.toLowerCase()}price&apikey=${SCAN_INFO[chainId]?.apiKey}`
  )

  if (error) return null
  return data ? parseFloat(data.result[`${CHAIN_SYMBOL[chainId]?.toLowerCase()}usd`]) : null
}
