import {
  ChainId,
  shortenIfAddress,
  useContractFunction,
  useEthers,
} from '@usedapp/core'
import { startsWith } from 'lodash'
import { NextPage } from 'next'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Toggle from '../../components/ui/Toggle'
import Typography from '../../components/ui/Typography'
import { useContract, useToast } from '../../hooks'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'
import shallow from 'zustand/shallow'
import axios from 'axios'
import { useEffect, useMemo, useRef } from 'react'
import { Contract, EventFilter } from 'ethers'
import { useBoolean } from 'react-use'
import { parseEther } from 'ethers/lib/utils'
import ReactorIcon from '../../components/icons/ReactorIcon'
import clsx from 'clsx'
import { CHAIN_SYMBOL, SCAN_INFO } from '../../constants'
import { isAddress } from '../../functions'
import Card from '../../components/ui/Card'
import { ContractEvent, ContractFunction } from '../../types'
import ToolLayout from '../../layouts/ToolLayout'
import { REACTOR_STEPS } from '../../constants/enums'

interface FlexibleInputProps {
  inputType: string
  inputValue: any
  onUserInput: (input: string) => void
  onToggle: () => void
}
function FlexibleInput({
  inputType,
  inputValue,
  onUserInput,
  onToggle,
}: FlexibleInputProps) {
  return (
    <>
      {inputType === 'address' ? (
        <Input.Address value={inputValue} onUserInput={onUserInput} />
      ) : startsWith(inputType, 'uint', 0) ? (
        <Input.Numeric
          placeholder={inputType}
          value={inputValue}
          onUserInput={onUserInput}
        />
      ) : inputType === 'bool' ? (
        <Toggle isActive={inputValue ?? false} onToggle={onToggle} />
      ) : inputType === 'string' || startsWith(inputType, 'bytes', 0) ? (
        <Input.String
          placeholder={inputType}
          value={inputValue}
          onUserInput={onUserInput}
        />
      ) : (
        <Typography as="span">
          Input of type {inputType} is not supported
        </Typography>
      )}
    </>
  )
}

const stepInfo = [
  { id: 0, name: 'Select Event' },
  { id: 1, name: 'Select Function' },
  { id: 2, name: 'Preview' },
]

const useReactor = () => {
  const { eventInfo, funcInfo, step } = useStore(
    (state) => ({
      eventInfo: state.eventInfo,
      funcInfo: state.funcInfo,
      step: state.step,
    }),
    shallow
  )
  const [
    setAddress,
    setIndex,
    setArgs,
    clearArgs,
    updateArgsAt,
    clearEvent,
    clearFunction,
    setValue,
    setABI,
    setStep,
  ] = useStore(
    (state) => [
      state.setAddress,
      state.setIndex,
      state.setArgs,
      state.clearArgs,
      state.updateArgsAt,
      state.clearEvent,
      state.clearFunction,
      state.setValue,
      state.setABI,
      state.setStep,
    ],
    shallow
  )
  return {
    eventInfo,
    funcInfo,
    step,
    setAddress,
    setIndex,
    setArgs,
    clearArgs,
    updateArgsAt,
    clearEvent,
    clearFunction,
    setValue,
    setABI,
    setStep,
  }
}

const ReactorPage: NextPage = () => {
  const { chainId, library } = useEthers()
  const t = useToast()
  const [active, toggleActive] = useBoolean(false)
  const listener = useRef<Contract>(null)
  const {
    eventInfo,
    funcInfo,
    step,
    setAddress,
    setIndex,
    setArgs,
    clearArgs,
    updateArgsAt,
    clearEvent,
    clearFunction,
    setValue,
    setABI,
    setStep,
  } = useReactor()

  const fetchABI = async (
    name: string,
    address: string,
    apiKey: string,
    type?: 'event' | 'function'
  ) => {
    const res = await axios.get(
      `https://api.${name}/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    )
    if (res.status === 200) {
      console.debug(res.data.result)
      if (res.data.result === 'Contract source code not verified') {
        t('error', 'Failed to fetch contract ABI. Try a different address.')
        return
      }
      const abi = JSON.parse(res.data.result)
      console.debug(abi)
      setABI(abi, type)
      return
    }

    t('error', 'Failed to fetch contract ABI. Try a different address.')
  }

  const { events, selectedEvent } = useMemo(() => {
    if (!eventInfo.abi) return { events: null, selectedEvent: null }
    const events = eventInfo.abi.filter((value) => value.type === 'event')
    if (events.length === 0) return { events: null, selectedEvent: null }
    return {
      events: events as ContractEvent[],
      selectedEvent: events[eventInfo.index] as ContractEvent,
    }
  }, [eventInfo])

  const { functions, selectedFunction } = useMemo(() => {
    if (!funcInfo.abi) return { functions: null, selectedFunction: null }
    const functions = funcInfo.abi.filter(
      (value) =>
        value.type === 'function' &&
        value.stateMutability !== 'view' &&
        value.constant !== true
    )
    if (functions.length === 0)
      return { functions: null, selectedFunction: null }
    return {
      functions: functions as ContractFunction[],
      selectedFunction: functions[funcInfo.index] as ContractFunction,
    }
  }, [funcInfo])

  const eventContract = useContract(eventInfo.address, eventInfo.abi)
  const functionContract = useContract(funcInfo.address, funcInfo.abi)

  const contractFunction = useContractFunction(
    functionContract,
    selectedFunction?.name
  )

  const filter = useMemo(() => {
    if (!eventContract) return null

    let filter: string | EventFilter
    try {
      filter = eventContract.filters[selectedEvent?.name](...eventInfo.args)
    } catch (err) {
      console.error(err)
      filter = selectedEvent?.name
    }
    return filter
  }, [eventInfo, eventContract, selectedEvent])

  const startListener = () => {
    try {
      listener.current = eventContract.connect(library).once(filter, () => {
        contractFunction
          .send(...funcInfo.args, {
            value: parseEther(funcInfo.value || '0'),
          })
          .then(() => {
            contractFunction.state.status === 'Success'
              ? t('success', 'Transaction succeeded')
              : t('error', 'Transaction failed')
            toggleActive(false)
            contractFunction.resetState()
          })
      })
      t('info', 'Starting Reactor')
      toggleActive(true)
    } catch (err) {
      console.error(err)
    }
  }

  const stopListener = () => {
    try {
      t('info', 'Stopping Reactor')
      listener.current.removeAllListeners()
      listener.current = null
      toggleActive(false)
    } catch (err) {
      console.error(err)
    }
  }

  // Force remove listeners if not active
  useEffect(() => {
    if (!active) {
      listener.current?.removeAllListeners()
    }
  })

  return (
    <ToolLayout
      title="Ascension Reactor"
      description={`Ascension Reactor is a tool that allows users to interact with smart contract events through a convenient user interface. It is intended to allow users to easily execute transactions once an event is emitted from the specified contract. `}
      requiredBalance={1}
      supportedNetworks={[ChainId.Arbitrum, ChainId.Mainnet]}
    >
      <>
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.33 }}
          aria-label="Progress"
          className="py-3 md:py-6 lg:py-9"
        >
          <ol
            role="list"
            className="space-y-4 md:flex md:space-y-0 md:space-x-8"
          >
            {stepInfo.map((s) => (
              <li key={s.name} className="md:flex-1">
                {s.id < step ? (
                  <a
                    onClick={() => {
                      toggleActive(false)
                      setStep(s.id)
                    }}
                    className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                  >
                    <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
                      {`Step ${s.id + 1}`}
                    </span>
                    <span className="text-sm font-medium">{s.name}</span>
                  </a>
                ) : s.id === step ? (
                  <a
                    className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium text-indigo-600">
                      {`Step ${s.id + 1}`}
                    </span>
                    <span className="text-sm font-medium">{s.name}</span>
                  </a>
                ) : (
                  <a className="group flex flex-col border-l-4 border-gray-500 py-2 pl-4  md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                    <span className="text-sm font-medium text-gray-500 ">
                      {`Step ${s.id + 1}`}
                    </span>
                    <span className="text-sm font-medium">{s.name}</span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>
        {step === REACTOR_STEPS.SETTING_EVENT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.33 }}
          >
            <Card>
              <Card.Header>
                <div className="flex justify-between p-3">
                  <Typography as="h2" variant="lg">
                    Select Event
                  </Typography>
                  {eventInfo.abi && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {shortenIfAddress(eventInfo.address)}
                      <Button
                        size="xs"
                        color="yellow"
                        onClick={() => clearEvent()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"
                          />
                        </svg>
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {!eventInfo.abi ? (
                  <div className="flex flex-col items-center gap-3 ">
                    <p>Enter Contract Address</p>
                    <Input.Address
                      required
                      value={eventInfo.address}
                      onUserInput={(input) => setAddress(input, 'event')}
                      className="max-w-3xl"
                    />
                    <Button
                      disabled={!isAddress(eventInfo.address)}
                      onClick={() =>
                        fetchABI(
                          SCAN_INFO[chainId]?.name,
                          eventInfo.address,
                          SCAN_INFO[chainId]?.apiKey,
                          'event'
                        )
                      }
                      color="green"
                    >
                      Get Contract
                    </Button>
                  </div>
                ) : eventInfo.abi.length === 0 ? (
                  <div className="flex w-full flex-col items-center justify-center">
                    <Typography as="span">
                      Failed to find valid contract ABI
                    </Typography>
                    <Button color="blue" onClick={() => clearEvent()}>
                      Use different contract
                    </Button>
                  </div>
                ) : !events ? (
                  <div className="flex w-full flex-col items-center justify-center">
                    <Typography as="span">No events found in ABI</Typography>
                    <Button color="blue" onClick={() => clearEvent()}>
                      Use different contract
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3" id="events">
                      <div className="inline-flex flex-wrap rounded bg-black">
                        {events.map((event, i) => (
                          <Button
                            key={i}
                            color={
                              eventInfo.index === i ? 'gradient' : 'default'
                            }
                            onClick={() => {
                              clearArgs('event')
                              setIndex(i, 'event')
                            }}
                          >
                            {event.name}
                          </Button>
                        ))}
                      </div>
                      {selectedEvent.inputs
                        .filter((eventInput) => eventInput.indexed === true)
                        .map((input, i) => (
                          <div key={i} className="rounded bg-purple-900 p-3">
                            <Typography>{input.name}</Typography>

                            {/* TYPE CONVERSION FOR EVENT ARGS IS REQUIRED (NOT STRICT EQUALITY/INEQUALITY) */}
                            {eventInfo.args[i] != null && (
                              <FlexibleInput
                                inputType={input.type}
                                inputValue={eventInfo.args[i]}
                                onUserInput={(input) =>
                                  updateArgsAt(i, input, 'event')
                                }
                                onToggle={() =>
                                  updateArgsAt(i, eventInfo.args[i], 'event')
                                }
                              />
                            )}
                            <div className="flex ">
                              <Typography as="span">Any</Typography>
                              <Toggle
                                isActive={eventInfo.args[i] == null} //type conversion required
                                onToggle={
                                  () =>
                                    updateArgsAt(
                                      i,
                                      eventInfo.args[i] != null ? null : '',
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
                <div className="py-3">
                  {selectedEvent ? (
                    <Button
                      full
                      color="blue"
                      onClick={() => setStep(REACTOR_STEPS.SETTING_FUNCTION)}
                    >
                      Next Step
                    </Button>
                  ) : null}
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {step === REACTOR_STEPS.SETTING_FUNCTION && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.33 }}
            >
              <Card>
                <Card.Header>
                  <div className="flex justify-between p-3">
                    <Typography as="h2" variant="lg">
                      Select function
                    </Typography>
                    {funcInfo.abi && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {shortenIfAddress(eventInfo.address)}
                        <Button
                          size="xs"
                          color="yellow"
                          onClick={() => clearFunction()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 32 32"
                          >
                            <path
                              fill="currentColor"
                              d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"
                            />
                          </svg>
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Header>
                <Card.Body>
                  {!funcInfo.abi ? (
                    <div className="flex flex-col items-center gap-3 ">
                      <p>Enter Contract Address</p>
                      <Input.Address
                        required
                        value={funcInfo.address}
                        onUserInput={(input) => setAddress(input, 'function')}
                        className="max-w-3xl"
                      />
                      <Button
                        disabled={!isAddress(funcInfo.address)}
                        onClick={() =>
                          fetchABI(
                            SCAN_INFO[chainId]?.name,
                            funcInfo.address,
                            SCAN_INFO[chainId]?.apiKey,
                            'function'
                          )
                        }
                        color="green"
                      >
                        Get Contract
                      </Button>
                    </div>
                  ) : funcInfo.abi.length === 0 ? (
                    <div className="flex w-full items-center justify-center">
                      <Typography as="span">
                        Failed to find valid contract ABI
                      </Typography>
                      <Button color="blue" onClick={() => clearFunction()}>
                        Use different contract
                      </Button>
                    </div>
                  ) : !functions ? (
                    <div className="flex w-full flex-col items-center justify-center">
                      <Typography as="span">
                        No functions found in ABI
                      </Typography>
                      <Button color="blue" onClick={() => clearEvent()}>
                        Use different contract
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3" id="functions">
                        <div className="inline-flex flex-wrap rounded bg-black">
                          {functions?.map((func, i) => (
                            <Button
                              key={i}
                              color={
                                funcInfo.index === i ? 'gradient' : 'default'
                              }
                              onClick={() => {
                                clearArgs('function')
                                setIndex(i, 'function')
                              }}
                            >
                              {func.name}
                            </Button>
                          ))}
                        </div>

                        {selectedFunction?.inputs.map((input, i) => (
                          <div key={i} className="rounded bg-purple-900 p-3">
                            <Typography>{input.name}</Typography>

                            <FlexibleInput
                              inputType={input.type}
                              inputValue={funcInfo.args[i] ?? ''}
                              onUserInput={(input) =>
                                updateArgsAt(i, input, 'function')
                              }
                              onToggle={() =>
                                updateArgsAt(i, !funcInfo.args[i], 'function')
                              }
                            />
                          </div>
                        ))}
                        {selectedFunction?.payable && (
                          <div className="rounded bg-blue-700 p-3">
                            <Typography>
                              Value ({CHAIN_SYMBOL[chainId]})
                            </Typography>
                            <Input.Numeric
                              onUserInput={(input) => setValue(input)}
                              value={funcInfo.value}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div className="py-3">
                    {selectedFunction && (
                      <Button
                        full
                        color="blue"
                        disabled={
                          funcInfo?.args.length !==
                          selectedFunction?.inputs.length
                        }
                        onClick={() => setStep(REACTOR_STEPS.READY)}
                      >
                        Review Reaction
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </>
        )}
        {step === REACTOR_STEPS.READY && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.33 }}
              className="flex w-full flex-col items-center gap-3 py-9"
            >
              <ReactorIcon
                size={128}
                className={clsx(active ? 'animate-spin' : 'opacity-80')}
              />
              <h2>
                On <b>{selectedEvent?.name}</b> event, execute{' '}
                <b>{selectedFunction?.name}</b> transaction.
              </h2>
              <p>
                Status:{' '}
                <span
                  className={
                    contractFunction?.state.status === 'PendingSignature'
                      ? 'text-green'
                      : 'text-yellow'
                  }
                >
                  {contractFunction?.state.status}
                </span>
              </p>
              {active ? (
                <Button color="red" onClick={stopListener}>
                  Stop Reaction
                </Button>
              ) : (
                <Button color={'gradient'} onClick={startListener}>
                  Start Reaction
                </Button>
              )}
            </motion.div>
          </>
        )}
      </>
    </ToolLayout>
  )
}

export default ReactorPage
