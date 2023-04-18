import '@rainbow-me/rainbowkit/styles.css'
import '@fontsource/jura/400.css'
import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { APP_DESCRIPTION, APP_NAME } from '../constants'
import { NextPageWithLayout } from '../types'
import Layout from '../layouts/Layout'
import { domAnimation, LazyMotion } from 'framer-motion'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  //https://github.com/vercel/next.js/discussions/35773#discussioncomment-2622885
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

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

      <Layout>
        {getLayout(
          <LazyMotion features={domAnimation} strict>
            <Component {...pageProps} />
          </LazyMotion>
        )}
      </Layout>
    </>
  )
}

export default MyApp
