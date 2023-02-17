import Container from './ui/Container'
import Section from './ui/Section'
import { motion } from 'framer-motion'
import ExternalLink from './ui/ExternalLink'
import GMXIcon from './icons/GMXIcon'
import FrensIcon from './icons/FrensIcon'
import CryptoJinglesIcon from './icons/CryptoJinglesIcon'
import L2DAOIcon from './icons/L2DAOIcon'
export default function Partners({}: {}) {
  return (
    <>
      <Section id="partners" className="bg-purple-900 py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 1 }}
            className="w-full py-6 text-center lg:py-9"
          >
            <h3 className="text-5xl font-bold text-primary md:text-6xl lg:text-7xl">
              Our Partners
            </h3>
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
              <ExternalLink href="https://factor.fi/">
                <img src={'partners/factor.svg'} alt="" className="h-24" />
              </ExternalLink>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
