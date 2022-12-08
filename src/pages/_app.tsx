import '@fontsource/jura/400.css'
import '../styles/globals.css'
import {
  Config,
  DAppProvider,
  MetamaskConnector,
  CoinbaseWalletConnector,
} from '@usedapp/core'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import {
  APP_DESCRIPTION,
  APP_NAME,
  HOME_CHAINID,
  RPC,
  SUPPORTED_CHAINS,
} from '../constants'
import AppLayout from '../layouts/AppLayout'

const config: Config = {
  readOnlyChainId: HOME_CHAINID,
  readOnlyUrls: RPC,
  multicallVersion: 2,
  autoConnect: true,
  networks: SUPPORTED_CHAINS,
  pollingInterval: 5000,
  notifications: {
    expirationPeriod: 1,
  },
  connectors: {
    walletConnect: new WalletConnectConnector({ rpc: RPC }),
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
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
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </DAppProvider>
    </>
  )
}

export default MyApp
