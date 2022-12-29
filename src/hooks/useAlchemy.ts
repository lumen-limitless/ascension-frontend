import { useEffect, useState } from 'react'
import { ChainId } from '@usedapp/core'
import { Alchemy, Network } from 'alchemy-sdk'
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import axios from 'axios'

const ALCHEMY_API_KEY = {
  1: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET,
  42161: process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB,
}

const NETWORK_BY_CHAINID = {
  1: Network.ETH_MAINNET,
  42161: Network.ARB_MAINNET,
}
const PLATFORM_BY_CHAINID = {
  1: 'ethereum',
  42161: 'arbitrum-one',
}

interface TokenData {
  contractAddress: string
  tokenBalance: number
  priceUsd: number
  owner: string
  chainId: number
  tokenMetadata: {
    decimals: number
    logo: string
    name: string
    symbol: string
  }
}

export const useAlchemyTokenData = (
  accounts: { address: string; chainId: ChainId }[]
) => {
  const [data, setData] = useState<TokenData[]>()
  const [lastUpdated, setLastUpdated] = useState<number>(0)

  useEffect(() => {
    if (lastUpdated > Date.now() - 60000) return
    const getData = async () => {
      const d: TokenData[] = []

      for (const account of accounts) {
        const alchemy = new Alchemy({
          apiKey: ALCHEMY_API_KEY[account.chainId],
          network: NETWORK_BY_CHAINID[account.chainId],
        })

        const balances = await alchemy.core.getTokenBalances(account.address)

        for (const balance of balances.tokenBalances) {
          if (balance.error) return
          const metadata = await alchemy.core.getTokenMetadata(
            balance.contractAddress
          )

          d.push({
            contractAddress: balance.contractAddress,
            tokenBalance: parseFloat(
              formatUnits(
                BigNumber.from(balance.tokenBalance),
                metadata.decimals
              )
            ),
            priceUsd: 0,
            owner: account.address,
            chainId: account.chainId,
            tokenMetadata: metadata,
          })
        }
      }
      setData(d)
    }

    getData()
      .then(() => setLastUpdated(Date.now()))
      .catch((err) => console.error(err))
  })

  return data
}
