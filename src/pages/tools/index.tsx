import Card from '../../components/ui/Card'
import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'
import Link from 'next/link'
import Grid from '../../components/ui/Grid'
import Section from '../../components/ui/Section'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import ReactorIcon from '../../components/icons/ReactorIcon'

const ToolTile = ({ path, name }: { path: string; name: string }) => {
  return (
    <>
      <Link href={path} passHref>
        <div className="flex flex-col gap-3 items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 ring ring-black shadow hover:brightness-125 rounded-xl max-w-max mx-auto">
          <ReactorIcon size={64} />
          <span className="text-center">{name}</span>
        </div>
      </Link>
    </>
  )
}

const tools = [{ name: 'Ascension Reactor', path: '/tools/reactor' }]

export default function ToolsPage() {
  return (
    <>
      <NextSeo title="Tools" description={`Ascension Protocol tools`} />

      <Section className="py-24">
        <Container>
          <Grid gap={'md'}>
            {tools &&
              tools.map((t, i) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 33 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', delay: i * 0.09 }}
                    key={i}
                    className="col-span-12 place-content-center"
                  >
                    <ToolTile name={t.name} path={t.path} />
                  </motion.div>
                )
              })}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
