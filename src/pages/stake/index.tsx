import React from 'react'
import Head from 'next/head'
import Container from '../../components/Container'
import Stake from '../../components/Stake'
import { NextPage } from 'next'

const StakePage: NextPage = () => {
  return (
    <Container maxWidth="4xl">
      <Head>
        <title>Stake | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol staking" />
      </Head>
      <Stake />
    </Container>
  )
}

export default StakePage
