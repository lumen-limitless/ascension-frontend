import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Typography from '../components/ui/Typography'

const SupernovaPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Supernova" description={`Ascension Protocol supernova`} />

      <Section>
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
