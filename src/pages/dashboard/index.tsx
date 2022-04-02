import { NextPage } from 'next'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Stat from '../../components/Stat'

const DashboardPage: NextPage = () => {
  return (
    <>
      <Container maxWidth="7xl">
        <div></div>
        <Stat stats={[{}, {}, {}, {}, {}, {}]}></Stat>
      </Container>
      <Card></Card>
    </>
  )
}

export default DashboardPage
