import { ChainId } from '@usedapp/core'
import React from 'react'
import ArbitrumIcon from './networks/ArbitrumIcon'
import AvalancheIcon from './networks/AvalancheIcon'
import BscIcon from './networks/BscIcon'
import EthereumIcon from './networks/EthereumIcon'
import FantomIcon from './networks/FantomIcon'
import GnosisIcon from './networks/GnosisIcon'
import HardhatIcon from './networks/HardhatIcon'
import HarmonyIcon from './networks/HarmonyIcon'
import OptimismIcon from './networks/OptimismIcon'
import PolygonIcon from './networks/PolygonIcon'

const CHAIN_ICON = {
  [ChainId.Hardhat]: <HardhatIcon />,
  [ChainId.ArbitrumRinkeby]: <ArbitrumIcon />,
  [ChainId.Arbitrum]: <ArbitrumIcon />,
  [ChainId.Mainnet]: <EthereumIcon />,
  [ChainId.Goerli]: <EthereumIcon />,
  [ChainId.Fantom]: <FantomIcon />,
  [ChainId.Polygon]: <PolygonIcon />,
  [ChainId.xDai]: <GnosisIcon />,
  [ChainId.BSC]: <BscIcon />,
  [ChainId.Avalanche]: <AvalancheIcon />,
  [ChainId.Harmony]: <HarmonyIcon />,
  [ChainId.Optimism]: <OptimismIcon />,
}

export default function ChainIcon({ chainId }: { chainId: ChainId }) {
  return <>{CHAIN_ICON[chainId]}</>
}
