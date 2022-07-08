import { NextPage } from 'next'
import Section from '../components/ui/Section'
import Typography from '../components/ui/Typography'

const Custom404Page: NextPage = () => {
  return (
    <Section fullscreen>
      <Typography as="h1">404 - Page Not Found</Typography>{' '}
    </Section>
  )
}

export default Custom404Page
