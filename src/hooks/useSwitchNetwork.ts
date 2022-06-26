import detectEthereumProvider from '@metamask/detect-provider'
import { ChainId } from '@usedapp/core'
import { useCallback } from 'react'
import { CHAIN_NAME, RPC } from '../constants'
import useToast from './useToast'

export const useSwitchNetwork = () => {
  const t = useToast()
  return useCallback(
    async (chainId: ChainId) => {
      const _chainId = `0x${chainId.toString(16)}`
      const ethereum: any = await detectEthereumProvider()

      if (ethereum) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: _chainId }],
          })
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask.
          t('info', 'Add network to MetaMask')
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: _chainId,
                    chainName: CHAIN_NAME[chainId],
                    rpcUrls: [RPC[chainId]],
                  },
                ],
              })
            } catch (addError) {
              console.error(addError)
              t('error', `Error adding network`)
            }
          }
          console.error('Unhandled switch network error')
        }
      }
    },
    [t]
  )
}
