import { Alchemy, BigNumber, Network } from 'alchemy-sdk'
import DashboardPage from './dashboard-page'
import { Metadata } from 'next'
import { TokenData } from '@/types'
import { ASCENSION_TREASURY_ADDRESS } from '@/constants'
import { formatUnits, getAddress } from 'viem'

export const metadata: Metadata = {
  title: 'Dashboard',
}

// async function getSleep() {
//   // mock async function with sleep to test loading state
//   await new Promise((resolve) => setTimeout(resolve, 1000))
// }

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

export default async function Page() {
  const tokenDataMainnet = getTokenData(ASCENSION_TREASURY_ADDRESS[1], 1)
  const tokenDataArbitrum = getTokenData(
    ASCENSION_TREASURY_ADDRESS[42161],
    42161
  )

  const [mainnetTokenData, arbitrumTokenData] = await Promise.all([
    tokenDataMainnet,
    tokenDataArbitrum,
  ])

  return <DashboardPage tokens={[...mainnetTokenData, ...arbitrumTokenData]} />
}
