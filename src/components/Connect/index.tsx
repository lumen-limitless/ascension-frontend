import React, { FC, useCallback } from 'react'
import Button from '../ui/Button'
import { RPC } from '../../constants'
import { useEthers } from '@usedapp/core'
import { useToast } from '../../hooks'
import { useBoolean } from 'react-use'
import { LoginIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import WalletConnectIcon from '../icons/WalletConnectIcon'
import MetaMaskIcon from '../icons/MetaMaskIcon'

const Modal = dynamic(() => import('../ui/Modal'), { ssr: false })

const Connect: FC = () => {
  const { account, chainId } = useEthers()
  const { activateBrowserWallet, activate } = useEthers()
  const [viewing, toggle] = useBoolean(false)
  const t = useToast()

  const onWalletConnect = useCallback(async () => {
    try {
      const WalletConnectProvider = await import('@walletconnect/web3-provider').then(
        (mod) => mod.default
      )
      const provider = new WalletConnectProvider({ chainId: chainId, rpc: RPC })
      await provider.enable()
      await activate(provider)
      toggle()
    } catch (err) {
      t('error', err?.message)
    }
  }, [chainId, toggle, activate, t])

  return (
    <>
      {!account && (
        <>
          <Button color="blue" onClick={toggle}>
            <LoginIcon height={24} /> Connect Wallet
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
                <MetaMaskIcon />
                MetaMask
              </Button>

              <Button color="gray" onClick={() => onWalletConnect()}>
                <WalletConnectIcon />
                WalletConnect
              </Button>
            </div>
          </Modal>
        </>
      )}
    </>
  )
}

export default Connect
