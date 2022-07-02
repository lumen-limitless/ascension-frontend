import { ChainId } from '@usedapp/core'
import { FC } from 'react'
import { CHAIN_NAME } from '../../constants'
import { useSwitchNetwork } from '../../hooks'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Grid from '../ui/Grid'
import Typography from '../ui/Typography'

interface UnsupporteChainIdProps {
  supportedChainIds?: ChainId[]
}
const UnsupportedChainId: FC<UnsupporteChainIdProps> = ({ supportedChainIds }) => {
  const switchNetwork = useSwitchNetwork()
  return (
    <Card
      header={
        <div className="flex w-full justify-center p-3">
          <Typography centered variant="lg" as="h1">
            Please Connect to A Supported Network
          </Typography>
        </div>
      }
    >
      <Grid gap="md">
        {supportedChainIds.map((supportedChainId) => (
          <div key={supportedChainId} className="col-span-6 flex place-content-center">
            <Button color="blue" onClick={() => switchNetwork(supportedChainId)}>
              Connect to {CHAIN_NAME[supportedChainId]}
            </Button>
          </div>
        ))}
      </Grid>
    </Card>
  )
}

export default UnsupportedChainId
