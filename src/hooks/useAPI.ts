import { ChainId } from '@usedapp/core'
import { useMemo } from 'react'
import useSWR from 'swr'
import { CHAIN_SYMBOL, SCAN_INFO } from '../constants'

export default function useAPI(url: string) {
  const { data, error } = useSWR(url, async (url: string) => {
    return await fetch(url).then((r) => r.json())
  })

  return { data, error }
}

export function useCoingeckoAscensionStats() {
  const { data, error } = useAPI('https://api.coingecko.com/api/v3/coins/ascension-protocol?localization=false')

  return {
    price: data ? parseFloat(data.market_data.current_price.usd).toPrecision(2) : undefined,
    marketCap: data ? parseFloat(data.market_data.current_price.usd) * 14400000 : undefined,
    error: error,
  }
}
export function useEthUsdPrice() {
  const { data, error } = useAPI(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=VN4KZ196ME3XE9WB1WZ25E8HCBKE3B2GZM`
  )

  return {
    price: data ? parseFloat(data.result.ethusd) : undefined,
    error,
  }
}
export function useNativeUsdPrice(chainId: ChainId) {
  const { data, error } = useAPI(
    `https://api.${SCAN_INFO[chainId]?.name}.io/api?module=stats&action=${CHAIN_SYMBOL[
      chainId
    ]?.toLowerCase()}price&apikey=${SCAN_INFO[chainId]?.apiKey}`
  )

  if (error) return null
  return data ? parseFloat(data.result[`${CHAIN_SYMBOL[chainId]?.toLowerCase()}usd`]) : null
}

export function useVerifiedContractABI(contract: string, chainId: ChainId): any[] {
  const { data, error } = useAPI(
    `https://api.${SCAN_INFO[chainId]?.name}.io/api?module=contract&action=getabi&address=${contract}&apikey=${SCAN_INFO[chainId]?.apiKey}`
  )

  const contractABI = useMemo(() => {
    if (!data) return null
    try {
      const abi = JSON.parse(data.result)
      return abi
    } catch {
      return []
    }
  }, [data])

  if (error) return null

  return contractABI
}
