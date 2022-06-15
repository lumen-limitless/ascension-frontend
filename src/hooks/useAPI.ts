import { ChainId } from '@usedapp/core'
import { useMemo } from 'react'
import useSWR from 'swr'
import { CHAIN_SYMBOL, SCAN_INFO } from '../constants'

const fetcher = async (url: string) => {
  return await fetch(url).then((r) => r.json())
}

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

export const useVerifiedContractABI = (contract: string, chainId: ChainId): any[] => {
  const { data, error } = useSWR(
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

// export const useOpenseaAssets = (account: string) => {
//   const { data, error } = useSWR(
//     `https://api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&limit=20&include_orders=false`,
//     {
//       method: 'GET',
//       headers: { Accept: 'application/json', 'X-API-KEY': process.env.OPENSEA_API_KEY },
//     }
//   )

//   if (error) return null
//   return data?.assets
// }
