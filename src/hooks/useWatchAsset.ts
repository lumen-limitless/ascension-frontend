import { useToast } from './useToast'

// Add a token to the user's MetaMask wallet
export const useWatchAsset = () => {
  const t = useToast()
  const watchAsset = (
    tokenAddress: string,
    tokenSymbol: string,
    tokenDecimals: number,
    tokenImage: string
  ) => {
    try {
      const w = window as any

      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      w.ethereum
        ?.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        })
        .then((wasAdded: boolean) =>
          wasAdded
            ? t('success', 'Token added to MetaMask.')
            : t('error', 'Failed to add token.')
        )
    } catch (error) {
      console.log(error)
    }
  }

  return watchAsset
}
