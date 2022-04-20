import Head from 'next/head'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Button from '../../components/Button'
import Link from 'next/link'
import Logo, { ReactorLogo } from '../../components/Logo'

const ToolTile = ({ path, name }: { path: string; name: string }) => {
  return (
    <Card
      header={
        <div className="flex place-content-center pt-3">
          <Logo />
        </div>
      }
    >
      <div className="flex flex-col  gap-3">
        <h1 className="text-center text-xl">{name}</h1>
        <div className="flex place-content-center">
          {' '}
          <Link href={path} passHref={true}>
            <Button color="blue" variant="outlined">
              Launch
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

const tools = [
  // { name: 'Universal Swap', path: '/tools/universalswap' },
  // { name: 'Batch Sender', path: '/tools/batchsender' },
  { name: 'Mempool sniper', path: '/tools/mempoolsniper' },
]
export default function ToolsPage() {
  return (
    <Container maxWidth="2xl">
      <Head>
        <title>Tools | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol tools" />
      </Head>
      <div className="grid grid-cols-1 justify-between gap-9 ">
        {tools.map((t, i) => {
          return <ToolTile key={i} name={t.name} path={t.path} />
        })}
      </div>
    </Container>
  )
}
