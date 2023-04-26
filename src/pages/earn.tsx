import React from 'react'
import { NextPageWithLayout } from '@/types'
import AppLayout from '@/layouts/AppLayout'
import { NextSeo } from 'next-seo'
import PolyStaking from '@/components/earn/PolyStaking'
import SingleStaking from '@/components/earn/SingleStaking'

const EarnPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Earn"
        description="Earn rewards with Ascension Protocol."
      />

      {/* <PolyStaking /> */}
      <SingleStaking />
    </>
  )
}

EarnPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>
}
export default EarnPage
