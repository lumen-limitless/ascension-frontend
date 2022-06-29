import Head from 'next/head'
import Card from '../../components/ui/Card'
import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'
import Link from 'next/link'
import Logo from '../../components/ui/Logo'
import Grid from '../../components/ui/Grid'
import Section from '../../components/ui/Section'
import Motion from '../../animations/Motion'

const ToolTile = ({ path, name, delay }: { path: string; name: string; delay: number }) => {
  return (
    <Motion variant="fadeUp" delay={delay}>
      <Card
        header={
          <div className="flex place-content-center pt-3">
            <Logo size={32} />
          </div>
        }
      >
        <div className="flex flex-col  gap-3">
          <h1 className="text-center text-xl">{name}</h1>
          <div className="flex place-content-center">
            {' '}
            <Link href={path} passHref={true}>
              <Button color="blue">Launch</Button>
            </Link>
          </div>
        </div>
      </Card>
    </Motion>
  )
}

const tools = [{ name: 'Ascension Reactor', path: '/tools/reactor' }]
export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>Tools | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol tools" />
      </Head>
      <Section fullscreen padding="md" layout="start">
        <Container maxWidth="5xl">
          <Grid gap={'md'}>
            {tools &&
              tools.map((t, i) => {
                return (
                  <div key={i} className="col-span-12 md:col-span-6 ">
                    <ToolTile name={t.name} path={t.path} delay={0.16 * (i + 1)} />
                  </div>
                )
              })}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
