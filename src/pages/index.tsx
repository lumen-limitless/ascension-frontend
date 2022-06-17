import { CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import Link from 'next/link'
import FadeUpWhenVisible from '../animations/fadeUpWhenVisible'
import FadeUp from '../animations/fadeUp'
import FadeIn from '../animations/fadeIn'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import { APP_NAME } from '../constants'
import Head from 'next/head'
import Logo from '../components/icons/Logo'
import ImageComponent from '../components/ui/ImageComponent'
import GovernanceIcon from '../components/icons/GovernanceIcon'
import RewardsIcon from '../components/icons/RewardsIcon'
import ToolsIcon from '../components/icons/ToolsIcon'

const features = [
  {
    icon: <ToolsIcon />,
    title: 'Tools',
    description:
      'Our ecosystem incorporates a variety of bots and automated processes to take advantage of market opportunities. These tools utilize trustless protocols to eliminate the risk of downtime and centralization.',
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
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Section
        fullscreen
        className="bg-[#050310] bg-cover bg-center bg-no-repeat"
        id="hero"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/ascension-protocol/image/upload/v1655238292/ASCENSION/bg-p-3200_dvrwoc.jpg')",
        }}
      >
        <Container maxWidth="7xl">
          <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
            <FadeUp>
              <Card className="border-transparent">
                <ImageComponent
                  src="/ASCEND-rise-animation_tmhgil"
                  height={128}
                  width={128}
                  priority={true}
                />
                <h1 className=" text-5xl font-bold text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
                  Prepare for{' '}
                  <span className="bg-gradient-to-r from-ascend-orange to-ascend-yellow bg-clip-text font-extrabold text-transparent brightness-110">
                    Ascension
                  </span>
                </h1>{' '}
                <p className="mx-auto py-1 text-base text-gray-100 drop-shadow-2xl md:py-3 md:px-12 md:text-2xl">
                  Ascension Protocol is a Decentralized Autonomous Organization (DAO) dedicated to
                  providing DeFi tools and opportunities for its constituents.
                </p>{' '}
                <FadeIn delay={0.66}>
                  <div className="flex w-full flex-col items-center gap-3 px-6 py-6 lg:flex-row">
                    <Link href="/dashboard">
                      <a className="w-full">
                        <Button color="gradient">Dashboard</Button>
                      </a>
                    </Link>
                    <a className="w-full" href="#features">
                      <Button color="blue">Learn more</Button>
                    </a>
                  </div>
                </FadeIn>
              </Card>
            </FadeUp>
          </div>
        </Container>
      </Section>

      <Section id="features">
        <Container maxWidth="full">
          <div className="flex flex-col py-12">
            <div className="grid w-full grid-cols-1  gap-9 py-12 md:px-9 xl:grid-cols-3 ">
              {features.map((f, i) => (
                <FadeUpWhenVisible delay={0.09 * (i + 1)} key={f.title}>
                  <Card className=" h-full xl:max-h-96 xl:text-lg">
                    <div className="flex w-full flex-col justify-center gap-3 p-3">
                      <div className="flex items-center gap-3 ">
                        {' '}
                        {f.icon}
                        <h2 className="text-4xl text-primary">{f.title}</h2>
                      </div>

                      <p className="text-secondary">{f.description}</p>
                    </div>
                  </Card>
                </FadeUpWhenVisible>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="partners">
        <Container maxWidth="7xl">
          <FadeUpWhenVisible>
            <div className="w-full py-6 text-center lg:py-9">
              <h3 className="text-shadow text-5xl text-primary lg:text-6xl">
                Partners & Investments
              </h3>
              <div className="my-6 flex w-full items-center justify-evenly gap-3 md:gap-6 lg:my-12 lg:gap-9">
                <a href="https://gmx.io/" target="_blank" rel="noopener noreferrer">
                  <ImageComponent src="/gmx_lcmrxs.png" width={172} height={100} alt="GMX" />
                </a>
                <a href="https://frens.ventures/" target="_blank" rel="noopener noreferrer">
                  <ImageComponent
                    src="/frens-ventures-white_bmoqdd.png"
                    alt="Frens Ventures"
                    width={316}
                    height={100}
                  />
                </a>
                <a href="https://cryptojingles.app/" target="_blank" rel="noopener noreferrer">
                  <ImageComponent
                    src="/cryptojingles_pweofi.png"
                    alt="Crypto Jingles"
                    width={271}
                    height={100}
                  />
                </a>
                <a href="https://www.layer2dao.org/#/" target="_blank" rel="noopener noreferrer">
                  <ImageComponent
                    src="/Layer2DAO_uyrfs1.png"
                    alt="Layer2 DAO"
                    width={100}
                    height={100}
                  />
                </a>
              </div>
            </div>
          </FadeUpWhenVisible>
        </Container>
      </Section>

      <Section
        className=" min-h-[60vh]  bg-gradient-to-tr from-ascend-purple via-ascend-magenta to-ascend-yellow"
        id="cta"
      >
        <Container maxWidth="7xl">
          <FadeUpWhenVisible>
            <Card className="border-transparent">
              <div className="text-center md:pb-12">
                <h4 className=" mb-12 text-4xl text-primary lg:text-5xl">Join the Ascension</h4>
                <div className="grid grid-cols-1 place-content-center gap-6 md:grid-cols-2">
                  <a href="https://t.me/AscensionProtocolChat" target={'_blank'} rel="noreferrer">
                    <Button className="bg-[#2AABEE] hover:shadow-[#2AABEE]">
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
                  <a href="https://discord.gg/8k2zGuGeAZ" target={'_blank'} rel="noreferrer">
                    <Button className="bg-[#5865F2] hover:shadow-[#5865F2]">
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
                    href="https://app.sushi.com/swap?&outputCurrency=0x9e724698051da34994f281bd81c3e7372d1960ae"
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <Button color="gradient">
                      {' '}
                      <CurrencyDollarIcon height={24} />
                      Buy on SushiSwap
                    </Button>
                  </a>
                  <a
                    href="https://ascension-group.gitbook.io/ascension-protocol/"
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <Button className="bg-ascend-purple hover:shadow-ascend-purple">
                      {' '}
                      <DocumentTextIcon height={24} />
                      Documentation
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </FadeUpWhenVisible>
        </Container>
      </Section>
    </>
  )
}

export default HomePage
