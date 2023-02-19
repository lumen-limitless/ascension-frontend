import { CHAIN_NAME } from '../constants/networks'
import useSWR from 'swr'
import axios from 'axios'

export const useDefiLlamaPriceChart = (
  token: string,
  chainId: number,
  start: number,
  span?: number
) => {
  return useSWR(
    `https://coins.llama.fi/chart/${
      CHAIN_NAME[chainId]
    }:${token}?start=${start}&span=${span ?? 1}&period=1d`,
    (url) =>
      axios
        .get(url, {
          headers: {
            accept: 'application/json',
          },
        })
        .then((res) => res.data)
  )
}
