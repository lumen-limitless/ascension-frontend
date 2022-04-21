import React from 'react'
import '../styles/index.css'
import Head from 'next/head'
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

const APP_NAME = 'Ascension Protocol'
const APP_DESCRIPTION =
  'Ascension Protocol is a Decentralized Autonomous Organization(DAO) dedicated to providing DeFi tools and opportunities for its constituents.'
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title key="title">{APP_NAME}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta key="description" name="description" content={APP_DESCRIPTION} />
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#0B0514" />
        <meta key="twitter:card" name="twitter:card" content="app" />
        <meta key="twitter:title" name="twitter:title" content={APP_NAME} />
        <meta key="twitter:url" name="twitter:url" content={APP_NAME} />
        <meta key="twitter:description" name="twitter:description" content="" />
        <meta key="twitter:image" name="twitter:image" content="" />
        <meta key="twitter:creator" name="twitter:creator" content="@AscendProtocol" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content={APP_NAME} />
        <meta key="og:url" property="og:url" content="https://ascensionprotocol.io" />
        <meta key="og:image" property="og:image" content="/images/OG_IMAGE.jpg" />
        <meta key="og:description" property="og:description" content={APP_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
