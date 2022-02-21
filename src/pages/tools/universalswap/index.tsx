import React from 'react'
import Head from 'next/head'
import Container from '../../../components/Container'
import UniversalSwap from './UniversalSwap'
import Loader from '../../../components/Loader'
import { useEthers } from '@usedapp/core'
import useRequiredBalance from '../../../hooks/useRequiredBalance'
import BuyAscend from '../../../components/BuyAscend'
import Connection from '../../../components/Connection'

export default function UniversalSwapPage() {
  const { account, chainId } = useEthers()
  const pass = useRequiredBalance(account, 0)
  const supportedChainId = [1, 137, 56, 42161]

  if (!account)
    return (
      <Container>
        <Connection />
      </Container>
    )

  if (!chainId) return <Loader />
  if (!supportedChainId.includes(chainId))
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

      <Container maxWidth="full">{!pass ? <BuyAscend amount={100} /> : <UniversalSwap />}</Container>
    </>
  )
}
