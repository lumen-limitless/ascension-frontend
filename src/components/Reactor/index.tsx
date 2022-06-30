import { FC, useCallback, useEffect, useState } from 'react'
import { shortenIfAddress, Songbird, useContractFunction, useEthers } from '@usedapp/core'
import { useMemo } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Divider from '../ui/Divider'
import Grid from '../ui/Grid'
import Input from '../ui/Input'
import { SCAN_INFO } from '../../constants'
import { useContract, useToast } from '../../hooks'
import Loader from '../ui/Loader'
import { isAddress } from 'ethers/lib/utils'
import Tabs from '../ui/Tabs'
import { Icon } from '@iconify/react'
import ExternalLink from '../ui/ExternalLink'
import Typography from '../ui/Typography'
import shallow from 'zustand/shallow'
import useStore from '../../store/useStore'
import ReactorIcon from '../icons/ReactorIcon'
import { useList } from 'react-use'
import EventMonitor from './EventMonitor'
import FlexibleInput from './FlexibleInput'
import { EventFilter } from 'ethers'
import Toggle from '../ui/Toggle'
import { XCircleIcon } from '@heroicons/react/outline'
import { ContractEvent, ContractFunction } from '../../types'
import Motion from '../../animations/Motion'

const Reactor: FC = () => {
  const t = useToast()
  const { chainId } = useEthers()

  const { address, eventIndex, functionIndex, reactionActive, contractABI } = useStore(
    (state) => ({
      address: state.address,
      eventIndex: state.eventIndex,
      functionIndex: state.functionIndex,
      reactionActive: state.reactionActive,
      contractABI: state.contractABI,
    }),
    shallow
  )

  const [setAddress, reset, setEventIndex, setFunctionIndex, setReaction, fetchContractABI] =
    useStore(
      (state) => [
        state.setAddress,
        state.reset,
        state.setEventIndex,
        state.setFunctionIndex,
        state.setReaction,
        state.fetchContractABI,
      ],
      shallow
    )

  const { events, selectedEvent } = useMemo(() => {
    if (!contractABI) return { events: null, selectedEvent: null }
    const events = contractABI.filter((value) => value.type === 'event')
    if (events.length === 0) return { events: null, selectedEvent: null }
    return { events: events as ContractEvent[], selectedEvent: events[eventIndex] as ContractEvent }
  }, [contractABI, eventIndex])

  const { functions, selectedFunction } = useMemo(() => {
    if (!contractABI) return { functions: null, selectedFunction: null }
    const functions = contractABI.filter(
      (value) =>
        value.type === 'function' && value.stateMutability !== 'view' && value.constant !== true
    )
    if (functions.length === 0) return { functions: null, selectedFunction: null }
    return {
      functions: functions as ContractFunction[],
      selectedFunction: functions[functionIndex] as ContractFunction,
    }
  }, [contractABI, functionIndex])

  const [eventArgs, { updateAt: updateEventArgsAt, reset: resetEventArgs, set: setEventArgs }] =
    useList([])

  const [
    functionArgs,
    { updateAt: updateFunctionArgsAt, reset: resetFunctionArgs, set: setFunctionArgs },
  ] = useList([])

  const contract = useContract(address, contractABI, chainId)

  const { state, send, resetState } = useContractFunction(contract, selectedFunction?.name)

  const filter = useMemo(() => {
    if (!contract) return null
    if (!selectedEvent) return null
    let filter: string | EventFilter

    try {
      filter = contract.filters[selectedEvent?.name](...eventArgs)
    } catch (err) {
      console.error(err)
      filter = selectedEvent.name
    }
    return filter
  }, [contract, eventArgs, selectedEvent])

  const startListener = useCallback(() => {
    contract.once(filter, (tx) => {
      console.log(tx)
      send(...functionArgs).then(() => {
        state.status === 'Success'
          ? t('success', 'Transaction succeeded')
          : t('error', 'Transaction failed')
        setReaction(false)
        resetState()
      })
    })
  }, [filter, functionArgs, state, contract, resetState, t, send, setReaction])

  useEffect(() => {
    if (!reactionActive || !contract || !filter) {
      return
    }

    if (state.status === 'None') {
      return
    }
    if (state.status === 'Exception') {
      t('error', 'Transaction exception occurred')
      resetState()
      setReaction(false)
      contract.removeAllListeners()
      return
    }

    if (state.status === 'PendingSignature') {
      t('info', 'Confirm transaction in wallet')
      contract.removeAllListeners()
      return
    }

    return function cleanup() {
      contract.removeAllListeners()
    }
  }, [reactionActive, filter, state, contract, functionArgs, resetState, setReaction, t])

  return (
    <Grid gap="md">
      <div className="col-span-12">
        <Motion variant="fadeIn">
          <Card>
            {!contractABI ? (
              <div className="flex flex-col items-center gap-3 ">
                <div>
                  <Typography centered as="h2" variant="lg">
                    Enter Contract Address
                  </Typography>
                  <Divider />
                </div>
                <Input.Address
                  required
                  placeholder="Contract Address"
                  value={address}
                  onUserInput={(input) => setAddress(input)}
                ></Input.Address>
                <Button
                  disabled={!isAddress(address)}
                  onClick={() =>
                    fetchContractABI(
                      `https://api.${SCAN_INFO[chainId]?.name}/api?module=contract&action=getabi&address=${address}&apikey=${SCAN_INFO[chainId]?.apiKey}`
                    )
                  }
                  color="green"
                >
                  Get Contract
                </Button>
              </div>
            ) : (
              <div className="flex w-full items-center justify-center gap-3">
                <ExternalLink href={`https://${SCAN_INFO[chainId].name}/address/${address}`}>
                  <Button color="blue">
                    <Icon icon="fa-solid:file-contract" height={24} />
                    <Typography as="span">{shortenIfAddress(address)}</Typography>
                  </Button>
                </ExternalLink>
                <div>
                  <Button color="yellow" onClick={() => reset()}>
                    <Icon icon="ic:baseline-change-circle" height={24} />
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </Card>{' '}
        </Motion>
      </div>

      <div className="col-span-12 md:col-span-7">
        {contractABI && (
          <Motion variant="fadeIn">
            <Card>
              {contractABI.length === 0 ? (
                <Loader size={48} message="Failed to find contract abi" />
              ) : (
                <Grid gap="sm">
                  {reactionActive ? (
                    <>
                      <div className="col-span-12 flex flex-col items-center justify-center">
                        <ReactorIcon size={100} className="animate-pulse" />
                        <Typography as="h2">Reactor Active</Typography>
                        <Typography as="strong">Transaction Status: {state.status}</Typography>
                        <Button
                          color="red"
                          onClick={() => {
                            setReaction(!reactionActive)
                            contract.removeAllListeners()
                            resetState()
                          }}
                        >
                          <XCircleIcon height={24} />
                          Cancel Reaction
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {!selectedEvent ? (
                        <Typography as="h2" centered className="col-span-12">
                          NO EVENTS FOUND
                        </Typography>
                      ) : !selectedFunction ? (
                        <Typography as="h2" centered className="col-span-12">
                          NO FUNCTIONS FOUND
                        </Typography>
                      ) : (
                        <>
                          <div className="col-span-12 flex w-full flex-col gap-3" id="events">
                            <div>
                              <Typography centered as="h2" variant="lg">
                                Choose Event to listen for:
                              </Typography>
                              <Divider />
                            </div>
                            <Tabs
                              selectedIndex={eventIndex}
                              onTabChange={(i) => {
                                setEventIndex(i)
                                resetEventArgs()
                              }}
                              options={events.map((event) => {
                                return `${event.name}`
                              })}
                            />
                            {selectedEvent.inputs
                              .filter((eventInput) => eventInput.indexed === true)
                              .map((input, i) => (
                                <div key={i} className="rounded bg-dark-900 p-3">
                                  <Typography>{input.name}</Typography>

                                  {/* TYPE CONVERSION FOR EVENT ARGS IS REQUIRED (NOT STRICT EQUALITY/INEQUALITY) */}
                                  {eventArgs[i] != null && (
                                    <FlexibleInput
                                      inputType={input.type}
                                      inputIndex={i}
                                      inputValue={eventArgs[i]}
                                      onUserInput={(input) => updateEventArgsAt(i, input)}
                                      onToggle={() => updateEventArgsAt(i, !eventArgs[i])}
                                    />
                                  )}
                                  <div className="flex ">
                                    <Typography as="span">Any</Typography>{' '}
                                    <Toggle
                                      isActive={eventArgs[i] == null} //type conversion required
                                      onToggle={
                                        () => updateEventArgsAt(i, eventArgs[i] != null ? null : '') //type conversion required
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>

                          <div className="col-span-12 flex w-full flex-col gap-3" id="functions">
                            <div>
                              <Typography centered as="h2" variant="lg">
                                Choose Function to call:
                              </Typography>
                              <Divider />
                            </div>

                            <Tabs
                              selectedIndex={functionIndex}
                              options={functions.map((f) => {
                                return f.name
                              })}
                              onTabChange={(i) => {
                                setFunctionIndex(i)
                                resetFunctionArgs()
                              }}
                            />

                            {selectedFunction.inputs.map((input, i) => (
                              <div key={i} className="rounded bg-dark-900 p-3">
                                <Typography>{input.name}</Typography>

                                <FlexibleInput
                                  inputType={input.type}
                                  inputIndex={i}
                                  inputValue={functionArgs[i]}
                                  onUserInput={(input) => updateFunctionArgsAt(i, input)}
                                  onToggle={() => updateFunctionArgsAt(i, !functionArgs[i])}
                                />
                              </div>
                            ))}

                            <div className="col-span-12 place-self-center">
                              {' '}
                              <Button
                                color="gradient"
                                onClick={() => {
                                  setReaction(true)
                                  startListener()
                                }}
                                disabled={
                                  functionArgs.length !== selectedFunction.inputs.length ||
                                  functionArgs.includes('')
                                }
                              >
                                <Icon icon="clarity:atom-solid" height={24} />
                                Start Reaction
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Grid>
              )}
            </Card>
          </Motion>
        )}
      </div>
      <div className="col-span-12 md:col-span-5 ">
        {contractABI && selectedEvent && (
          <EventMonitor contract={contract} event={selectedEvent} setEventArgs={setEventArgs} />
        )}
      </div>
    </Grid>
  )
}
export default Reactor
