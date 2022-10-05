import { useCallback, useEffect } from 'react'
import { shortenIfAddress, useContractFunction, useEthers } from '@usedapp/core'
import { useMemo } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import cn from 'clsx'
import Grid from '../ui/Grid'
import Input from '../ui/Input'
import { CHAIN_SYMBOL, SCAN_INFO } from '../../constants'
import { useContract, useToast } from '../../hooks'
import { isAddress, parseEther } from 'ethers/lib/utils'
import Tabs from '../ui/Tabs'
import Typography from '../ui/Typography'
import shallow from 'zustand/shallow'
import useStore from '../../store/useStore'
import ReactorIcon from '../icons/ReactorIcon'
import EventMonitor from './EventMonitor'
import FlexibleInput from './FlexibleInput'
import { EventFilter } from 'ethers'
import Toggle from '../ui/Toggle'
import { RefreshIcon } from '@heroicons/react/outline'
import { ContractEvent, ContractFunction } from '../../types'
import { ExclamationIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'

export default function Reactor() {
  const t = useToast()
  const { chainId } = useEthers()

  const {
    eventAddress,
    eventIndex,
    eventAbi,
    eventArgs,
    functionAddress,
    functionIndex,
    functionAbi,
    functionArgs,
    functionValue,
    reactionActive,
  } = useStore(
    (state) => ({
      eventAddress: state.event.address,
      eventIndex: state.event.index,
      eventAbi: state.event.abi,
      eventArgs: state.event.args,
      functionAddress: state.function.address,
      functionIndex: state.function.index,
      functionAbi: state.function.abi,
      functionArgs: state.function.args,
      functionValue: state.function.value,
      reactionActive: state.reactionActive,
    }),
    shallow
  )

  const [
    reset,
    clearEvent,
    clearFunction,
    setAddress,
    setIndex,
    setArgs,
    updateArgsAt,
    clearArgs,
    setValue,
    toggleReaction,
    fetchABI,
  ] = useStore(
    (state) => [
      state.reset,
      state.clearEvent,
      state.clearFunction,
      state.setAddress,
      state.setIndex,
      state.setArgs,
      state.updateArgsAt,
      state.clearArgs,
      state.setValue,
      state.toggleReaction,
      state.fetchABI,
    ],
    shallow
  )

  const { events, selectedEvent } = useMemo(() => {
    if (!eventAbi) return { events: null, selectedEvent: null }
    const events = eventAbi.filter((value) => value.type === 'event')
    if (events.length === 0) return { events: null, selectedEvent: null }
    return {
      events: events as ContractEvent[],
      selectedEvent: events[eventIndex] as ContractEvent,
    }
  }, [eventAbi, eventIndex])

  const { functions, selectedFunction } = useMemo(() => {
    if (!functionAbi) return { functions: null, selectedFunction: null }
    const functions = functionAbi.filter(
      (value) =>
        value.type === 'function' &&
        value.stateMutability !== 'view' &&
        value.constant !== true
    )
    if (functions.length === 0)
      return { functions: null, selectedFunction: null }
    return {
      functions: functions as ContractFunction[],
      selectedFunction: functions[functionIndex] as ContractFunction,
    }
  }, [functionAbi, functionIndex])

  const eventContract = useContract(eventAddress, eventAbi)
  const functionContract = useContract(functionAddress, functionAbi)

  const { state, send, resetState } = useContractFunction(
    functionContract,
    selectedFunction?.name
  )

  const filter = useMemo(() => {
    if (!eventContract) return null
    if (!selectedEvent) return null
    let filter: string | EventFilter

    try {
      filter = eventContract.filters[selectedEvent?.name](...eventArgs)
    } catch (err) {
      console.error(err)
      filter = selectedEvent.name
    }
    return filter
  }, [eventContract, eventArgs, selectedEvent])

  const startListener = useCallback(() => {
    toggleReaction(true)
    eventContract.once(filter, () => {
      send(...functionArgs, {
        value: parseEther(functionValue === '' ? '0' : functionValue),
      }).then(() => {
        state.status === 'Success'
          ? t('success', 'Transaction succeeded')
          : t('error', 'Transaction failed')
        toggleReaction(false)
        resetState()
      })
    })
  }, [
    filter,
    functionArgs,
    state,
    eventContract,
    resetState,
    t,
    send,
    toggleReaction,
    functionValue,
  ])

  useEffect(() => {
    if (!reactionActive || !eventContract || !filter) {
      return
    }

    if (state.status === 'None') {
      return
    }
    if (state.status === 'Exception') {
      t('error', 'Transaction exception occurred')
      resetState()
      toggleReaction(false)
      eventContract.removeAllListeners()
      return
    }

    if (state.status === 'PendingSignature') {
      t('info', 'Confirm transaction in wallet')
      return
    }

    return function cleanup() {
      eventContract.removeAllListeners()
    }
  }, [
    reactionActive,
    filter,
    state,
    eventContract,
    functionArgs,
    resetState,
    toggleReaction,
    t,
  ])

  return (
    <Grid gap="md">
      <div className="col-span-12 ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.33 }}
          className="h-full w-full"
        >
          <Card>
            <>
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <ReactorIcon
                  size={80}
                  className={cn(
                    reactionActive ? 'animate-pulse' : 'opacity-60'
                  )}
                />
                <Typography as="h1" variant="xl">
                  {reactionActive ? 'Active' : 'Paused'}
                </Typography>
                {reactionActive && (
                  <Typography>Transaction status: {state.status}</Typography>
                )}
              </div>
              <div className="flex w-full items-center justify-center gap-3 py-3">
                <div>
                  {!reactionActive ? (
                    <Button
                      color="gradient"
                      onClick={startListener}
                      disabled={
                        !selectedEvent ||
                        !selectedFunction ||
                        functionArgs.length < selectedFunction.inputs.length
                      }
                    >
                      Start Reaction
                    </Button>
                  ) : (
                    <Button color="red" onClick={() => toggleReaction(false)}>
                      Stop Reaction
                    </Button>
                  )}
                </div>

                <div>
                  <Button
                    color="transparent"
                    onClick={() => {
                      reset()
                    }}
                  >
                    <RefreshIcon height={24} />
                  </Button>
                </div>
              </div>
            </>
          </Card>{' '}
        </motion.div>
      </div>

      <div className="relative col-span-12 md:col-span-7">
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.33 }}
          >
            <Card
              header={
                <div className="flex justify-between p-3">
                  <Typography as="h2" variant="lg">
                    Choose event
                  </Typography>
                  {eventAbi && (
                    <div>
                      <Button size="none" onClick={() => clearEvent()}>
                        {shortenIfAddress(eventAddress)}
                      </Button>
                    </div>
                  )}
                </div>
              }
            >
              {!eventAbi ? (
                <div className="flex flex-col items-center gap-3 ">
                  <Input.Address
                    required
                    placeholder="Contract Address"
                    value={eventAddress}
                    onUserInput={(input) => setAddress(input, 'event')}
                  />
                  <Button
                    disabled={!isAddress(eventAddress)}
                    onClick={() =>
                      fetchABI(
                        SCAN_INFO[chainId]?.name,
                        eventAddress,
                        SCAN_INFO[chainId]?.apiKey,
                        'event'
                      )
                    }
                    color="green"
                  >
                    Get Contract
                  </Button>
                </div>
              ) : eventAbi.length === 0 ? (
                <div className="flex w-full flex-col items-center justify-center">
                  <ExclamationIcon
                    height={48}
                    className="fill-current text-yellow-500"
                  />
                  <Typography as="span">
                    Failed to find valid contract ABI
                  </Typography>
                  <Button color="blue" onClick={() => clearEvent()}>
                    Use different contract
                  </Button>
                </div>
              ) : !events ? (
                <div className="flex w-full flex-col items-center justify-center">
                  <ExclamationIcon
                    height={48}
                    className="fill-current text-yellow-500"
                  />
                  <Typography as="span">No events found in ABI</Typography>
                  <Button color="blue" onClick={() => clearEvent()}>
                    Use different contract
                  </Button>
                </div>
              ) : (
                <>
                  <div
                    className="col-span-12 flex w-full flex-col gap-3"
                    id="events"
                  >
                    <Tabs
                      selectedIndex={eventIndex}
                      onTabChange={(i) => {
                        setIndex(i, 'event')
                        clearArgs('event')
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
                              onUserInput={(input) =>
                                updateArgsAt(i, input, 'event')
                              }
                              onToggle={() =>
                                updateArgsAt(i, !eventArgs[i], 'event')
                              }
                            />
                          )}
                          <div className="flex ">
                            <Typography as="span">Any</Typography>{' '}
                            <Toggle
                              isActive={eventArgs[i] == null} //type conversion required
                              onToggle={
                                () =>
                                  updateArgsAt(
                                    i,
                                    eventArgs[i] != null ? null : '',
                                    'event'
                                  ) //type conversion required
                              }
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        </>
      </div>

      <div className="relative col-span-12 md:order-last md:col-span-7">
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.33 }}
            >
              <Card
                header={
                  <div className="flex justify-between p-3">
                    <Typography as="h2" variant="lg">
                      Choose function
                    </Typography>
                    {functionAbi && (
                      <div>
                        <Button size="none" onClick={() => clearFunction()}>
                          {shortenIfAddress(functionAddress)}
                        </Button>
                      </div>
                    )}
                  </div>
                }
              >
                {!functionAbi ? (
                  <div className="flex flex-col items-center gap-3 ">
                    <Input.Address
                      required
                      placeholder="Contract Address"
                      value={functionAddress}
                      onUserInput={(input) => setAddress(input, 'function')}
                    />
                    <Button
                      disabled={!isAddress(functionAddress)}
                      onClick={() =>
                        fetchABI(
                          SCAN_INFO[chainId]?.name,
                          functionAddress,
                          SCAN_INFO[chainId]?.apiKey,
                          'function'
                        )
                      }
                      color="green"
                    >
                      Get Contract
                    </Button>
                  </div>
                ) : functionAbi.length === 0 ? (
                  <div className="flex w-full items-center justify-center">
                    {' '}
                    <ExclamationIcon
                      height={48}
                      className="fill-current text-yellow-500"
                    />
                    <Typography as="span">
                      Failed to find valid contract ABI
                    </Typography>
                    <Button color="blue" onClick={() => clearFunction()}>
                      Use different contract
                    </Button>
                  </div>
                ) : !functions ? (
                  <div className="flex w-full flex-col items-center justify-center">
                    <ExclamationIcon
                      height={48}
                      className="fill-current text-yellow-500"
                    />
                    <Typography as="span">No functions found in ABI</Typography>
                    <Button color="blue" onClick={() => clearEvent()}>
                      Use different contract
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      className="col-span-12 flex w-full flex-col gap-3"
                      id="events"
                    >
                      <Tabs
                        selectedIndex={functionIndex}
                        onTabChange={(i) => {
                          setIndex(i, 'function')
                          clearArgs('function')
                        }}
                        options={functions.map((func) => {
                          return `${func.name}`
                        })}
                      />
                      {selectedFunction.inputs.map((input, i) => (
                        <div key={i} className="rounded bg-dark-900 p-3">
                          <Typography>{input.name}</Typography>

                          <FlexibleInput
                            inputType={input.type}
                            inputIndex={i}
                            inputValue={functionArgs[i]}
                            onUserInput={(input) =>
                              updateArgsAt(i, input, 'function')
                            }
                            onToggle={() =>
                              updateArgsAt(i, !functionArgs[i], 'function')
                            }
                          />
                        </div>
                      ))}
                      <div className="rounded bg-blue-700 p-3">
                        <Typography>Value ({CHAIN_SYMBOL[chainId]})</Typography>
                        <Input.Numeric
                          onUserInput={(input) => setValue(input)}
                          value={functionValue}
                        />
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </div>

      <div className=" col-span-12  md:col-span-5 md:row-span-2">
        {eventAbi && selectedEvent && (
          <EventMonitor
            contract={eventContract}
            event={selectedEvent}
            setEventArgs={setArgs}
          />
        )}
      </div>
    </Grid>
  )
}
