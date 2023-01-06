import { Arbitrum, ChainId, useEthers } from '@usedapp/core'
import { NextSeo } from 'next-seo'
import BuyAscend from '../components/BuyAscend'
import Container from '../components/ui/Container'
import Loader from '../components/ui/Loader'
import Section from '../components/ui/Section'
import UnsupportedChainId from '../components/UnsupportedChainId'
import { useRequiredBalance } from '../hooks'

export default function ToolLayout({
  requiredBalance = 0,
  supportedNetworks = [Arbitrum.chainId],
  title = '',
  description = '',
  children,
}: {
  requiredBalance?: number
  supportedNetworks?: ChainId[]
  title?: string
  description?: string
  children?: React.ReactNode
}) {
  const { account, chainId } = useEthers()
  const pass = useRequiredBalance(account, requiredBalance)
  return (
    <>
      <NextSeo title={title} description={description} />

      <Section className="py-24">
        <Container>
          {!account ? (
            <Loader message="Connect a wallet to continue" />
          ) : pass === false ? (
            <BuyAscend amount={requiredBalance} />
          ) : pass == null ? (
            <Loader message="Loading" />
          ) : !supportedNetworks.includes(chainId) ? (
            <UnsupportedChainId supportedChainIds={supportedNetworks} />
          ) : (
            children
          )}
        </Container>
      </Section>
    </>
  )
}
