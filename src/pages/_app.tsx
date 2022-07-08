import { Config, DAppProvider } from '@usedapp/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { HOME_CHAINID, MULTICALL2_ADDRESS, RPC, SUPPORTED_CHAINS } from '../constants'
import Layout from '../layouts'
import '../styles/index.css'

const config: Config = {
  readOnlyChainId: HOME_CHAINID,
  readOnlyUrls: {
    [HOME_CHAINID]: RPC[HOME_CHAINID],
  },
  multicallAddresses: MULTICALL2_ADDRESS,
  autoConnect: true,
  networks: SUPPORTED_CHAINS,
  pollingInterval: 10000,
  notifications: {
    expirationPeriod: 0,
  },
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DAppProvider config={config}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
    </>
  )
}

export default MyApp
