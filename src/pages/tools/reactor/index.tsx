import { shortenIfAddress, TestBNB, useBlockNumber, useEthers, useLogs } from '@usedapp/core'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useBoolean, useMethods, useNumber } from 'react-use'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Container from '../../../components/ui/Container'
import Divider from '../../../components/ui/Divider'
import Grid from '../../../components/ui/Grid'
import Input from '../../../components/ui/Input'
import Modal from '../../../components/ui/Modal'
import Section from '../../../components/ui/Section'
import { SCAN_INFO } from '../../../constants'
import { useContract, useVerifiedContractABI } from '../../../hooks'
import _ from 'lodash'
import { NextPage } from 'next'
import Loader from '../../../components/ui/Loader'
import FadeUp from '../../../animations/fadeUp'
import { formatUnits, isAddress } from 'ethers/lib/utils'
import Tabs from '../../../components/ui/Tabs'
import { CubeTransparentIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Icon } from '@iconify/react'
import ExternalLink from '../../../components/ui/ExternalLink'
import Typography from '../../../components/ui/Typography'

interface ReactorState {
  address: string
  input: string
  settingAddress: boolean
  eventIndex: number
}
const initialState: ReactorState = {
  address: '',
  input: '',
  settingAddress: true,
  eventIndex: 0,
}

function createMethods(state: ReactorState) {
  return {
    reset() {
      return initialState
    },
    toggleSettingAddress(bool: boolean) {
      return { ...state, settingAddress: bool }
    },
    setIndex(i: number) {
      return { ...state, eventIndex: i }
    },
    setInput(input: string) {
      return { ...state, input: input }
    },
    setAddress(newAddress: string) {
      return { ...state, address: newAddress }
    },
  }
}

const ReactorPage: NextPage = () => {
  const { chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const [
    { address, input, eventIndex, settingAddress },
    { reset, toggleSettingAddress, setIndex, setInput, setAddress },
  ] = useMethods(createMethods, initialState)

  const abi = useVerifiedContractABI(address, chainId)

  const events = useMemo(() => {
    if (!abi) return null
    return _.filter(abi, (value) => {
      return value.type === 'event'
    })
  }, [abi])

  const contract = useContract(address, abi, chainId)
  const logs = useLogs(
    contract &&
      events &&
      blockNumber && {
        contract: contract as any,
        event: events[eventIndex].name,
        args: [],
      },
    { fromBlock: blockNumber - 10 }
  )
  console.log(events)
  console.log(logs)
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
          <Grid gap="md">
            <Card className="col-span-12">
              <div className="flex w-full items-center justify-center gap-3 py-6">
                {settingAddress ? (
                  <>
                    <Input.Address
                      required
                      label="Enter contract address"
                      value={input}
                      onUserInput={(input) => setInput(input)}
                    ></Input.Address>
                    <Button
                      disabled={!isAddress(input)}
                      onClick={() => {
                        setAddress(input)
                        toggleSettingAddress(false)
                      }}
                      color="green"
                    >
                      Update
                    </Button>
                  </>
                ) : (
                  <Grid gap="sm">
                    <div className="col-span-6 md:col-span-3">
                      <ExternalLink
                        href={`https://${SCAN_INFO[chainId].name}.io/address/${address}`}
                      >
                        <Button color="blue" icon={<Icon icon="fa-solid:file-contract" />}>
                          {isAddress(address) && shortenIfAddress(address)}
                        </Button>
                      </ExternalLink>
                    </div>
                    <div className="col-span-2">
                      {' '}
                      <Button
                        color="red"
                        icon={<Icon icon="ic:baseline-change-circle" width={24} />}
                        onClick={() => reset()}
                      ></Button>
                    </div>
                    <div className="col-span-12">
                      {' '}
                      {!isAddress(address) ? (
                        <Loader />
                      ) : !abi ? (
                        <Loader />
                      ) : (
                        <Tabs
                          onTabChange={(i) => setIndex(i)}
                          options={
                            events
                              ? events.map((event) => {
                                  return `${event.name}`
                                })
                              : []
                          }
                        />
                      )}
                    </div>
                  </Grid>
                )}
              </div>
            </Card>
            <div className="col-span-12 row-span-3">
              {address && (
                <FadeUp>
                  <Card>
                    {' '}
                    {!logs ? (
                      <Loader size={48} />
                    ) : logs.error ? (
                      <Loader size={48} />
                    ) : (
                      <>
                        <h1 className="pb-3 text-center text-xl">
                          <Typography variant="h2"> {events[eventIndex].name} events</Typography>
                        </h1>
                        <Divider />

                        <div className="flex max-h-96 flex-col items-center justify-start gap-3 overflow-y-auto overflow-x-hidden py-3">
                          {_.reverse(logs.value).map((log, i) => (
                            <Card key={i} className="w-full">
                              <Grid gap="sm">
                                <div className="col-span-3">
                                  <ExternalLink
                                    href={`https://${SCAN_INFO[chainId].name}.io/block/${log.blockNumber}`}
                                  >
                                    {' '}
                                    <Button
                                      color="transparent"
                                      icon={<CubeTransparentIcon width={24} />}
                                    >
                                      {log.blockNumber}
                                    </Button>
                                  </ExternalLink>
                                </div>
                                <div className="col-span-2">
                                  <ExternalLink
                                    href={`https://${SCAN_INFO[chainId].name}.io/tx/${log.transactionHash}`}
                                  >
                                    <Button
                                      color="blue"
                                      icon={<Icon icon="icon-park-solid:transaction" width={24} />}
                                    >
                                      TX
                                    </Button>
                                  </ExternalLink>
                                </div>
                                <div className="col-span-2">
                                  <Button color="green" icon={<PlusCircleIcon width={24} />}>
                                    Filter
                                  </Button>
                                </div>
                                <div className="col-span-4">
                                  <Button
                                    color="gradient"
                                    icon={<Icon icon="clarity:atom-solid" width={24} />}
                                  >
                                    Add Reaction
                                  </Button>
                                </div>
                                <div className="col-span-12 flex w-full gap-3 overflow-x-scroll">
                                  {events &&
                                    log.data.map((d, i) => (
                                      <div className="flex rounded bg-dark-700" key={i}>
                                        <div className=" p-3">
                                          {events[eventIndex].inputs[i].name}
                                        </div>

                                        <div className="rounded-r bg-dark-900 p-3">
                                          {events[eventIndex].inputs[i].type === 'address'
                                            ? shortenIfAddress(d)
                                            : events[eventIndex].inputs[i].type === 'uint256'
                                            ? formatUnits(d)
                                            : d.toString()}
                                        </div>
                                      </div>
                                    ))}
                                </div>{' '}
                              </Grid>
                            </Card>
                          ))}
                        </div>
                      </>
                    )}
                  </Card>
                </FadeUp>
              )}
            </div>
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default ReactorPage
