'use client'
import Container from '@/components/ui/container'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import { m } from 'framer-motion'
import Partners from './Partners'
import CTA from './CTA'
import Features from './Features'
import LogoSVG from 'public/assets/logo.svg'
import backgroundImage from 'public/assets/bg.jpg'
import Image from 'next/image'

const HomePage = () => {
  return (
    <>
      {/* <Script src="https://platform.twitter.com/widgets.js" async /> */}
      <Section col fullscreen className="bg-cover bg-center " id="hero">
        <Image
          src={backgroundImage}
          fill
          className="object-cover object-center"
          alt=""
        />
        <Container className="mt-9 md:mt-24 lg:mt-32">
          <m.div
            initial={{ opacity: 0, translateY: 0 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: 'easeOut', delay: 0, duration: 1 }}
            className="relative  space-y-3  text-center"
          >
            <div className=" flex w-full  items-center justify-center">
              <LogoSVG className="h-32" />
            </div>
            <h1 className=" text-5xl font-bold   drop-shadow-2xl md:text-6xl lg:text-7xl">
              Prepare for{' '}
              <span className="bg-gradient-to-r from-orange-500 to-yellow bg-clip-text font-extrabold text-transparent ">
                Ascension
              </span>
            </h1>
            <p className="mx-auto p-1 text-xl  drop-shadow-2xl md:px-12 md:py-3 md:text-3xl lg:text-4xl">
              Ascension Protocol is a Decentralized Autonomous Organization
              (DAO) dedicated to providing DeFi tools and opportunities for
              it&apos;s constituents.
            </p>
            <m.div>
              <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col items-center gap-3 md:gap-6 lg:flex-row  lg:gap-9">
                <Link
                  href="/dashboard"
                  className="w-full rounded-full bg-gradient-to-r from-purple to-pink p-5 hover:brightness-90"
                >
                  Launch App
                </Link>
                <a
                  className="w-full rounded-full bg-blue p-5 hover:brightness-90"
                  href="#features"
                >
                  Learn more
                </a>
              </div>
            </m.div>
          </m.div>
        </Container>
      </Section>
      <Features />
      <Partners />
      {/* <Section centered className="min-h-[800px]">
        <Container>
          <a
            className="twitter-timeline"
            data-height="500"
            data-dnt="true"
            data-theme="dark"
            href="https://twitter.com/AscendProtocol?ref_src=twsrc%5Etfw"
          >
            <span className="sr-only">Tweets by AscendProtocol</span>
          </a>
        </Container>
      </Section> */}

      <CTA />
      <div className="bg-purple-900 py-12" />
    </>
  )
}

export default HomePage
