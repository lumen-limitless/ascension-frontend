import { NextPage } from 'next'
import Card from '../../components/Card'
import Container from '../../components/Container'

const LegalPage: NextPage = () => {
  return (
    <Container maxWidth="4xl">
      <Card title="Disclaimer">
        <p className="text-secondary">
          The information provided on this website does not constitute investment advice, financial advice, trading
          advice, or any other sort of advice and you should not treat any of our content or communications as such.
          Trading cryptocurrencies carries a high level of risk, and may not be suitable for all investors. Before
          deciding to trade cryptocurrency you should carefully consider your investment objectives, level of
          experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your
          initial investment and therefore you should only invest money that you can afford to lose. By purchasing, you
          agree that neither Ascension Protocol DAO nor the Ascension Group team guarantee any financial gains and
          therefore cannot be held liable for any financial losses. Ascension Protocol is experimental software provided
          as is under the MIT license. Please do your own research before investing and only invest what you can afford
          to lose.
        </p>
      </Card>
    </Container>
  )
}

export default LegalPage
