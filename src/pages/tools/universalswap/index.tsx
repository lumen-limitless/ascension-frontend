import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Container from '../../../components/Container'
import Loader from '../../../components/Loader'
import { useEthers, useLocalStorage } from '@usedapp/core'
import useRequiredBalance from '../../../hooks/useRequiredBalance'
import BuyAscend from '../../../components/BuyAscend'
import Connection from '../../../components/Connection'
import { NextPage } from 'next'
import { DEX_BY_CHAIN, HOME_CHAINID, USD_ADDRESS, WNATIVE_ADDRESS } from '../../../constants'
import Swap from '../../../components/Swap'
import TradingChart from '../../../components/TradingChart'
import { Token } from '../../../types'

const SUPPORTED_CHAINID = [1, 137, 56, 42161]
const REQUIRED_BALANCE = 100
const UniversalSwapPage: NextPage = () => {
  const { account, chainId } = useEthers()
  const pass = useRequiredBalance(account, REQUIRED_BALANCE)
  const [dex, setDex] = useState<string>('sushiswap')

  useEffect(() => {
    if (chainId && SUPPORTED_CHAINID.includes[chainId] && DEX_BY_CHAIN[chainId]) {
      setDex(Object.keys(DEX_BY_CHAIN[chainId])[0])
    }
  }, [chainId])

  const [lastSellToken] = useLocalStorage('LastSellToken')
  const [sellToken, setSellToken] = useState<Token>(lastSellToken ?? WNATIVE_ADDRESS[chainId])

  const [lastBuyToken] = useLocalStorage('LastBuyToken')
  const [buyToken, setBuyToken] = useState<Token>(lastBuyToken ?? USD_ADDRESS[chainId])

  if (!account)
    return (
      <Container>
        <Connection />
      </Container>
    )

  if (!chainId || pass === null) return <Loader message="Fetching data from the blockchain..." />
  if (pass === false) return <BuyAscend amount={REQUIRED_BALANCE} />
  if (!SUPPORTED_CHAINID.includes(chainId))
    return (
      <Container>
        <Loader message="Network not supported!" />
      </Container>
    )

  return (
    <>
      <Head>
        <title>Universal Swap Tool | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol tools" />
      </Head>

      <Container maxWidth="7xl">
        {pass && (
          <>
            <div className="flex flex-col gap-3 md:flex-row ">
              <Swap
                sellToken={sellToken}
                setSellToken={setSellToken}
                buyToken={buyToken}
                setBuyToken={setBuyToken}
                setDex={setDex}
                dex={dex}
              />
              <TradingChart buyToken={buyToken} dex={dex} />
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export default UniversalSwapPage
