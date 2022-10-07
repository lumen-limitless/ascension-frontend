import { useEthers } from '@usedapp/core'
import { SUPPORTED_CHAINS } from '../../constants'
import Button from '../ui/Button'
import Grid from '../ui/Grid'
import Typography from '../ui/Typography'
import { useUI } from '../../hooks'
import ChainIcon from '../icons/ChainIcon'

export default function Network() {
  const { switchNetwork } = useEthers()
  const { toggleViewingModal } = useUI()

  return (
    <div className="w-full  md:pb-0">
      <Typography as="h1" variant="xl" centered className="pb-3">
        Choose Network
      </Typography>

      <div className="flex flex-col gap-3">
        {SUPPORTED_CHAINS.map((chain) => (
          <Button
            key={chain.chainId}
            color="gray"
            onClick={() => {
              switchNetwork(chain.chainId).then(() => {
                toggleViewingModal(false)
              })
            }}
          >
            <ChainIcon chainId={chain.chainId} />
            {chain.chainName}
          </Button>
        ))}
      </div>
    </div>
  )
}
