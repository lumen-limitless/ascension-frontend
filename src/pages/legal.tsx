import { NextPage } from 'next'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import Logo from '../components/ui/Logo'

const LegalPage: NextPage = () => {
  return (
    <Container maxWidth="5xl">
      <Card
        title="Legal Disclaimer"
        header={
          <div className="mt-3 flex place-content-center">
            <Logo size={32} />
          </div>
        }
      >
        The information provided on this website does not constitute investment advice, financial
        advice, trading advice, or any other sort of advice and you should not treat any of the
        website&apos;s content as such.
        <br></br>
        <br></br>
        Trading cryptocurrencies carries a high level of risk, and may not be suitable for all
        investors. Before deciding to trade cryptocurrency you should carefully consider your
        investment objectives, level of experience, and risk appetite. The possibility exists that
        you could sustain a loss of some or all of your initial investment and therefore you should
        only invest money that you can afford to lose.
        <br></br>
        <br></br>
        By purchasing or interacting with this software in any form, you agree that Ascension
        Protocol, the Ascension Group developer team, and the Ascension DAO do not guarantee any
        financial gains and therefore cannot be held liable for any resulting financial losses.
        Ascension Protocol is experimental, open-source technology provided as is under the MIT
        license. Please do your own research before investing and only invest what you can afford to
        lose.
      </Card>
    </Container>
  )
}

export default LegalPage
