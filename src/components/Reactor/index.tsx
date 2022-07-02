import { useCallback, useEffect } from 'react'
import { shortenIfAddress, Songbird, useContractFunction, useEthers } from '@usedapp/core'
import { useMemo } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import cn from 'clsx'
import Grid from '../ui/Grid'
import Input from '../ui/Input'
import { CHAIN_SYMBOL, SCAN_INFO } from '../../constants'
import { useContract, useToast } from '../../hooks'
import { isAddress } from 'ethers/lib/utils'
import Tabs from '../ui/Tabs'
import { Icon } from '@iconify/react'
import Typography from '../ui/Typography'
import shallow from 'zustand/shallow'
import useStore from '../../store/useStore'
import ReactorIcon from '../icons/ReactorIcon'
import EventMonitor from './EventMonitor'
import FlexibleInput from './FlexibleInput'
import { Contract, EventFilter } from 'ethers'
import Toggle from '../ui/Toggle'
import { RefreshIcon } from '@heroicons/react/outline'
import { ContractEvent, ContractFunction } from '../../types'
import Motion from '../../animations'
import { ExclamationIcon } from '@heroicons/react/solid'

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
      reactionActive: state.reactionActive,
    }),
    shallow
  )

  const [
    resetAll,
    reset,
    setAddress,
    setIndex,
    setArgs,
    updateArgsAt,
    clearArgs,
    toggleReaction,
    fetchABI,
  ] = useStore(
    (state) => [
      state.resetAll,
      state.reset,
      state.setAddress,
      state.setIndex,
      state.setArgs,
      state.updateArgsAt,
      state.clearArgs,
      state.toggleReaction,
      state.fetchABI,
    ],
    shallow
  )

  const { events, selectedEvent } = useMemo(() => {
    if (!eventAbi) return { events: null, selectedEvent: null }
    const events = eventAbi.filter((value) => value.type === 'event')
    if (events.length === 0) return { events: null, selectedEvent: null }
    return { events: events as ContractEvent[], selectedEvent: events[eventIndex] as ContractEvent }
  }, [eventAbi, eventIndex])

  const { functions, selectedFunction } = useMemo(() => {
    if (!functionAbi) return { functions: null, selectedFunction: null }
    const functions = functionAbi.filter(
      (value) =>
        value.type === 'function' && value.stateMutability !== 'view' && value.constant !== true
    )
    if (functions.length === 0) return { functions: null, selectedFunction: null }
    return {
      functions: functions as ContractFunction[],
      selectedFunction: functions[functionIndex] as ContractFunction,
    }
  }, [functionAbi, functionIndex])

  const eventContract = useContract(eventAddress, eventAbi, chainId)
  const functionContract = useContract(functionAddress, functionAbi, chainId)

  const { state, send, resetState } = useContractFunction(functionContract, selectedFunction?.name)

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
      send(...functionArgs).then(() => {
        state.status === 'Success'
          ? t('success', 'Transaction succeeded')
          : t('error', 'Transaction failed')
        toggleReaction(false)
        resetState()
      })
    })
  }, [filter, functionArgs, state, eventContract, resetState, t, send, toggleReaction])

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
  }, [reactionActive, filter, state, eventContract, functionArgs, resetState, toggleReaction, t])

  return (
    <Grid gap="md">
      <div className="col-span-12 ">
        <Motion variant="fadeIn" className="h-full w-full">
          <Card>
            <>
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <ReactorIcon
                  size={80}
                  className={cn(reactionActive ? 'animate-pulse' : 'opacity-60')}
                />
                <Typography as="h1" variant="xl">
                  {reactionActive ? 'Active' : 'Paused'}
                </Typography>
                {reactionActive && <Typography>Transaction status: {state.status}</Typography>}
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
                      <Icon icon="la:atom" height={24} /> Start Reaction
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
                      resetAll()
                    }}
                  >
                    <RefreshIcon height={24} />
                  </Button>
                </div>
              </div>
            </>
          </Card>{' '}
        </Motion>
      </div>

      <div className="relative col-span-12 md:col-span-7">
        <>
          <Motion variant="fadeIn">
            <Card
              header={
                <div className="flex justify-between p-3">
                  <Typography as="h2" variant="lg">
                    Choose event
                  </Typography>
                  {eventAbi && (
                    <div>
                      <Button size="none" onClick={() => reset('event')}>
                        <Icon icon="fa-solid:file-contract" height={24} />
                        {shortenIfAddress(eventAddress)}
                      </Button>
                    </div>
                  )}
                </div>
              }
            >
              {!eventAbi ? (
                <div className="flex flex-col items-center gap-3 ">
                  <div>
                    <Typography centered as="h2" variant="lg">
                      Enter contract address
                    </Typography>
                  </div>
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
                <div className="flex w-full items-center justify-center">
                  {' '}
                  <ExclamationIcon height={48} className="fill-current text-yellow-500" />
                  <Typography as="span">Failed to find valid contract ABI</Typography>
                  <Button color="blue" onClick={() => reset('event')}>
                    Use different contract
                  </Button>
                </div>
              ) : (
                <>
                  <div className="col-span-12 flex w-full flex-col gap-3" id="events">
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
                              onUserInput={(input) => updateArgsAt(i, input, 'event')}
                              onToggle={() => updateArgsAt(i, !eventArgs[i], 'event')}
                            />
                          )}
                          <div className="flex ">
                            <Typography as="span">Any</Typography>{' '}
                            <Toggle
                              isActive={eventArgs[i] == null} //type conversion required
                              onToggle={
                                () => updateArgsAt(i, eventArgs[i] != null ? null : '', 'event') //type conversion required
                              }
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </Card>
          </Motion>
        </>
      </div>

      <div className="relative col-span-12 md:order-last md:col-span-7">
        {selectedEvent && (
          <>
            <Motion variant="fadeIn">
              <Card
                header={
                  <div className="flex justify-between p-3">
                    <Typography as="h2" variant="lg">
                      Choose function
                    </Typography>
                    {functionAbi && (
                      <div>
                        <Button size="none" onClick={() => reset('function')}>
                          <Icon icon="fa-solid:file-contract" height={24} />
                          {shortenIfAddress(functionAddress)}
                        </Button>
                      </div>
                    )}
                  </div>
                }
              >
                {!functionAbi ? (
                  <div className="flex flex-col items-center gap-3 ">
                    <div>
                      <Typography centered as="h2" variant="lg">
                        Enter function contract address
                      </Typography>
                    </div>
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
                    <ExclamationIcon height={48} className="fill-current text-yellow-500" />
                    <Typography as="span">Failed to find valid contract ABI</Typography>
                    <Button color="blue" onClick={() => reset('function')}>
                      Use different contract
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="col-span-12 flex w-full flex-col gap-3" id="events">
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
                            onUserInput={(input) => updateArgsAt(i, input, 'function')}
                            onToggle={() => updateArgsAt(i, !functionArgs[i], 'function')}
                          />
                        </div>
                      ))}
                      <div className="rounded bg-blue-700 p-3">
                        <Typography>Value ({CHAIN_SYMBOL[chainId]})</Typography>
                        <Input.Numeric onUserInput={() => null} value={0.0} />
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </Motion>
          </>
        )}
      </div>

      <div className=" col-span-12  md:col-span-5 md:row-span-2">
        {eventAbi && selectedEvent && (
          <EventMonitor contract={eventContract} event={selectedEvent} setEventArgs={setArgs} />
        )}
      </div>
    </Grid>
  )
}
