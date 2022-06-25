import { NextPage } from 'next'
import Container from '../../components/ui/Container'
import Head from 'next/head'
import Section from '../../components/ui/Section'
import Dashboard from '../../components/Dashboard'

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol Dashboard" />
      </Head>
      <Section fullscreen padding="md">
        <Container maxWidth="7xl">
          <Dashboard />
        </Container>
      </Section>
    </>
  )
}

export default DashboardPage
