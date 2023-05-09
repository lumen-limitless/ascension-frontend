import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import { m } from 'framer-motion'
import ExternalLink from '../../components/ui/ExternalLink'
import FactorSVG from 'public/assets/factor.svg'
import GMXSVG from 'public/assets/GMX.svg'
import FrensSVG from 'public/assets/frens.svg'
import CryptoJinglesSVG from 'public/assets/cryptojingles.svg'
import L2DAOSVG from 'public/assets/l2dao.svg'
export default function Partners() {
  return (
    <>
      <Section id="partners" className="bg-purple-900 py-32">
        <Container>
          <m.div
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
                <GMXSVG className="h-16 md:h-24 lg:h-32 " />
              </ExternalLink>
              <ExternalLink href="https://frens.ventures/">
                <FrensSVG className="h-16 md:h-24 lg:h-32 " />
              </ExternalLink>
              <ExternalLink href="">
                <CryptoJinglesSVG className="h-16 md:h-24 lg:h-32 " />
              </ExternalLink>
              <ExternalLink href="https://www.layer2dao.org/#/">
                <L2DAOSVG className="h-16 md:h-24 lg:h-32 " />
              </ExternalLink>
              <ExternalLink href="https://factor.fi/">
                <FactorSVG className="h-16 md:h-24 lg:h-32 " />
              </ExternalLink>
            </div>
          </m.div>
        </Container>
      </Section>
    </>
  )
}
