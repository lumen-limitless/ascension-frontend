import React, { Suspense, useEffect, useState } from 'react'
import Head from 'next/head'
import Container from '../../../components/ui/Container'
import Loader from '../../../components/ui/Loader'
import { useEthers } from '@usedapp/core'
import { useRequiredBalance } from '../../../hooks/useRequiredBalance'
import BuyAscend from '../../../components/BuyAscend'
import { NextPage } from 'next'
import { DEX_BY_CHAIN, USDC_ADDRESS, WNATIVE_ADDRESS } from '../../../constants'
import Swap from '../../../components/Swap'
import TradingChart from '../../../components/TradingChart'
import { Token } from '../../../types'
import { useLocalStorage } from 'react-use'
import Section from '../../../components/ui/Section'
import Grid from '../../../components/ui/Grid'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

const Connect = dynamic(() => import('../../../components/Connect'), { ssr: false })
const SUPPORTED_CHAINID = [1, 137, 56, 42161]
const REQUIRED_BALANCE = 1

const UniversalSwapPage: NextPage = () => {
  const { account, chainId } = useEthers()
  const pass = useRequiredBalance(account, REQUIRED_BALANCE)
  const [dex, setDex] = useState<string>('sushiswap')

  useEffect(() => {
    if (chainId && SUPPORTED_CHAINID.includes[chainId] && DEX_BY_CHAIN[chainId]) {
      setDex(Object.keys(DEX_BY_CHAIN[chainId])[0])
    }
  }, [chainId])

  const [lastSellToken] = useLocalStorage<Token>('LastSellToken')
  const [sellToken, setSellToken] = useState<Token>(
    lastSellToken ?? {
      address: WNATIVE_ADDRESS[chainId],
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      chainId,
    }
  )

  const [lastBuyToken] = useLocalStorage<Token>('LastBuyToken')
  const [buyToken, setBuyToken] = useState<Token>(
    lastBuyToken ?? {
      address: USDC_ADDRESS[chainId],
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      chainId,
    }
  )

  if (!account)
    return (
      <Container>
        <Connect />
      </Container>
    )

  if (!chainId || pass === null)
    return (
      <Container>
        <Loader message="Fetching data from the blockchain..." />
      </Container>
    )
  if (pass === false) return <BuyAscend amount={REQUIRED_BALANCE} />
  if (!SUPPORTED_CHAINID.includes(chainId))
    return (
      <Container>
        <Loader message="Network not supported!" />
      </Container>
    )

  return (
    <>
      <NextSeo
        title={`Universal Swap Tool | Ascension Protocol`}
        description={`Ascension Protocol universal swap tool`}
      />

      <Section fullscreen padding="md" layout="start">
        <Container maxWidth="7xl">
          {pass && (
            <>
              <Grid gap="md">
                <div className="col-span-12  md:col-span-8">
                  <TradingChart buyToken={buyToken} dex={dex} />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Swap
                    sellToken={sellToken}
                    setSellToken={setSellToken}
                    buyToken={buyToken}
                    setBuyToken={setBuyToken}
                    setDex={setDex}
                    dex={dex}
                  />
                </div>
              </Grid>
            </>
          )}
        </Container>
      </Section>
    </>
  )
}

export default UniversalSwapPage
