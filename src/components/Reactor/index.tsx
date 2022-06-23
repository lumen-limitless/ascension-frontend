import { FC, useEffect, useState } from 'react'
import {
  shortenIfAddress,
  TypedFilter,
  useBlockNumber,
  useContractFunction,
  useEthers,
  useLogs,
} from '@usedapp/core'
import { useMemo } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Divider from '../ui/Divider'
import Grid from '../ui/Grid'
import Input from '../ui/Input'
import { SCAN_INFO } from '../../constants'
import { useContract, useVerifiedContractABI } from '../../hooks'
import _ from 'lodash'
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
import Toggle from '../ui/Toggle'
import FlexibleInput from './FlexibleInput'
import FadeUp from '../../animations/fadeUp'

const Reactor: FC = () => {
  const { chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const [addressInput, setAddressInput] = useState('')
  const [eventArgsInput, { updateAt: updateEventArgsInputAt }] = useList([])
  const [functionArgsInput, { updateAt: updateFunctionArgsInputAt }] = useList([])
  const { address, eventIndex, functionIndex, eventArgs, functionArgs, reactionActive } = useStore(
    (state) => ({
      address: state.address,
      eventIndex: state.eventIndex,
      functionIndex: state.functionIndex,
      eventArgs: state.eventArgs,
      functionArgs: state.functionArgs,
      reactionActive: state.reactionActive,
    }),
    shallow
  )
  const [setAddress, reset, setEventIndex, setFunctionIndex, setReaction, cancelReaction] =
    useStore(
      (state) => [
        state.setAddress,
        state.reset,
        state.setEventIndex,
        state.setFunctionIndex,
        state.setReaction,
        state.cancelReaction,
      ],
      shallow
    )

  const { abi, functions, events } = useVerifiedContractABI(address, chainId)
  console.table(abi)

  const contract: any = useContract(address, abi, chainId)
  const filter: TypedFilter = useMemo(() => {
    if (!contract || !events || !blockNumber) return null

    return { contract: contract, event: events[eventIndex].name, args: eventArgs }
  }, [contract, events, eventIndex, eventArgs, blockNumber])

  const logs = useLogs(filter, { fromBlock: blockNumber - 1 })
  console.log(logs)

  const { state, send } = useContractFunction(
    contract && contract,
    functions && functions[functionIndex].name
  )

  useEffect(() => {
    if (!reactionActive) return
    if (!logs || logs.error) return

    const sendTx = async () => {
      await send(...functionArgs)
    }
    if (logs.value.length > 0) {
      sendTx()
    }
  }, [logs, functionArgs, reactionActive, send])

  return (
    <Grid gap="md">
      <div className="col-span-12">
        <Card>
          <div className="flex w-full items-center justify-center pb-3">
            <ReactorIcon />
          </div>
          {!isAddress(address) ? (
            <div className="flex gap-3">
              <Input.Address
                required
                placeholder="Contract Address"
                value={addressInput}
                onUserInput={(input) => setAddressInput(input)}
              ></Input.Address>
              <Button
                disabled={!isAddress(addressInput)}
                onClick={() => {
                  setAddress(addressInput)
                }}
                color="green"
              >
                Go
              </Button>
            </div>
          ) : (
            <div className="flex w-full">
              <ExternalLink href={`https://${SCAN_INFO[chainId].name}.io/address/${address}`}>
                <Button color="blue">
                  <Icon icon="fa-solid:file-contract" height={24} />
                  <Typography as="span">{shortenIfAddress(address)}</Typography>
                </Button>
              </ExternalLink>
              <Button color="yellow" onClick={() => reset()}>
                <Icon icon="ic:baseline-change-circle" height={24} />
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="col-span-7">
        {isAddress(address) && (
          <FadeUp>
            <Card>
              <Grid gap="sm">
                <div className="col-span-12">
                  <Typography centered>Choose Event</Typography>
                  <Divider />
                  {!events ? (
                    <Loader />
                  ) : (
                    <Tabs
                      onTabChange={(i) => setEventIndex(i)}
                      options={events.map((event) => {
                        return `${event.name}`
                      })}
                    />
                  )}
                </div>
                <div className="col-span-12 flex w-full flex-col gap-3">
                  {abi && (
                    <>
                      {events[eventIndex].inputs.map((input, i) => (
                        <div key={i} className="rounded bg-dark-900 p-3">
                          <Typography>{input.name}</Typography>
                          <FlexibleInput
                            inputType={input.type}
                            inputIndex={i}
                            inputValue={eventArgsInput[i]}
                            updateAt={updateEventArgsInputAt}
                          />
                        </div>
                      ))}
                      <Tabs
                        options={functions.map((f) => {
                          return f.name
                        })}
                        onTabChange={(i) => setFunctionIndex(i)}
                      />
                      {functions[functionIndex].inputs.map((input, i) => (
                        <div key={i} className="rounded bg-dark-900 p-3">
                          <Typography>{input.name}</Typography>
                          <FlexibleInput
                            inputType={input.type}
                            inputIndex={i}
                            inputValue={functionArgsInput[i]}
                            updateAt={updateFunctionArgsInputAt}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className="col-span-12  place-self-center">
                  {reactionActive ? (
                    <Button color="red" onClick={() => cancelReaction()}>
                      Cancel Reaction
                    </Button>
                  ) : (
                    <Button
                      color="gradient"
                      onClick={() => setReaction(eventArgsInput, functionArgsInput)}
                    >
                      <Icon icon="clarity:atom-solid" height={24} />
                      Start Reaction
                    </Button>
                  )}
                </div>
              </Grid>
            </Card>
          </FadeUp>
        )}
      </div>
      <div className="col-span-5">
        {reactionActive && <EventMonitor logs={logs} event={events[eventIndex]} />}
      </div>
    </Grid>
  )
}
export default Reactor
