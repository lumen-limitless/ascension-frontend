import detectEthereumProvider from '@metamask/detect-provider'
import { ChainId } from '@usedapp/core'
import { RPC } from '../constants'

export const useSwitchNetwork = () => {
  return async (chainId: ChainId) => {
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
        if (switchError.code == 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: _chainId,
                  rpcUrl: RPC[chainId],
                },
              ],
            })
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
  }
}
