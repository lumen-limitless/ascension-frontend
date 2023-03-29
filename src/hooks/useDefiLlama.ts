import { CHAIN_NAME } from '../constants/networks'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

/**
 * Get token price data from Defi Llama
 * @param token Token address
 * @param chainId Chain ID
 * @param start Start date
 * @param span Number of days
 */
export const useDefiLlamaPriceChart = (
  token: string,
  chainId: number,
  start: number,
  span?: number
) => {
  return useQuery(
    ['priceData'],

    () =>
      axios
        .get(
          `https://coins.llama.fi/chart/${
            CHAIN_NAME[chainId]
          }:${token}?start=${start}&span=${span ?? 1}&period=1d`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        )
        .then((res) => res.data)
  )
}
