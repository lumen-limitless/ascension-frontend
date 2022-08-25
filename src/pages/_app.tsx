import '@fontsource/jura/400.css'
import '../styles/index.css'
import { Config, DAppProvider } from '@usedapp/core'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import {
  APP_DESCRIPTION,
  APP_NAME,
  HOME_CHAINID,
  MULTICALL2_ADDRESS,
  RPC,
  SUPPORTED_CHAINS,
} from '../constants'
import Layout from '../layouts'

const config: Config = {
  readOnlyChainId: HOME_CHAINID,
  readOnlyUrls: RPC,
  multicallAddresses: MULTICALL2_ADDRESS,
  autoConnect: true,
  networks: SUPPORTED_CHAINS,
  pollingInterval: 1000,
  notifications: {
    expirationPeriod: 1,
  },
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        defaultTitle={APP_NAME}
        titleTemplate={`%s | ${APP_NAME}`}
        description={APP_DESCRIPTION}
      />
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
