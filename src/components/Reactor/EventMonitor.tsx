import { CubeTransparentIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Icon } from '@iconify/react'
import { shortenIfAddress, useBlockNumber, useEthers, useLogs } from '@usedapp/core'
import { Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { dropRight, startsWith } from 'lodash'
import { FC } from 'react'
import { IHookStateSetAction } from 'react-use/lib/misc/hookState'
import Motion from '../../animations/Motion'
import { SCAN_INFO } from '../../constants'
import { useToast } from '../../hooks'
import { ContractEvent } from '../../types'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Divider from '../ui/Divider'
import ExternalLink from '../ui/ExternalLink'
import Grid from '../ui/Grid'
import Loader from '../ui/Loader'
import Typography from '../ui/Typography'

interface EventMonitorProps {
  contract: Contract
  event: ContractEvent
  setEventArgs: (newList: IHookStateSetAction<any[]>) => void
}
const EventMonitor: FC<EventMonitorProps> = ({ contract, event, setEventArgs }) => {
  const t = useToast()
  const { chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const logs = useLogs(contract && event && { contract: contract, event: event.name, args: [] }, {
    fromBlock: blockNumber - 1,
  })

  return (
    <Motion variant="fadeIn">
      <Card>
        {' '}
        {!logs ? (
          <Loader size={48} message="Loading Events" />
        ) : logs.error ? (
          <Loader size={48} />
        ) : (
          <>
            <Typography as="h2" className="pb-3 text-center text-xl">
              {event.name} events
            </Typography>

            <Divider />

            <div className="flex max-h-96 flex-col items-center justify-start gap-3 overflow-y-auto overflow-x-hidden py-3">
              {logs.value.map((log, i) => (
                <Card key={i} className="w-full">
                  <Grid gap="sm">
                    <div className="col-span-4">
                      <ExternalLink
                        href={`https://${SCAN_INFO[chainId].name}.io/block/${log.blockNumber}`}
                      >
                        {' '}
                        <Button color="transparent">
                          <CubeTransparentIcon height={24} />
                          {log.blockNumber}
                        </Button>
                      </ExternalLink>
                    </div>
                    <div className="col-span-4">
                      <ExternalLink
                        href={`https://${SCAN_INFO[chainId].name}.io/tx/${log.transactionHash}`}
                      >
                        <Button color="blue">
                          <Icon icon="icon-park-solid:transaction" height={24} />
                          TX
                        </Button>
                      </ExternalLink>
                    </div>
                    <div className="col-span-4">
                      <Button
                        color="green"
                        onClick={() => {
                          setEventArgs(
                            dropRight(
                              log.data as any[],
                              log.data.length -
                                event.inputs.filter((eventInput) => eventInput.indexed === true)
                                  .length
                            )
                          )
                          t('success', 'Added event inputs as filter ')
                        }}
                      >
                        <PlusCircleIcon height={24} />
                        Filter
                      </Button>
                    </div>

                    <div className="col-span-12 flex w-full gap-3 overflow-x-scroll">
                      {log.data.map((d, i) => (
                        <div className="flex rounded bg-dark-700" key={i}>
                          <div className=" p-3">{event.inputs[i].name}</div>

                          <div className="rounded-r bg-dark-900 p-3">
                            {startsWith(event.inputs[i].type, 'uint') ? formatUnits(d, '0') : d}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Card>
              ))}
            </div>
          </>
        )}
      </Card>
    </Motion>
  )
}

export default EventMonitor
