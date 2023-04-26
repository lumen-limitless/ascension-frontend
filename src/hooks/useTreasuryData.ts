import { ethers } from 'ethers'
import { useMemo } from 'react'
import { getAddress } from 'viem'
import { mainnet, useBalance } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { ASCENSION_TREASURY_ADDRESS, WETH9_ADDRESS } from '@/constants'
import { useNFTData } from './useNFTData'
import { TokenData, useTokenData } from './useTokenData'

// TODO: automatically filter out scam tokens
export const FILTERED_TOKENS = [
  getAddress('0xed12AE3Af6b21Be01788Ec84C6BD213d31364988'),
]

export const useTreasuryData = () => {
  const ethNFTData = useNFTData(
    ASCENSION_TREASURY_ADDRESS[mainnet.id],
    mainnet.id
  )
  const arbNFTData = useNFTData(
    ASCENSION_TREASURY_ADDRESS[arbitrum.id],
    arbitrum.id
  )
  const ethTokens = useTokenData(
    ASCENSION_TREASURY_ADDRESS[mainnet.id],
    mainnet.id
  )
  const arbTokens = useTokenData(
    ASCENSION_TREASURY_ADDRESS[arbitrum.id],
    arbitrum.id
  )
  const ethBalance = useBalance({
    address: ASCENSION_TREASURY_ADDRESS[1] as `0x${string}`,
    chainId: 1,
  })
  const arbBalance = useBalance({
    address: ASCENSION_TREASURY_ADDRESS[arbitrum.id] as `0x${string}`,
    chainId: arbitrum.id,
  })

  return useMemo(() => {
    if (
      !ethTokens ||
      !arbTokens ||
      !ethBalance ||
      !arbBalance ||
      !ethNFTData ||
      !arbNFTData
    ) {
      return null
    }
    const tokens = [
      {
        tokenBalance: parseFloat(arbBalance?.data?.formatted || '0'),
        contractAddress: ethers.constants.AddressZero,
        owner: ASCENSION_TREASURY_ADDRESS[arbitrum.id],
        priceUSD:
          ethTokens.find(
            (token) =>
              token.contractAddress === WETH9_ADDRESS[mainnet.id].toLowerCase()
          )?.priceUSD ?? 0,
        chainId: arbitrum.id,
        tokenMetadata: {
          name: arbitrum.name,
          symbol: arbitrum.nativeCurrency.symbol,
          decimals: 18,
          logo: '',
        },
      } as TokenData,
      {
        tokenBalance: parseFloat(ethBalance?.data?.formatted || '0'),
        contractAddress: ethers.constants.AddressZero,
        owner: ASCENSION_TREASURY_ADDRESS[1],
        priceUSD:
          ethTokens.find(
            (token) =>
              token.contractAddress === WETH9_ADDRESS[mainnet.id].toLowerCase()
          )?.priceUSD ?? 0,
        chainId: 1,
        tokenMetadata: {
          name: mainnet.name,
          symbol: mainnet.nativeCurrency.symbol,
          decimals: 18,
          logo: '',
        },
      } as TokenData,
    ]
      .concat([...ethTokens, ...arbTokens])
      .filter(
        (t) =>
          t.tokenBalance !== 0 &&
          !FILTERED_TOKENS.includes(getAddress(t.contractAddress))
      )
    const totalValueUSD = tokens.reduce(
      (sum, token) => sum + token.priceUSD * token.tokenBalance,
      0
    )

    const nftData = [ethNFTData, arbNFTData]
    return {
      nftData: nftData,
      tokens: tokens,
      totalValueUSD: totalValueUSD,
    }
  }, [arbBalance, ethBalance, arbTokens, ethTokens, ethNFTData, arbNFTData])
}
