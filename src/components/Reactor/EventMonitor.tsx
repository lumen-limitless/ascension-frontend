import { CubeTransparentIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { FilterIcon } from '@heroicons/react/solid'
import {
  shortenIfAddress,
  useBlockNumber,
  useEthers,
  useLogs,
} from '@usedapp/core'
import { Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { dropRight, startsWith } from 'lodash'
import { SCAN_INFO } from '../../constants'
import { useToast } from '../../hooks'
import { ContractEvent } from '../../types'
import Button from '../ui/Button'
import Card from '../ui/Card'
import ExternalLink from '../ui/ExternalLink'
import Grid from '../ui/Grid'
import Loader from '../ui/Loader'
import Typography from '../ui/Typography'
import { motion } from 'framer-motion'

interface EventMonitorProps {
  contract: Contract
  event: ContractEvent
  setEventArgs: (args: any[], type: 'event' | 'function') => void
}
export default function EventMonitor({
  contract,
  event,
  setEventArgs,
}: EventMonitorProps) {
  const t = useToast()
  const { chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const logs = useLogs(
    contract &&
      event &&
      blockNumber && { contract: contract, event: event.name, args: [] },
    {
      fromBlock: blockNumber - 10,
    }
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.33 }}
      className="h-full w-full"
    >
      <Card
        className="h-full"
        header={
          <div className="flex p-3">
            {' '}
            <Typography as="h2" variant="lg">
              {event.name} events
            </Typography>
          </div>
        }
      >
        {' '}
        {!logs || logs.error ? (
          <Loader size={48} />
        ) : (
          <>
            <div className="flex max-h-[40rem] flex-col items-center justify-start gap-3 overflow-y-auto overflow-x-hidden py-3">
              {logs.value.reverse().map((log, i) => (
                <Card key={i}>
                  <Grid gap="sm">
                    <div className="col-span-4">
                      <ExternalLink
                        href={`https://${SCAN_INFO[chainId].name}/block/${log.blockNumber}`}
                      >
                        <Button color="transparent">
                          <CubeTransparentIcon height={24} />
                          {log.blockNumber}
                        </Button>
                      </ExternalLink>
                    </div>
                    <div className="col-span-4">
                      <ExternalLink
                        href={`https://${SCAN_INFO[chainId].name}/tx/${log.transactionHash}`}
                      >
                        <Button color="blue">TX</Button>
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
                                event.inputs.filter(
                                  (eventInput) => eventInput.indexed === true
                                ).length
                            ),
                            'event'
                          )
                          t('success', 'Added event inputs as filter ')
                        }}
                      >
                        <FilterIcon height={24} />
                        Filter
                      </Button>
                    </div>

                    <div className="col-span-12 flex w-full gap-3 overflow-x-scroll">
                      {log.data.map((d, i) => (
                        <div className="flex rounded bg-dark-700" key={i}>
                          <div className=" p-3">{event.inputs[i].name}</div>

                          <div className="rounded-r bg-dark-900 p-3">
                            {startsWith(event.inputs[i].type, 'uint')
                              ? formatUnits(d, '0')
                              : d}
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
    </motion.div>
  )
}
