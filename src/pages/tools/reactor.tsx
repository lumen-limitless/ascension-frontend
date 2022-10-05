import { LoginIcon } from '@heroicons/react/outline'
import { ChainId, useEthers } from '@usedapp/core'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import BuyAscend from '../../components/BuyAscend'
import Reactor from '../../components/Reactor'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Loader from '../../components/ui/Loader'
import Section from '../../components/ui/Section'
import UnsupportedChainId from '../../components/UnsupportedChainId'
import { useRequiredBalance, useUI } from '../../hooks'

const Connect = dynamic(() => import('../../components/Connect'), {
  ssr: false,
})

const REQUIRED_BALANCE = 10
const SUPPORTED_CHAINIDS = [
  ChainId.Arbitrum,
  ChainId.Mainnet,
  ChainId.BSC,
  ChainId.Polygon,
]
const ReactorPage: NextPage = () => {
  const { account, chainId } = useEthers()
  const pass = useRequiredBalance(account, REQUIRED_BALANCE)
  const { setModalView } = useUI()
  return (
    <>
      <NextSeo title="Reactor" description={`Ascension Protocol reactor`} />

      <Section fullscreen layout="start" padding="md">
        <Container>
          {!account ? (
            <div className="flex w-full justify-center">
              <Button color="blue" onClick={() => setModalView(<Connect />)}>
                <LoginIcon height={24} /> Connect Wallet
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
