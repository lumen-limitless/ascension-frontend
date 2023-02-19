import clsx from 'clsx'
import FancyButton from './FancyButton'
import Container from './ui/Container'
import Divider from './ui/Divider'
import Section from './ui/Section'
import { motion } from 'framer-motion'
import ToolsIcon from './icons/ToolsIcon'
import GovernanceIcon from './icons/GovernanceIcon'
import RewardsIcon from './icons/RewardsIcon'
import ExternalLink from './ui/ExternalLink'

const features = [
  {
    alignment: 'left',
    icon: <ToolsIcon className="h-48 lg:h-56" />,
    title: 'Tools',
    href: '/tools',
    buttonText: 'View Tools',
    buttonGradient: 'from-pink to-orange',
    description:
      'Our ecosystem incorporates a variety of bots and automated processes to take advantage of market opportunities. These tools utilize decentralized protocols to eliminate the risk of downtime and centralization.',
  },
  {
    alignment: 'right',
    icon: <GovernanceIcon className="h-48 lg:h-56" />,
    title: 'Governance',
    href: 'https://vote.ascensionprotocol.io',
    buttonText: 'View Governance',
    buttonGradient: 'from-orange to-yellow',
    description:
      'Token holders can interact with the protocol directly via our snapshot governance platform. A modular smart contract system allows for safe and restricted access to treasury funds, preventing bad actors from abusing the system.',
  },
  {
    alignment: 'left',
    icon: <RewardsIcon className="h-48 lg:h-56" />,
    title: 'Rewards',
    href: 'https://discord.com/channels/954952786041258004/955526077994905600',
    buttonText: 'Join DAO',
    buttonGradient: 'from-purple to-pink',
    description:
      'The Ascension DAO offers multiple private tiers that unlock a variety of perks and benefits, including access to whitelisted presales, private allocations, and much more. Members of our highest tier receive early access to new features and enhancements.',
  },
]

export default function Features() {
  return (
    <>
      <Section id="features" className="bg-purple-900 py-24">
        <Container className="max-w-7xl">
          <div className="block space-y-24">
            {features.map((f, i) => (
              <motion.div
                initial={{
                  opacity: 0,
                  x: f.alignment === 'right' ? '10%' : '-10%',
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  delay: 0.12 * i,
                  duration: 1,
                }}
                key={f.title}
                className="w-full"
              >
                <div
                  className={clsx(
                    'flex flex-col items-start gap-9 py-12 px-3 md:items-center',
                    f.alignment === 'right'
                      ? 'md:flex-row-reverse'
                      : 'md:flex-row'
                  )}
                >
                  <div>{f.icon}</div>
                  <div
                    className={clsx(f.alignment === 'right' && 'md:text-right')}
                  >
                    <h2 className="pb-3 text-5xl font-bold leading-3 text-primary lg:pb-0  lg:text-6xl">
                      {f.title}
                    </h2>
                    <Divider />
                    <p className="mt-3 text-lg text-primary lg:text-xl">
                      {f.description}
                    </p>
                    <div
                      className={clsx(
                        ' relative  mt-9 flex max-w-min  items-center p-2 transition-all ',
                        f.alignment === 'right' ? 'md:ml-auto' : 'md:mr-auto'
                      )}
                    >
                      <div
                        className={clsx(
                          ' absolute inset-0  h-12 w-12 rounded bg-gradient-to-r blur-3xl',
                          f.buttonGradient
                        )}
                      />
                      <ExternalLink href={f.href || ''}>
                        <FancyButton
                          backgroundClassName={f.buttonGradient}
                          buttonClassName={'w-48'}
                        >
                          {f.buttonText}
                        </FancyButton>
                      </ExternalLink>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
