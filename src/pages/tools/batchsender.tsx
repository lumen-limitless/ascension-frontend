import { useEthers } from '@usedapp/core'
import { NextSeo } from 'next-seo'
import { list } from 'postcss'
import { useState } from 'react'
import { useBoolean, useSessionStorage } from 'react-use'
import BuyAscend from '../../components/BuyAscend'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Container from '../../components/ui/Container'
import Dropdown from '../../components/ui/Drowdown'
import Input from '../../components/ui/Input'
import Loader from '../../components/ui/Loader'
import Section from '../../components/ui/Section'
import { useRequiredBalance, useUI } from '../../hooks'
import { VIEW } from '../../store/createUISlice'

export default function BatchSenderPage() {
  const { account } = useEthers()
  const { setModalView } = useUI()
  const [isReviewing, toggleReviewing] = useBoolean(false)
  const [listInput, setListInput] = useSessionStorage('batchSenderList', [])
  const pass = useRequiredBalance(account, 1)
  console.log(listInput)
  return (
    <>
      <NextSeo
        title="Batch Sender"
        description={`Ascension Protocol batch sender`}
      />

      <Section className="py-12">
        <Container>
          {!account ? (
            <div className="flex w-full justify-center">
              <Button color="blue" onClick={() => setModalView(VIEW.CONNECT)}>
                Connect Wallet
              </Button>
            </div>
          ) : pass === false ? (
            <BuyAscend amount={1} />
          ) : !pass ? (
            <Loader message="Loading..." />
          ) : (
            <Card>
              <Card.Header>Ascension BatchSender</Card.Header>
              <Card.Body>
                <div className="h-32"></div>
                <div className="flex">
                  <Dropdown
                    title="Token type"
                    options={['ERC20', 'ERC721', 'ERC1155', 'NATIVE']}
                    onSelect={() => {
                      return
                    }}
                  />
                </div>
                <div className="flex flex-col items-center gap-9">
                  <div className="w-full space-y-3">
                    <h2>Enter batch to send(one per line):</h2>
                    <textarea
                      value={listInput}
                      className="w-full rounded border-purple bg-transparent "
                      placeholder="itemType;tokenAddress;to;amount;id"
                      onInput={(e) => console.log(e)}
                    />
                  </div>
                  <span className="text-xl">OR</span>
                  <Button color="green">Upload CSV</Button>

                  <Button
                    color="blue"
                    onClick={() => {
                      toggleReviewing()
                    }}
                  >
                    Review Transaction
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Container>
      </Section>
    </>
  )
}
