import { Arbitrum, ChainId, useEthers } from '@usedapp/core'
import dynamic from 'next/dynamic'
import { SUPPORTED_CHAINS } from '../../constants'

import useStore from '../../store/useStore'
import Button from '../ui/Button'
import Grid from '../ui/Grid'
import Spinner from '../ui/Spinner'
import HardhatIcon from '../icons/networks/HardhatIcon'
import ArbitrumIcon from '../icons/networks/ArbitrumIcon'
import EthereumIcon from '../icons/networks/EthereumIcon'
import FantomIcon from '../icons/networks/FantomIcon'
import PolygonIcon from '../icons/networks/PolygonIcon'
import GnosisIcon from '../icons/networks/GnosisIcon'
import BscIcon from '../icons/networks/BscIcon'
import AvalancheIcon from '../icons/networks/AvalancheIcon'
import HarmonyIcon from '../icons/networks/HarmonyIcon'
import OptimismIcon from '../icons/networks/OptimismIcon'
import Typography from '../ui/Typography'

export const CHAIN_ICON = {
  [ChainId.Hardhat]: <HardhatIcon />,
  [ChainId.ArbitrumRinkeby]: <ArbitrumIcon />,
  [ChainId.Arbitrum]: <ArbitrumIcon />,
  [ChainId.Mainnet]: <EthereumIcon />,
  [ChainId.Ropsten]: <EthereumIcon />,
  [ChainId.Rinkeby]: <EthereumIcon />,
  [ChainId.Goerli]: <EthereumIcon />,
  [ChainId.Kovan]: <EthereumIcon />,
  [ChainId.Fantom]: <FantomIcon />,
  [ChainId.Polygon]: <PolygonIcon />,
  [ChainId.xDai]: <GnosisIcon />,
  [ChainId.BSC]: <BscIcon />,
  [ChainId.BSCTestnet]: <ArbitrumIcon />,
  [ChainId.Avalanche]: <AvalancheIcon />,
  [ChainId.Harmony]: <HarmonyIcon />,
  [ChainId.Optimism]: <OptimismIcon />,
}

export default function Network() {
  const { switchNetwork } = useEthers()
  const toggleViewingModal = useStore((state) => state.toggleViewingModal)

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
              {CHAIN_ICON[chain.chainId]} {chain.chainName}
            </Button>
          </div>
        ))}
      </Grid>
    </>
  )
}
