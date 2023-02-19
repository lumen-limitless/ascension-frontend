import Container from '../../components/ui/Container'
import Link from 'next/link'
import Grid from '../../components/ui/Grid'
import Section from '../../components/ui/Section'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { ReactNode } from 'react'
import { NextPageWithLayout } from '../../types'
import AppLayout from '../../layouts/AppLayout'
import SupernovaLogo from '../../components/icons/SupernovaLogo'

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
        <div className="mx-auto flex max-w-xs flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 ring ring-black drop-shadow hover:brightness-125">
          {icon}
          <span className="text-center">{name}</span>
        </div>
      </Link>
    </>
  )
}

const tools = [
  // {
  //   name: 'Ascension Supernova',
  //   path: '/tools/supernova',
  //   icon: <SupernovaLogo className="h-32" />,
  // },
  {
    name: 'Ascension Reactor',
    path: 'https://reactor.ascensionprotocol.io',
    icon: <img src="/reactor.svg" className="h-32" alt="reactor" />,
  },
]

const ToolsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Tools" description={`Ascension Protocol tools`} />

      <Section className="py-12">
        <Container className="max-w-5xl">
          <Grid>
            {tools &&
              tools.map((t, i) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 33 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', delay: i * 0.09 }}
                    key={i}
                    className="col-span-12 place-content-center py-3 md:col-span-12 md:py-9"
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

ToolsPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>
}

export default ToolsPage
