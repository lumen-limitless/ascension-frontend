import { ChainId, useEthers } from '@usedapp/core'
import { CHAIN_NAME } from '../constants'
import ChainIcon from './icons/ChainIcon'
import Button from './ui/Button'
import Card from './ui/Card'
import Typography from './ui/Typography'

export default function UnsupportedChainId({
  supportedChainIds,
}: {
  supportedChainIds: ChainId[]
}) {
  const { switchNetwork } = useEthers()
  return (
    <Card>
      <Card.Header>
        <div className="flex w-full justify-center p-3">
          <Typography centered variant="lg" as="h1">
            Please Connect to A Supported Network
          </Typography>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col gap-3">
          {supportedChainIds.map((supportedChainId: ChainId) => (
            <Button
              key={supportedChainId}
              color="blue"
              onClick={() => switchNetwork(supportedChainId)}
            >
              <ChainIcon chainId={supportedChainId} />
              Connect to {CHAIN_NAME[supportedChainId]}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}
