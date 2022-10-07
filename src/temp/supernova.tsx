import { DownloadIcon } from '@heroicons/react/outline'
import { useEthers } from '@usedapp/core'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Typography from '../components/ui/Typography'

const SupernovaPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Supernova" description={`Ascension Protocol supernova`} />

      <Section layout="start" padding="md">
        <Container>
          <Card>
            <Typography as="h1">COMING SOON</Typography>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default SupernovaPage
