import React, { ReactElement } from 'react'
import { NextSeo } from 'next-seo'
import Section from '../../components/ui/Section'
import { NextPageWithLayout } from '../../types'
import AppLayout from '../../layouts/AppLayout'
import { motion } from 'framer-motion'
import Logo from '../../components/ui/Logo'
import SupernovaLogo from '../../components/icons/SupernovaLogo'

const SupernovaPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Supernova"
        description={`Ascension Protocol X Supernova`}
      />

      <Section centered>
        <div className="flex items-center justify-center gap-6 text-3xl font-extrabold text-secondary">
          <SupernovaLogo className="h-24 md:h-48" />
        </div>

        <h2 className=" mt-3 bg-gradient-to-br from-orange to-pink bg-clip-text p-1 text-3xl  font-extrabold text-transparent md:text-5xl lg:text-7xl">
          Coming Soon
        </h2>
      </Section>
    </>
  )
}
SupernovaPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
export default SupernovaPage
