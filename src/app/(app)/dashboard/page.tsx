import { Alchemy, Network } from 'alchemy-sdk'
import DashboardPage from './dashboard-page'
import { Metadata } from 'next'
import { TokenData } from '@/types'
import { ASCENSION_TREASURY_ADDRESS } from '@/constants'
import { getAddress } from 'viem'
import { ascensionTokenAddress } from '@/wagmi/generated'
import { StakingSnapshotDocument } from '@/gql/graphql'
import request from 'graphql-request'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const ALCHEMY_API_KEY: { [chainId: number]: string } = {
  1: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET || '',
  42161: process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB || '',
}

const NETWORK_BY_CHAINID: { [chainId: number]: Network } = {
  1: Network.ETH_MAINNET,
  42161: Network.ARB_MAINNET,
}

const COINGECKO_PLATFORM_BY_CHAINID: { [chainId: number]: string } = {
  1: 'ethereum',
  42161: 'arbitrum-one',
}
const FILTERED_TOKENS = [
  getAddress('0xed12AE3Af6b21Be01788Ec84C6BD213d31364988'),
]

async function getTokenData(
  address: string,
  chainId: number
): Promise<TokenData[]> {
  const alchemy = new Alchemy({
    apiKey: ALCHEMY_API_KEY[chainId],
    network: NETWORK_BY_CHAINID[chainId],
  })

  const d: TokenData[] = []
  const balances = await alchemy.core.getTokenBalances(address)
  const prices = await fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/${
      COINGECKO_PLATFORM_BY_CHAINID[chainId]
    }?contract_addresses=${
      balances.tokenBalances[0].contractAddress
    }%2C${balances.tokenBalances
      .map((bal) => bal.contractAddress)
      .join('%2C')}&vs_currencies=usd`
  ).then((res) => res.json())

  for (const balance of balances.tokenBalances) {
    if (balance.error) continue
    const metadata = await alchemy.core.getTokenMetadata(
      balance.contractAddress
    )

    d.push({
      contractAddress: balance.contractAddress,
      tokenBalance: balance.tokenBalance as string,
      priceUSD: prices[balance.contractAddress]?.usd || 0,
      owner: address,
      chainId: chainId,
      tokenMetadata: metadata,
    })
  }

  return d.filter(
    (d) => !FILTERED_TOKENS.includes(getAddress(d.contractAddress))
  )
}

async function getNFTData(chainId: number) {
  const alchemy = new Alchemy({
    apiKey: ALCHEMY_API_KEY[chainId],
    network: NETWORK_BY_CHAINID[chainId],
  })

  const d = await alchemy.nft.getNftsForOwner(
    ASCENSION_TREASURY_ADDRESS[chainId]
  )

  return { nfts: d, chainId, owner: ASCENSION_TREASURY_ADDRESS[chainId] }
}
async function getPriceData() {
  const res = await fetch(
    `https://coins.llama.fi/chart/arbitrum:${ascensionTokenAddress}?start=${1638234087}&span=${1000}&period=1d`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  )

  if (!res.ok) {
    return []
  }

  return res.json()
}

// async function getStakingData() {
//   const { stakingSnapshots } = await request(
//     'https://api.thegraph.com/subgraphs/name/lumen-limitless/ascension-subgraph',
//     StakingSnapshotDocument
//   )

//   return stakingSnapshots
// }

export default async function Page() {
  const tokenDataMainnet = getTokenData(ASCENSION_TREASURY_ADDRESS[1], 1)
  const tokenDataArbitrum = getTokenData(
    ASCENSION_TREASURY_ADDRESS[42161],
    42161
  )

  const nftDataMainnet = getNFTData(1)
  const nftDataArbitrum = getNFTData(42161)

  const priceData = getPriceData()

  // const stakingData = getStakingData()

  const props = await Promise.all([
    tokenDataMainnet,
    tokenDataArbitrum,
    nftDataMainnet,
    nftDataArbitrum,
    priceData,
    // stakingData,
  ])

  return (
    <DashboardPage
      tokens={[...props[0], ...props[1]]}
      nfts={[props[2], props[3]]}
      prices={props[4]}
      // stakingSnapshots={props[5]}
    />
  )
}
