import { CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Image from 'next/image'
import FadeInWhenVisible from '../animation/fadeInWhenVisible'
import Card from '../components/Card'
import Container from '../components/Container'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Link from 'next/link'
const HomePage: NextPage = () => {
  return (
    <>
      <div
        className="')] relative flex h-full min-h-screen w-full flex-col justify-start bg-cover bg-center  bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-p-2600.jpeg')" }}
        id="hero"
      >
        <Container maxWidth="7xl">
          <div className="flex w-full flex-col place-content-center pt-24 text-center md:pt-32 lg:pt-48 ">
            {' '}
            <div className="">
              <Image
                src="/images/ASCEND-rise-animation.gif"
                width={240}
                height={240}
                alt="Prepare for Ascension"
                priority={true}
              />
            </div>
            <motion.div className="" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className=" text-5xl font-bold text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
                Prepare for{' '}
                <span className="bg-gradient-to-r from-ascend-orange to-ascend-yellow bg-clip-text font-extrabold text-transparent">
                  Ascension
                </span>
              </h1>
              <p className="mx-auto text-xl leading-7 text-gray-100 drop-shadow-2xl md:px-12 md:text-2xl">
                Ascension Protocol is a Decentralized Autonomous Organization (DAO) dedicated to providing DeFi tools
                and opportunities for its constituents.
              </p>
            </motion.div>
            <motion.div
              className="flex w-full flex-col place-content-center gap-3 px-6 py-6 md:flex-row md:px-32"
              initial={{ opacity: 0 }}
              transition={{ ease: 'easeIn', delay: 0.99 }}
              animate={{ opacity: 1 }}
            >
              <Link href="/dashboard" passHref>
                <Button color="gradient">Dashboard</Button>
              </Link>
              <Link href="#features" passHref>
                <Button color="blue">Learn More</Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>

      <div className="relative flex w-full flex-col items-center justify-start text-center lg:h-screen" id="features">
        <Container maxWidth="full">
          <div className="flex flex-col py-12">
            <h2 className="text-shadow text-6xl text-primary">Features</h2>
            <div className="flex w-full flex-col items-center justify-center gap-9 py-12 lg:flex-row  xl:gap-12">
              <FadeInWhenVisible delay={0.11 * 1}>
                <Card className="h-[36rem] w-96">
                  <div className="flex w-full flex-col items-center justify-center gap-3">
                    <svg width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="100" fill="url(#paint0_linear_216_28)" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M90.9049 111.257C76.2258 117.764 58.4322 115.001 46.3984 102.967C34.3647 90.9332 31.6012 73.1396 38.1081 58.4605L64.5065 84.8589L85.2893 64.0761L59.061 37.8478C73.6225 31.6781 91.0969 34.5283 102.967 46.3984C114.837 58.2685 117.687 75.7429 111.518 90.3044L161.657 140.444L140.874 161.226L90.9049 111.257Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_216_28"
                          x1="236"
                          y1="43"
                          x2="4.44651e-06"
                          y2="165"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EE502F" />
                          <stop offset="1" stopColor="#943259" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <h3 className="text-4xl text-primary">Tools</h3>
                    <p className="text-lg text-secondary">
                      Our ecosystem incorporates a variety of bots, tools, and automated processes to take advantage of
                      market opportunities. These tools can be delegated to trustless protocols to eliminate risk of
                      downtime and centralization.
                    </p>
                  </div>
                </Card>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.11 * 2}>
                <Card className="h-[36rem] w-96">
                  <div className="flex w-full flex-col items-center justify-center gap-3 ">
                    <svg width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="100" fill="url(#paint0_linear_216_6)" />
                      <path d="M38.25 83H161.75V91.5121H38.25V83Z" fill="white" />
                      <path d="M39.3333 93.6376H49.0833V126.794H39.3333V93.6376Z" fill="white" />
                      <path d="M149.833 93.6376H159.583V126.794H149.833V93.6376Z" fill="white" />
                      <path d="M133.583 93.6376H143.333V126.794H133.583V93.6376Z" fill="white" />
                      <path d="M114.083 93.6376H123.833V126.794H114.083V93.6376Z" fill="white" />
                      <path d="M75.0833 93.6376H84.8333V126.794H75.0833V93.6376Z" fill="white" />
                      <path d="M94.5833 93.6376H104.333V126.794H94.5833V93.6376Z" fill="white" />
                      <path d="M55.5833 93.6376H65.3333V126.794H55.5833V93.6376Z" fill="white" />
                      <path d="M38.25 129.345H161.75V137.847H38.25V129.345Z" fill="white" />
                      <path d="M35 139.547H165V154H35V139.547Z" fill="white" />
                      <path
                        d="M57 80.5C57 74.9188 58.1122 69.3923 60.2732 64.236C62.4341 59.0796 65.6015 54.3944 69.5944 50.448C73.5873 46.5015 78.3276 43.3709 83.5446 41.2351C88.7616 39.0993 94.3532 38 100 38C105.647 38 111.238 39.0993 116.455 41.2351C121.672 43.3709 126.413 46.5015 130.406 50.448C134.399 54.3945 137.566 59.0796 139.727 64.236C141.888 69.3923 143 74.9188 143 80.5L57 80.5Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_216_6"
                          x1="236"
                          y1="43"
                          x2="4.44651e-06"
                          y2="165"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FCB503" />
                          <stop offset="1" stopColor="#EE502F" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <h3 className="text-4xl text-primary">Governance</h3>
                    <p className="text-lg text-secondary">
                      Token holders can interact with the protocol directly via snapshot governance system. Specially
                      crafted smart contracts allow for restricted access to treasury funds to be used with these
                      governance strategies, preventing bad actors from abusing the system.
                    </p>
                  </div>
                </Card>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.11 * 3}>
                <Card className=" h-[36rem] w-96">
                  <div className="flex w-full flex-col items-center justify-center gap-3">
                    <svg width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="100" fill="url(#paint0_linear_216_46)" />
                      <path
                        d="M146.939 70.4145H133.512C135.651 67.189 136.271 63.2736 135.205 59.5516C135.148 59.3526 134.885 58.5681 134.809 58.37C133.32 54.5122 130.169 51.6496 126.163 50.5161C122.071 49.3577 117.784 50.1702 114.401 52.7453L100 63.71L85.5986 52.7453C82.2165 50.1704 77.9298 49.3575 73.8365 50.5161C69.8312 51.6498 66.68 54.5122 65.1914 58.3694C65.1176 58.5606 64.852 59.352 64.7955 59.55C63.7296 63.2734 64.3488 67.1888 66.4882 70.4145H53.0612C51.3706 70.4145 50 71.7849 50 73.4755V97.9633C50 99.6539 51.3706 101.024 53.0612 101.024H56.1224V146.939C56.1224 148.63 57.4931 150 59.1837 150H140.816C142.507 150 143.878 148.63 143.878 146.939V101.024H146.939C148.629 101.024 150 99.6539 150 97.9633V73.4753C150 71.7849 148.629 70.4145 146.939 70.4145ZM103.061 69.0741L118.11 57.6161C119.946 56.2185 122.273 55.7773 124.496 56.4067C126.631 57.011 128.308 58.53 129.096 60.5716C129.138 60.6798 129.287 61.1232 129.319 61.2349C129.926 63.3545 129.501 65.5996 128.153 67.3941C126.761 69.2486 124.645 70.3175 122.35 70.3263C122.102 70.3273 120.408 70.4145 120.408 70.4145H103.061V69.0741H103.061ZM103.061 83.1196L111.379 94.9022H103.061V83.1196ZM70.6812 61.2351C70.7131 61.1239 70.861 60.6824 70.9029 60.5743C71.6918 58.53 73.369 57.011 75.5039 56.4067C77.7263 55.7775 80.0537 56.2185 81.8894 57.6161L96.9388 69.0741V70.4145H79.5918C79.5918 70.4145 77.8984 70.3273 77.6502 70.3263C75.3547 70.3173 73.2396 69.2486 71.8469 67.3941C70.4994 65.5994 70.0745 63.3545 70.6812 61.2351ZM56.1224 94.9022V76.5363H96.9388V94.9022H56.1224ZM137.755 143.878H62.2449V101.024H96.9388V122.451C96.9388 124.142 98.3094 125.512 100 125.512C101.691 125.512 103.061 124.142 103.061 122.451V101.024H115.701L121.989 109.932C122.964 111.313 124.875 111.642 126.255 110.667C127.637 109.692 127.966 107.782 126.991 106.401L123.195 101.024H137.755V143.878ZM143.878 94.9022H118.873L105.908 76.5363H143.878V94.9022Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_216_46"
                          x1="236"
                          y1="43"
                          x2="4.44651e-06"
                          y2="165"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#943259" />
                          <stop offset="1" stopColor="#2D1A62" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <h3 className="text-4xl text-primary">Rewards</h3>
                    <p className="text-lg text-secondary">
                      Ascension Protocol offers multiple private DAO tiers that unlock access to a variety of perks &
                      benefits. These include access to whitelisted presales, private allocations, and much more.
                      Members of our highest tier unlock early access to new features and enhancements for the protocol.
                    </p>
                  </div>
                </Card>
              </FadeInWhenVisible>
            </div>
          </div>
        </Container>
      </div>

      <div
        className="relative flex  w-full flex-col items-center justify-start border-t border-b border-dark-600 text-center"
        id="partners"
      >
        <Container maxWidth="7xl">
          <FadeInWhenVisible>
            <div className="w-full py-9 text-center">
              <h2 className="text-shadow text-6xl text-primary">Partners & Investments</h2>
              <ul className="flex justify-evenly gap-1 px-3 pt-12">
                <li>
                  <a href="https://gmx.io/" target={'_blank'} rel="noreferrer">
                    <Image src="/images/gmx.png" height={64} width={112} alt="GMX" />
                  </a>
                </li>
                <li>
                  <a href="https://frens.ventures/" target={'_blank'} rel="noreferrer">
                    <Image src="/images/frens-ventures-white.png" height={64} width={124} alt="Frens Ventures" />
                  </a>
                </li>
                <li>
                  <a href="https://cryptojingles.app/" target={'_blank'} rel="noreferrer">
                    <Image src="/images/cryptojingles.png" height={64} width={124} alt="CryptoJingles" />
                  </a>
                </li>
              </ul>
            </div>
          </FadeInWhenVisible>
        </Container>
      </div>
      <div
        className="relative flex h-screen w-full flex-col items-center justify-center bg-gradient-to-tr from-ascend-purple via-ascend-magenta to-ascend-yellow text-center md:h-[60vh]"
        id="cta"
      >
        <Container maxWidth="7xl">
          <FadeInWhenVisible>
            <Card>
              <h3 className=" mb-12 text-5xl text-primary">Join the Ascension</h3>
              <div className="grid grid-cols-1 gap-3  md:grid-cols-2">
                <a
                  className="flex flex-grow justify-center gap-1 rounded-full bg-[#2AABEE] p-3 text-center hover:bg-opacity-80"
                  href="https://t.me/AscensionProtocolChat"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" height={24}>
                    <path
                      fillRule="evenodd"
                      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12S5.373 0 12 0s12 5.373 12 12ZM12.43 8.859c-1.167.485-3.5 1.49-6.998 3.014c-.568.226-.866.447-.893.663c-.046.366.412.51 1.034.705c.085.027.173.054.263.084c.613.199 1.437.432 1.865.441c.389.008.823-.152 1.302-.48c3.268-2.207 4.955-3.322 5.061-3.346c.075-.017.179-.039.249.024c.07.062.063.18.056.212c-.046.193-1.84 1.862-2.77 2.726c-.29.269-.495.46-.537.504c-.094.097-.19.19-.282.279c-.57.548-.996.96.024 1.632c.49.323.882.59 1.273.856c.427.291.853.581 1.405.943c.14.092.274.187.405.28c.497.355.944.673 1.496.623c.32-.03.652-.331.82-1.23c.397-2.126 1.179-6.73 1.36-8.628a2.111 2.111 0 0 0-.02-.472a.506.506 0 0 0-.172-.325c-.143-.117-.365-.142-.465-.14c-.451.008-1.143.249-4.476 1.635Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Join Telegram
                </a>
                <a
                  className="flex flex-grow justify-center gap-1 rounded-full bg-[#5865F2] p-3 text-center hover:bg-opacity-80"
                  href="https://discord.gg/8k2zGuGeAZ"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" height={24}>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0a12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055a20.03 20.03 0 0 0 5.993 2.98a.078.078 0 0 0 .084-.026a13.83 13.83 0 0 0 1.226-1.963a.074.074 0 0 0-.041-.104a13.201 13.201 0 0 1-1.872-.878a.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-2.981a.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028ZM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38c0-1.312.956-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.956 2.38-2.157 2.38Zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38c0-1.312.955-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.946 2.38-2.157 2.38Z"
                    />
                  </svg>
                  Join Discord
                </a>
                <a
                  className="flex flex-grow justify-center gap-1 rounded-full bg-pink p-3 text-center hover:bg-opacity-80"
                  href="https://app.sushi.com/swap?&outputCurrency=0x9e724698051da34994f281bd81c3e7372d1960ae"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <CurrencyDollarIcon height={24} />
                  Buy on SushiSwap
                </a>
                <a
                  className="flex flex-grow justify-center gap-1 rounded-full bg-ascend-purple p-3 text-center hover:bg-opacity-80"
                  href="https://ascension-group.gitbook.io/ascension-protocol/"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <DocumentTextIcon height={24} />
                  Documentation
                </a>
              </div>
            </Card>
          </FadeInWhenVisible>
        </Container>
      </div>
    </>
  )
}

export default HomePage
