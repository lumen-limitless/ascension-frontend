import Card from '../../components/ui/Card'
import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'
import Link from 'next/link'
import Logo from '../../components/ui/Logo'
import Grid from '../../components/ui/Grid'
import Section from '../../components/ui/Section'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'

const ToolTile = ({ path, name }: { path: string; name: string }) => {
  return (
    <Card>
      <Card.Header>
        {' '}
        <div className="flex place-content-center py-3">
          <Logo size={32} />
        </div>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col  gap-3">
          <h1 className="text-center text-xl">{name}</h1>
          <div className="flex place-content-center">
            {' '}
            <Link href={path} passHref>
              <Button color="blue">Launch</Button>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

const tools = [
  { name: 'Ascension Reactor', path: '/tools/reactor' },
  { name: 'Ascension BatchSender', path: '/tools/batchsender' },
  // { name: 'Ascension Mercury', path: '/tools/mercury' },
  // { name: 'Ascension Supernova', path: '/tools/supernova' },
]

export default function ToolsPage() {
  return (
    <>
      <NextSeo title="Tools" description={`Ascension Protocol tools`} />

      <Section className="py-12">
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
                    className="col-span-12 md:col-span-6 "
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
