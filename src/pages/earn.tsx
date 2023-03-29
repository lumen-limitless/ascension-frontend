import React from 'react'
import { NextPageWithLayout } from '../types'
import AppLayout from '../layouts/AppLayout'
import AscendStaking from '../components/earn/AscendStaking'
import { NextSeo } from 'next-seo'

const EarnPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Earn"
        description="Earn rewards with Ascension Protocol."
      />
      <AscendStaking />
    </>
  )
}

EarnPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>
}
export default EarnPage
