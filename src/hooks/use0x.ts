import axios from 'axios'
import { stringify } from 'querystring'
import useSWR from 'swr'

export const use0xQuote = (params: {
  sellToken: string
  buyToken: string
  sellAmount: string
  takerAddress: string
}) => {
  const { data, error } = useSWR(
    `https://api.0x.org/swap/v1/quote?${stringify(params)}`,
    (url) => axios.get(url).then((res) => res.data)
  )

  if (error) return null
  return data
}
