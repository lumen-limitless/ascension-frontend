import { useEthers } from '@usedapp/core'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Container from '../../../components/ui/Container'
import Section from '../../../components/ui/Section'

const Connection = dynamic(() => import('../../../components/Connection'), {
  ssr: false,
})
const Reactor = dynamic(() => import('../../../components/Reactor'), { ssr: false })
const ReactorPage: NextPage = () => {
  const { account } = useEthers()
  return (
    <>
      <Head>
        <title>Reactor | Ascension Protocol</title>
        <meta
          key="description"
          name="description"
          content="Ascension Reactor allows you to instantly react to blockchain events and automate transaction execution"
        />
      </Head>
      <Section fullscreen layout="start" padding="md">
        <Container maxWidth="7xl">
          {!account ? (
            <div className="flex w-full justify-center">
              <Connection />
            </div>
          ) : (
            <Reactor />
          )}
        </Container>
      </Section>
    </>
  )
}

export default ReactorPage
