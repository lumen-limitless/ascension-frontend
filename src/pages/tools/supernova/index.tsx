import { DownloadIcon } from '@heroicons/react/outline'
import { useEthers } from '@usedapp/core'
import { NextPage } from 'next'
import Head from 'next/head'

import Card from '../../../components/ui/Card'
import Container from '../../../components/ui/Container'
import Section from '../../../components/ui/Section'
import Typography from '../../../components/ui/Typography'

const SupernovaPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ascension Supernova | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol mempool sniper" />
      </Head>
      <Section layout="start" padding="md">
        <Container maxWidth="xl">
          <Card>
            <Typography as="h1">COMING SOON</Typography>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default SupernovaPage
