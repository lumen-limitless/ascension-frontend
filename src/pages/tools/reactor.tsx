import { ChainId, useEthers } from '@usedapp/core'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import BuyAscend from '../../components/BuyAscend'
import Reactor from '../../components/Reactor/Reactor'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Loader from '../../components/ui/Loader'
import Section from '../../components/ui/Section'
import UnsupportedChainId from '../../components/UnsupportedChainId'
import { useRequiredBalance, useUI } from '../../hooks'
import { VIEW } from '../../store/createUISlice'

const REQUIRED_BALANCE = 1
const SUPPORTED_CHAINIDS = [ChainId.Arbitrum, ChainId.Mainnet]
const ReactorPage: NextPage = () => {
  const { account, chainId } = useEthers()
  const pass = useRequiredBalance(account, REQUIRED_BALANCE)
  const { setModalView } = useUI()
  return (
    <>
      <NextSeo
        title="Ascension Reactor"
        description={`Ascension Reactor is a tool that allows users to interact with smart contract events through a convenient user interface. It is intended to allow users to easily execute transactions once an event is emitted from the specified contract. `}
      />

      <Section className="py-12">
        <Container>
          {!account ? (
            <div className="flex w-full justify-center">
              <Button color="blue" onClick={() => setModalView(VIEW.CONNECT)}>
                Connect Wallet
              </Button>
            </div>
          ) : !pass ? (
            <>
              {' '}
              {pass === null ? (
                <Loader />
              ) : (
                <BuyAscend amount={REQUIRED_BALANCE} />
              )}
            </>
          ) : !SUPPORTED_CHAINIDS.includes(chainId) ? (
            <UnsupportedChainId supportedChainIds={SUPPORTED_CHAINIDS} />
          ) : (
            <Reactor />
          )}
        </Container>
      </Section>
    </>
  )
}

export default ReactorPage
