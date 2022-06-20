import { Config, DAppProvider } from '@usedapp/core'
import { AppProps } from 'next/app'
import React from 'react'
import { HOME_CHAINID, MULTICALL2_ADDRESS, RPC, SUPPORTED_CHAINS } from '../constants'
import Layout from '../layouts'
import '../styles/index.css'

const config: Config = {
  readOnlyChainId: HOME_CHAINID,
  readOnlyUrls: RPC,
  multicallAddresses: MULTICALL2_ADDRESS,
  autoConnect: true,
  notifications: {
    checkInterval: 3000,
    expirationPeriod: 0,
  },
  networks: SUPPORTED_CHAINS,
  pollingInterval: 60000,
  fastMulticallEncoding: true,
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
