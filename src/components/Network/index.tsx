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
    <>
      <div className="w-full pb-3">
        <Typography as="h1" variant="xl" centered className="pb-1">
          Choose Network
        </Typography>
      </div>

      <Grid gap="md">
        {SUPPORTED_CHAINS.map((chain) => (
          <div key={chain.chainId} className="col-span-6">
            <Button
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
          </div>
        ))}
      </Grid>
    </>
  )
}
