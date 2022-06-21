import { ChainId, useEthers } from '@usedapp/core'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'

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

  return <Button className="border border-dark-900">{chainId && CHAIN_ICON[chainId]}</Button>
}

export default Network
