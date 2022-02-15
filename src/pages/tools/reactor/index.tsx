import Card from '../../../components/Card'
import Head from 'next/head'
import React, { useState } from 'react'
import Container from '../../../components/Container'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { getAddress, isAddress } from '@usedapp/core/node_modules/ethers/lib/utils'
import { useToast } from '../../../hooks/useToast'
import { ChainId, useEthers } from '@usedapp/core'
import Loader from '../../../components/Loader'
import BuyAscend from '../../../components/BuyAscend'
import Logo, { ReactorLogo } from '../../../components/Logo'
import OptionSelector from './OptionSelector'
import useRequiredBalance from '../../../hooks/useRequiredBalance'
import Reactor from './Reactor'

export interface ReactorOptions {
  set: boolean
  abi: any
  event: string
  function: string
  args: any[]
}

const REQUIRED_AMOUNT = 10
const supportedChainId = [ChainId.Arbitrum, ChainId.Polygon, ChainId.BSC, ChainId.Mainnet]

export default function ReactorPage() {
  const { account, chainId } = useEthers()
  const [address, setAddress] = useState<string>('')
  const [options, setOptions] = useState<ReactorOptions>({
    set: false,
    abi: {},
    event: '',
    function: '',
    args: [],
  })
  const [input, setInput] = useState<string>('')
  const toast = useToast()
  const pass = useRequiredBalance(account, REQUIRED_AMOUNT)

  if (!account || !chainId) return <Loader message="Loading chain data" />
  if (!pass) return <BuyAscend amount={REQUIRED_AMOUNT} />
  if (!supportedChainId.includes(chainId)) return <Loader message="Chain ID not supported!" />
  return (
    <>
      <Head>
        <title>Ascension Reactor | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol reactor" />
      </Head>
      <Container maxWidth="5xl">
        <Card
          header={
            <div className="flex flex-col items-center justify-center p-3">
              <ReactorLogo />
            </div>
          }
        >
          {!address && (
            <div className="flex flex-col gap-3">
              <h1>Enter a verified contract address</h1>
              <Input.Address
                value={input}
                onUserInput={(input) => {
                  setInput(input)
                }}
              ></Input.Address>
              <Button
                color="blue"
                disabled={isAddress(input) ? false : true}
                onClick={() => {
                  if (!isAddress(input)) {
                    toast('error', 'Input is not a valid address!')
                    return
                  }
                  setAddress(getAddress(input))
                  setInput('')
                }}
              >
                Search
              </Button>
            </div>
          )}

          {address && !options.set && <OptionSelector contract={address} chainId={chainId} setOptions={setOptions} />}
          {address && options.set && <Reactor address={address} options={options} chainId={chainId} />}
        </Card>
      </Container>
    </>
  )
}
