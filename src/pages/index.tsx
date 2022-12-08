import { NextPage } from 'next'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import Link from 'next/link'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import GovernanceIcon from '../components/icons/GovernanceIcon'
import RewardsIcon from '../components/icons/RewardsIcon'
import ToolsIcon from '../components/icons/ToolsIcon'
import Typography from '../components/ui/Typography'

import { motion } from 'framer-motion'
import CryptoJinglesIcon from '../components/icons/CryptoJinglesIcon'
import L2DAOIcon from '../components/icons/L2DAOIcon'
import FrensIcon from '../components/icons/FrensIcon'
import GMXIcon from '../components/icons/GMXIcon'
import ExternalLink from '../components/ui/ExternalLink'
import { NextSeo } from 'next-seo'
import Logo from '../components/ui/Logo'

const features = [
  {
    icon: <ToolsIcon />,
    title: 'Tools',
    description:
      'Our ecosystem incorporates a variety of bots and automated processes to take advantage of market opportunities. These tools utilize decentralized protocols to eliminate the risk of downtime and centralization.',
  },
  {
    icon: <GovernanceIcon />,
    title: 'Governance',
    description:
      'Token holders can interact with the protocol directly via our snapshot governance platform. A modular smart contract system allows for safe and restricted access to treasury funds, preventing bad actors from abusing the system.',
  },
  {
    icon: <RewardsIcon />,
    title: 'Rewards',
    description:
      'The Ascension DAO offers multiple private tiers that unlock a variety of perks and benefits, including access to whitelisted presales, private allocations, and much more. Members of our highest tier receive early access to new features and enhancements.',
  },
]

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo />

      <Section
        fullscreen
        className="bg-[#050310] bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat py-16"
        id="hero"
      >
        <Container>
          <div className="space-y-6 text-center xl:mt-12">
            <div className=" flex w-full items-center justify-center ">
              <Logo size={128} />
            </div>
            <Typography
              as="h1"
              className=" text-5xl font-bold text-primary drop-shadow-2xl md:text-6xl lg:text-7xl"
            >
              Prepare for{' '}
              <span className="bg-gradient-to-r from-orange-500 to-yellow bg-clip-text font-extrabold text-transparent ">
                Ascension
              </span>
            </Typography>{' '}
            <Typography
              as="p"
              className="mx-auto p-1 text-xl text-primary drop-shadow-2xl md:py-3 md:px-12 md:text-3xl lg:text-4xl"
            >
              Ascension Protocol is a Decentralized Autonomous Organization
              (DAO) dedicated to providing DeFi tools and opportunities for
              it&apos;s constituents.
            </Typography>{' '}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', delay: 0, duration: 0.99 }}
            >
              <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col items-center gap-3 md:gap-6 lg:flex-row  lg:gap-9">
                <Link href="/dashboard" className="w-full" passHref>
                  <Button full size="lg" color="gradient">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 2048 2048"
                    >
                      <path
                        fill="currentColor"
                        d="M512 896h384v1152H512V896zm128 1024h128v-896H640v896zm384-768h384v896h-384v-896zm128 768h128v-640h-128v640zM0 1408h384v640H0v-640zm128 512h128v-384H128v384zM1536 640h384v1408h-384V640zm128 1280h128V768h-128v1152zM1389 621q19 41 19 83q0 40-15 75t-41 61t-61 41t-75 15q-40 0-75-15t-61-41t-41-61t-15-75v-12q0-6 1-12l-188-94q-26 26-61 40t-72 14q-42 0-83-19L365 877q19 41 19 83q0 40-15 75t-41 61t-61 41t-75 15q-40 0-75-15t-61-41t-41-61t-15-75q0-40 15-75t41-61t61-41t75-15q42 0 83 19l256-256q-19-41-19-83q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v12q0 6-1 12l188 94q26-26 61-40t72-14q42 0 83 19l256-256q-19-41-19-83q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75q0 40-15 75t-41 61t-61 41t-75 15q-42 0-83-19l-256 256zM192 1024q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19zm1536-896q-26 0-45 19t-19 45q0 26 19 45t45 19q26 0 45-19t19-45q0-26-19-45t-45-19zM704 512q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19zm512 256q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19z"
                      />
                    </svg>
                    Dashboard
                  </Button>
                </Link>
                <a className="w-full" href="#features">
                  <Button full size="lg" color="blue">
                    Learn more
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section id="features">
        <Container>
          <div className="flex flex-col py-12">
            <div className=" grid w-full  grid-cols-1 gap-9 py-12 md:px-9 xl:grid-cols-3 ">
              {features.map((f, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 33 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    delay: 0.12 * i,
                  }}
                  key={f.title}
                >
                  <Card className=" h-full xl:max-h-96 ">
                    <Card.Body>
                      <div className="flex w-full flex-col justify-center gap-3 p-3">
                        <div className="flex items-center gap-3 ">
                          {' '}
                          {f.icon}
                          <Typography as="h2" className="text-4xl text-primary">
                            {f.title}
                          </Typography>
                        </div>

                        <Typography className="text-secondary">
                          {f.description}
                        </Typography>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="partners" className="py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 1 }}
            className="w-full py-6 text-center lg:py-9"
          >
            <Typography
              as="h3"
              className="text-shadow text-5xl text-primary md:text-6xl lg:text-7xl"
            >
              Partners & Investments
            </Typography>
            <div className="my-6 flex w-full flex-wrap items-center justify-evenly gap-3 md:gap-6 lg:my-12 lg:gap-9">
              <ExternalLink href="https://gmx.io/#/?ref=ascension">
                <GMXIcon />
              </ExternalLink>
              <ExternalLink href="https://frens.ventures/">
                <FrensIcon />
              </ExternalLink>
              <ExternalLink href="">
                <CryptoJinglesIcon />
              </ExternalLink>
              <ExternalLink href="https://www.layer2dao.org/#/">
                <L2DAOIcon />
              </ExternalLink>
            </div>
          </motion.div>
        </Container>
      </Section>
      <></>
      <Section className="py-24" id="cta">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-purple via-pink to-yellow opacity-70 blur" />
        <Container className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 1 }}
            className="z-10"
          >
            <Typography
              as="h4"
              centered
              className=" mb-12 text-5xl text-primary md:text-6xl lg:text-7xl"
            >
              Join the Ascension
            </Typography>
            <div className="grid grid-cols-1 place-content-center gap-6 md:grid-cols-2">
              <a
                href="https://t.me/AscensionProtocolChat"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  full
                  className="bg-[#2AABEE] hover:shadow-[#2AABEE]/10"
                >
                  {' '}
                  <svg fill="currentColor" viewBox="0 0 24 24" height={24}>
                    <path
                      fillRule="evenodd"
                      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12S5.373 0 12 0s12 5.373 12 12ZM12.43 8.859c-1.167.485-3.5 1.49-6.998 3.014c-.568.226-.866.447-.893.663c-.046.366.412.51 1.034.705c.085.027.173.054.263.084c.613.199 1.437.432 1.865.441c.389.008.823-.152 1.302-.48c3.268-2.207 4.955-3.322 5.061-3.346c.075-.017.179-.039.249.024c.07.062.063.18.056.212c-.046.193-1.84 1.862-2.77 2.726c-.29.269-.495.46-.537.504c-.094.097-.19.19-.282.279c-.57.548-.996.96.024 1.632c.49.323.882.59 1.273.856c.427.291.853.581 1.405.943c.14.092.274.187.405.28c.497.355.944.673 1.496.623c.32-.03.652-.331.82-1.23c.397-2.126 1.179-6.73 1.36-8.628a2.111 2.111 0 0 0-.02-.472a.506.506 0 0 0-.172-.325c-.143-.117-.365-.142-.465-.14c-.451.008-1.143.249-4.476 1.635Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Join Telegram
                </Button>
              </a>
              <a
                href="https://discord.gg/8k2zGuGeAZ"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  full
                  className="bg-[#5865F2] hover:shadow-[#5865F2]/10"
                >
                  {' '}
                  <svg fill="currentColor" viewBox="0 0 24 24" height={24}>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0a12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055a20.03 20.03 0 0 0 5.993 2.98a.078.078 0 0 0 .084-.026a13.83 13.83 0 0 0 1.226-1.963a.074.074 0 0 0-.041-.104a13.201 13.201 0 0 1-1.872-.878a.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-2.981a.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028ZM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38c0-1.312.956-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.956 2.38-2.157 2.38Zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38c0-1.312.955-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.946 2.38-2.157 2.38Z"
                    />
                  </svg>
                  Join Discord
                </Button>
              </a>
              <a
                href="https://docs.ascensionprotocol.io"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  full
                  className="bg-purple hover:shadow-purple/10"
                >
                  {' '}
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View Documentation
                </Button>
              </a>
              <a
                href="https://app.sushi.com/swap?&outputCurrency=0x9e724698051da34994f281bd81c3e7372d1960ae"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button size="lg" full color="gray">
                  <Logo size={24} />
                  Purchase ASCEND
                </Button>
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

export default HomePage
