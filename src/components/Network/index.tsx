import { ChainId, useEthers } from '@usedapp/core'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { useBoolean } from 'react-use'
import { SUPPORTED_CHAINS } from '../../constants'
import { useSwitchNetwork } from '../../hooks'
import Button from '../ui/Button'
import Divider from '../ui/Divider'
import Grid from '../ui/Grid'
import Modal from '../ui/Modal'
import Spinner from '../ui/Spinner'
import Typography from '../ui/Typography'

const ArbitrumIcon = dynamic(() => import('../icons/networks/ArbitrumIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const EthereumIcon = dynamic(() => import('../icons/networks/EthereumIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const HardhatIcon = dynamic(() => import('../icons/networks/HardhatIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const AvalancheIcon = dynamic(() => import('../icons/networks/AvalancheIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const HarmonyIcon = dynamic(() => import('../icons/networks/HarmonyIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const BscIcon = dynamic(() => import('../icons/networks/BscIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const PolygonIcon = dynamic(() => import('../icons/networks/PolygonIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const GnosisIcon = dynamic(() => import('../icons/networks/GnosisIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})
const FantomIcon = dynamic(() => import('../icons/networks/FantomIcon'), {
  ssr: false,
  loading: () => <Spinner />,
})

const CHAIN_ICON = {
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
}

const Network: FC = () => {
  const { chainId } = useEthers()
  const [viewing, toggle] = useBoolean(false)
  const switchNetwork = useSwitchNetwork()

  return (
    <>
      <Button className="border border-dark-900" onClick={toggle}>
        {chainId && CHAIN_ICON[chainId]}
      </Button>

      {viewing && (
        <Modal isOpen={viewing} onDismiss={toggle}>
          <div className="w-full pb-3">
            {' '}
            <Typography as="h1" variant="xl" centered className="pb-1">
              Choose Network
            </Typography>
            <Divider />
          </div>

          <Grid gap="md">
            {SUPPORTED_CHAINS.map((chain) => (
              <div key={chain.chainId} className="col-span-6">
                <Button
                  color="gray"
                  onClick={() => {
                    switchNetwork(chain.chainId).then(() => {
                      toggle()
                    })
                  }}
                >
                  {CHAIN_ICON[chain.chainId]} {chain.chainName}
                </Button>
              </div>
            ))}
          </Grid>
        </Modal>
      )}
    </>
  )
}

export default Network
