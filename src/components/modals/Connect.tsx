import React, { useCallback } from 'react'
import Button from '../ui/Button'
import { RPC } from '../../constants'
import { useEthers } from '@usedapp/core'
import { useToast, useUI } from '../../hooks'
import WalletConnectIcon from '../icons/WalletConnectIcon'
import MetaMaskIcon from '../icons/MetaMaskIcon'

export default function Connect() {
  const { chainId } = useEthers()
  const { activateBrowserWallet, activate } = useEthers()
  const { toggleViewingModal } = useUI()
  const t = useToast()

  const onWalletConnect = useCallback(async () => {
    try {
      const WalletConnectProvider = await import(
        '@walletconnect/web3-provider'
      ).then((mod) => mod.default)
      const provider = new WalletConnectProvider({ chainId: chainId, rpc: RPC })
      await provider.enable()
      await activate(provider)
      toggleViewingModal(false)
    } catch (err) {
      t('error', err?.message)
    }
  }, [chainId, toggleViewingModal, activate, t])

  return (
    <>
      <div className="my-3 flex flex-col items-center gap-3 pb-12 md:pb-0">
        <span className="mb-3 text-xl">Select a Wallet</span>
        <Button
          color="gray"
          onClick={() => {
            activateBrowserWallet()
            toggleViewingModal(false)
          }}
        >
          <MetaMaskIcon />
          MetaMask
        </Button>

        <Button color="gray" onClick={() => onWalletConnect()}>
          <WalletConnectIcon />
          WalletConnect
        </Button>
      </div>
    </>
  )
}
