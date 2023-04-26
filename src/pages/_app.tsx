import '@rainbow-me/rainbowkit/styles.css'
import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Jura } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { APP_DESCRIPTION, APP_NAME } from '../constants'
import { NextPageWithLayout } from '../types'
import Layout from '../layouts/Layout'
import { domAnimation, LazyMotion } from 'framer-motion'
import ErrorBoundary from '@/components/ErrorBoundary'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const jura = Jura({
  subsets: ['latin'],
})

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

      <style jsx global>
        {`
          html {
            font-family: ${jura.style.fontFamily};
          }
        `}
      </style>
      <ErrorBoundary>
        <Layout>
          {getLayout(
            <LazyMotion features={domAnimation} strict>
              <Component {...pageProps} />
            </LazyMotion>
          )}
        </Layout>
      </ErrorBoundary>
    </>
  )
}

export default MyApp
