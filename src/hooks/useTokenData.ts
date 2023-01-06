import { useEffect } from 'react'
import { ChainId } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { useSessionStorage } from 'react-use'
import { useAlchemySDK } from './useAlchemy'

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

const COINGECKO_PLATFORM_BY_CHAIN = {
  1: 'ethereum',
  42161: 'arbitrum-one',
}

export const useTokenData = (address: string, chainId: ChainId) => {
  const [data, setData] = useSessionStorage<TokenData[]>(
    `TokenData_${address}_${chainId}`
  )
  const [lastUpdated, setLastUpdated] = useSessionStorage<number>(
    `TokenDataLastUpdated_${address}_${chainId}`
  )

  const alchemy = useAlchemySDK(chainId)

  useEffect(() => {
    if (lastUpdated > Date.now() - 240000) return
    console.debug('running useTokenData')
    const getData = async () => {
      const d: TokenData[] = []

      const balances = await alchemy.core.getTokenBalances(address)

      for (const balance of balances.tokenBalances) {
        if (balance.error) return
        const metadata = await alchemy.core.getTokenMetadata(
          balance.contractAddress
        )

        d.push({
          contractAddress: balance.contractAddress,
          tokenBalance: parseFloat(
            formatUnits(BigNumber.from(balance.tokenBalance), metadata.decimals)
          ),
          priceUsd: 0,
          owner: address,
          chainId: chainId,
          tokenMetadata: metadata,
        })
      }

      setData(d)
    }

    setLastUpdated(Date.now())
    getData().catch((err) => {
      console.error(err)
      setLastUpdated(0)
    })
  })

  return data
}
