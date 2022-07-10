import { NextPage } from 'next'
import Container from '../../components/ui/Container'
import Head from 'next/head'
import Section from '../../components/ui/Section'
import Dashboard from '../../components/Dashboard'
import { NextSeo } from 'next-seo'
const DashboardPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title={`Dashboard | Ascension Protocol`}
        description={`Ascension Protocol dashboard.`}
      />

      <Section fullscreen padding="md">
        <Container maxWidth="7xl">
          <Dashboard />
        </Container>
      </Section>
    </>
  )
}

export default DashboardPage
