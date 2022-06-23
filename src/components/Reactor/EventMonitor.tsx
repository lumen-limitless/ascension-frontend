import { CubeTransparentIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Icon } from '@iconify/react'
import { LogsResult, shortenIfAddress, useEthers } from '@usedapp/core'
import { Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import _ from 'lodash'
import { FC } from 'react'
import FadeUp from '../../animations/fadeUp'
import { SCAN_INFO } from '../../constants'
import { ContractEvent } from '../../types'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Divider from '../ui/Divider'
import ExternalLink from '../ui/ExternalLink'
import Grid from '../ui/Grid'
import Loader from '../ui/Loader'
import Typography from '../ui/Typography'

interface EventMonitorProps {
  logs: LogsResult<Contract, string>
  event: ContractEvent
}
const EventMonitor: FC<EventMonitorProps> = ({ logs, event }) => {
  const { chainId } = useEthers()
  return (
    <FadeUp>
      <Card>
        {' '}
        {!logs ? (
          <Loader size={48} message="Loading Events" />
        ) : logs.error ? (
          <Loader size={48} message="Error" />
        ) : (
          <>
            <Typography as="h2" className="pb-3 text-center text-xl">
              {event.name} events
            </Typography>

            <Divider />

            <div className="flex max-h-96 flex-col items-center justify-start gap-3 overflow-y-auto overflow-x-hidden py-3">
              {_.reverse(logs.value).map((log, i) => (
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
                      <Button color="green">
                        <PlusCircleIcon height={24} />
                        Filter
                      </Button>
                    </div>

                    <div className="col-span-12 flex w-full gap-3 overflow-x-scroll">
                      {log.data.map((d, i) => (
                        <div className="flex rounded bg-dark-700" key={i}>
                          <div className=" p-3">{event.inputs[i].name}</div>

                          <div className="rounded-r bg-dark-900 p-3">
                            {event.inputs[i].type === 'address'
                              ? shortenIfAddress(d)
                              : event.inputs[i].type === 'uint256'
                              ? formatUnits(d, '0')
                              : d.toString()}
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
    </FadeUp>
  )
}

export default EventMonitor
