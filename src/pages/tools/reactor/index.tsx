import { LoginIcon } from '@heroicons/react/outline'
import { ChainId, useEthers } from '@usedapp/core'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import BuyAscend from '../../../components/BuyAscend'
import Button from '../../../components/ui/Button'
import Container from '../../../components/ui/Container'
import Loader from '../../../components/ui/Loader'
import Section from '../../../components/ui/Section'
import UnsupportedChainId from '../../../components/UnsupportedChainId'
import { useRequiredBalance } from '../../../hooks'
import useStore from '../../../store/useStore'

const Reactor = dynamic(() => import('../../../components/Reactor'), { ssr: false })

const REQUIRED_BALANCE = 100
const SUPPORTED_CHAINIDS = [ChainId.Arbitrum, ChainId.Mainnet, ChainId.BSC, ChainId.Polygon]
const ReactorPage: NextPage = () => {
  const { account, chainId } = useEthers()
  const pass = useRequiredBalance(account, REQUIRED_BALANCE)
  const setModalView = useStore((state) => state.setModalView)
  return (
    <>
      <Head>
        <title>Reactor | Ascension Protocol</title>
        <meta
          key="description"
          name="description"
          content="Ascension Reactor allows you to instantly react to blockchain events and automate transaction execution"
        />
      </Head>
      <Section fullscreen layout="start" padding="md">
        <Container maxWidth="7xl">
          {!account ? (
            <div className="flex w-full justify-center">
              <Button color="blue" onClick={() => setModalView('connect')}>
                <LoginIcon height={24} /> Connect Wallet
              </Button>
            </div>
          ) : !pass ? (
            <> {pass === null ? <Loader /> : <BuyAscend amount={REQUIRED_BALANCE} />}</>
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
