import Container from '../components/ui/Container'
import Link from 'next/link'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import { m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Logo from '../components/ui/Logo'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../types'
import LandingLayout from '../layouts/LandingLayout'
import Partners from '../components/home/Partners'
import CTA from '../components/home/CTA'
import Features from '../components/home/Features'
import Script from 'next/script'
import LogoSVG from 'public/assets/logo.svg'

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <Script src="https://platform.twitter.com/widgets.js" async />
      <Section
        fullscreen
        col
        className="bg-purple-900 bg-[url('/assets/bg.jpg')] bg-cover bg-center "
        id="hero"
      >
        <Container className="mt-9 md:mt-24 lg:mt-32">
          <m.div
            initial={{ opacity: 0, translateY: 33 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: 'easeOut', delay: 0, duration: 1 }}
            className="relative  space-y-3  text-center"
          >
            <div className=" flex w-full  items-center justify-center">
              <LogoSVG className="h-32" />
            </div>
            <h1 className=" text-5xl font-bold  text-primary drop-shadow-2xl md:text-6xl lg:text-7xl">
              Prepare for{' '}
              <span className="bg-gradient-to-r from-orange-500 to-yellow bg-clip-text font-extrabold text-transparent ">
                Ascension
              </span>
            </h1>
            <p className="mx-auto p-1 text-xl text-primary drop-shadow-2xl md:py-3 md:px-12 md:text-3xl lg:text-4xl">
              Ascension Protocol is a Decentralized Autonomous Organization
              (DAO) dedicated to providing DeFi tools and opportunities for
              it&apos;s constituents.
            </p>
            <m.div>
              <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col items-center gap-3 md:gap-6 lg:flex-row  lg:gap-9">
                <Link href="/dashboard" className="w-full">
                  <Button full size="lg" variant="gradient">
                    Launch App
                  </Button>
                </Link>
                <a className="w-full" href="#features">
                  <Button full size="lg" variant="blue">
                    Learn more
                  </Button>
                </a>
              </div>
            </m.div>
          </m.div>
        </Container>
      </Section>
      <Features />
      <Partners />
      <Section centered className="pb-48">
        <Container>
          <a
            className="twitter-timeline"
            // data-width="1200"
            data-height="500"
            data-dnt="true"
            data-theme="dark"
            href="https://twitter.com/AscendProtocol?ref_src=twsrc%5Etfw"
          >
            Tweets by AscendProtocol
          </a>
        </Container>
      </Section>

      <CTA />
      <div className="bg-purple-900 py-12" />
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <LandingLayout>{page}</LandingLayout>
    </>
  )
}
export default HomePage
