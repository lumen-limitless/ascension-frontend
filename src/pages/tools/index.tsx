import Container from '../../components/ui/Container'
import Link from 'next/link'
import Grid from '../../components/ui/Grid'
import Section from '../../components/ui/Section'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import ReactorIcon from '../../components/icons/ReactorIcon'
import { ReactNode } from 'react'

const ToolTile = ({
  path,
  name,
  icon,
}: {
  path: string
  name: string
  icon: ReactNode
}) => {
  return (
    <>
      <Link href={path} passHref>
        <div className="mx-auto flex flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 ring ring-black drop-shadow hover:brightness-125">
          {icon}
          <span className="text-center">{name}</span>
        </div>
      </Link>
    </>
  )
}

const tools = [
  {
    name: 'Ascension Reactor',
    path: '/tools/reactor',
    icon: <ReactorIcon size={64} />,
  },
  // {
  //   name: 'Ascension Listing Sniper',
  //   path: '/tools/listing-sniper',
  //   icon: <ReactorIcon size={64} />,
  // },
]

export default function ToolsPage() {
  return (
    <>
      <NextSeo title="Tools" description={`Ascension Protocol tools`} />

      <Section className="py-36">
        <Container>
          <Grid gap={'xl'}>
            {tools &&
              tools.map((t, i) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 33 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', delay: i * 0.09 }}
                    key={i}
                    className="col-span-12 place-content-center py-3 md:py-9"
                  >
                    <ToolTile name={t.name} path={t.path} icon={t.icon} />
                  </motion.div>
                )
              })}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
