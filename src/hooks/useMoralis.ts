import useSWR from 'swr'
import axios from 'axios'

interface MoralisNFTData {
  amount: string
  block_number: string
  block_number_minted: string
  contract_type: 'ERC721' | 'ERC1155' | 'ERC20'
  last_metadata_sync: any
  last_token_uri_sync: any
  metadata: string
  name: string
  owner_of: string
  symbol: string
  token_address: string
  token_hash: string
  token_id: string
  token_uri: string
}
interface MoralisNFTResponse {
  cursor: any
  page: number
  page_size: number
  result: MoralisNFTData[]
  status: string
  total: number
}
export const useMoralisNFT = (address: string) => {
  return useSWR<MoralisNFTResponse>(
    `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`,
    (url) =>
      axios
        .get(url, {
          headers: {
            accept: 'application/json',

            'X-API-KEY': 'gldOOYmLD68TQgkadPZiSEd6eWEYzxCpCR0IywXht8NpJCbVwXjfTYP3mgF2QAHi',

          },
        })
        .then((res) => res.data)
  )
}
