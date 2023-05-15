import FancyButton from '@/components/FancyButton'
import Container from '@/components/ui/container'
import Section from '@/components/ui/Section'
import { m } from 'framer-motion'
import GovernanceSVG from 'public/assets/governance.svg'
import ToolsSVG from 'public/assets/tools.svg'
import RewardsSVG from 'public/assets/rewards.svg'
import ExternalLink from '@/components/ui/ExternalLink'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const features = [
  {
    alignment: 'left',
    icon: <ToolsSVG className="h-64" />,
    title: 'Tools',
    href: '/tools',
    buttonText: 'View Tools',
    buttonGradient: 'from-pink to-orange',
    description:
      'Our ecosystem incorporates a variety of bots and automated processes to take advantage of market opportunities. These tools utilize decentralized protocols to eliminate the risk of downtime and centralization.',
  },
  {
    alignment: 'right',
    icon: <GovernanceSVG className="h-64" />,
    title: 'Governance',
    href: 'https://vote.ascensionprotocol.io',
    buttonText: 'View Governance',
    buttonGradient: 'from-orange to-yellow',
    description:
      'Token holders can interact with the protocol directly via our snapshot governance platform. A modular smart contract system allows for safe and restricted access to treasury funds, preventing bad actors from abusing the system.',
  },
  {
    alignment: 'left',
    icon: <RewardsSVG className="h-64" />,
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
              <m.div
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
                  className={cn(
                    'flex flex-col items-start gap-9 px-3 py-12 md:items-center',
                    f.alignment === 'right'
                      ? 'md:flex-row-reverse'
                      : 'md:flex-row'
                  )}
                >
                  <div>{f.icon}</div>
                  <div
                    className={cn(f.alignment === 'right' && 'md:text-right')}
                  >
                    <h2 className="pb-3 text-5xl font-bold leading-3  lg:pb-0  lg:text-6xl">
                      {f.title}
                    </h2>
                    <Separator className="my-4" />
                    <p className="mt-3 text-lg  lg:text-xl">{f.description}</p>
                    <div
                      className={cn(
                        ' relative  mt-9 flex max-w-min  items-center p-2 transition-all ',
                        f.alignment === 'right' ? 'md:ml-auto' : 'md:mr-auto'
                      )}
                    >
                      <div
                        className={cn(
                          ' absolute inset-0  h-12 w-12 rounded bg-gradient-to-r blur-3xl',
                          f.buttonGradient
                        )}
                      />
                      <ExternalLink href={f.href || ''}>
                        <FancyButton
                          variant="gray"
                          backgroundClassName={f.buttonGradient}
                          className={'w-48'}
                        >
                          {f.buttonText}
                        </FancyButton>
                      </ExternalLink>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
