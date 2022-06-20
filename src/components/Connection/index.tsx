import React, { FC } from 'react'
import Button from '../ui/Button'
import { RPC } from '../../constants'
import { ChainId, useEthers } from '@usedapp/core'
import { useToast } from '../../hooks'
import { useBoolean } from 'react-use'
import { LoginIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Spinner from '../ui/Spinner'
import { Icon } from '@iconify/react'

const Modal = dynamic(() => import('../ui/Modal'), { ssr: false })
const Account = dynamic(() => import('../Account'), { ssr: false })

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

export default function Connection() {
  const { account, chainId } = useEthers()
  const { activateBrowserWallet, activate } = useEthers()
  const [viewing, toggle] = useBoolean(false)
  const t = useToast()

  const onWalletConnect = async () => {
    try {
      const WalletConnectProvider = await import('@walletconnect/web3-provider').then(
        (mod) => mod.default
      )
      const provider = new WalletConnectProvider({ chainId: chainId, rpc: RPC })
      await provider.enable()
      await activate(provider as any)
      toggle()
    } catch (err) {
      t('error', err?.message)
    }
  }

  return (
    <>
      {!account ? (
        <>
          <Button color="blue" onClick={toggle}>
            <LoginIcon width={20} /> Connect Wallet
          </Button>
          <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
            <div className="my-3 flex flex-col items-center gap-3">
              <span className="mb-3 text-xl">Select a Wallet</span>
              <Button
                color="gray"
                onClick={() => {
                  activateBrowserWallet()
                  toggle()
                }}
              >
                <Icon icon="logos:metamask-icon" width={24} />
                MetaMask
              </Button>

              <Button color="gray" onClick={() => onWalletConnect()}>
                WalletConnect
              </Button>
            </div>
          </Modal>
        </>
      ) : (
        <div className="flex gap-2">
          <Button className="border border-dark-900">{CHAIN_ICON[chainId ?? 1]}</Button>
          <Account />
        </div>
      )}
    </>
  )
}
