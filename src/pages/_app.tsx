import React from 'react'
import '../styles/index.css'

import type { AppProps } from 'next/app'
import Layout from '../layout'
import { Arbitrum, Config, DAppProvider } from '@usedapp/core'
import { HOME_CHAINID, RPC } from '../constants'

const config: Config = {
  readOnlyChainId: HOME_CHAINID,
  readOnlyUrls: {
    [HOME_CHAINID]: RPC[HOME_CHAINID],
  },
  autoConnect: true,
  notifications: {
    checkInterval: 3000,
    expirationPeriod: 0,
  },
  pollingInterval: 10000,
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DAppProvider config={config}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
    </>
  )
}

export default MyApp
