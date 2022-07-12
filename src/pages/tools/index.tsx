import Head from 'next/head'
import Card from '../../components/ui/Card'
import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'
import Link from 'next/link'
import Logo from '../../components/ui/Logo'
import Grid from '../../components/ui/Grid'
import Section from '../../components/ui/Section'
import { motion } from 'framer-motion'
import { VFC } from 'react'
import { NextSeo } from 'next-seo'

const ToolTile: VFC<{ path: string; name: string }> = ({ path, name }) => {
  return (
    <Card
      header={
        <div className="flex place-content-center py-3">
          <Logo size={32} />
        </div>
      }
    >
      <div className="flex flex-col  gap-3">
        <h1 className="text-center text-xl">{name}</h1>
        <div className="flex place-content-center">
          {' '}
          <Link href={path}>
            <a>
              <Button color="blue">Launch</Button>
            </a>
          </Link>
        </div>
      </div>
    </Card>
  )
}

const tools = [{ name: 'Ascension Reactor', path: '/tools/reactor' }]
export default function ToolsPage() {
  return (
    <>
      <NextSeo title="Tools" description={`Ascension Protocol tools`} />

      <Section fullscreen padding="md" layout="start">
        <Container maxWidth="5xl">
          <Grid gap={'md'}>
            {tools &&
              tools.map((t, i) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 33 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', delay: i * 0.09 }}
                    key={i}
                    className="col-span-12  "
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
