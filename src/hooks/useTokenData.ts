// import { useEffect } from 'react'
// import { BigNumber } from 'ethers'
// import { formatUnits } from 'ethers/lib/utils'
// import { useSessionStorage } from 'react-use'
// import { useAlchemySDK } from './useAlchemy'
// import axios from 'axios'

// const COINGECKO_PLATFORM_BY_CHAINID: { [chainId: number]: string } = {
//   1: 'ethereum',
//   42161: 'arbitrum-one',
// }

// export const useTokenData = (address: string, chainId: number) => {
//   const [data, setData] = useSessionStorage<TokenData[]>(
//     `TokenData_${address}_${chainId}`
//   )
//   const [lastUpdated, setLastUpdated] = useSessionStorage<number>(
//     `TokenDataLastUpdated_${address}_${chainId}`
//   )

//   const alchemy = useAlchemySDK(chainId)

//   useEffect(() => {
//     if (lastUpdated > Date.now() - 300000) return
//     console.debug(`running useTokenData for ${address} on chainId ${chainId}`)
//     const getData = async () => {
//       const d: TokenData[] = []

//       const balances = await alchemy.core.getTokenBalances(address)
//       const prices = await axios
//         .get<{ [address: string]: { usd: number } }>(
//           `https://api.coingecko.com/api/v3/simple/token_price/${
//             COINGECKO_PLATFORM_BY_CHAINID[chainId]
//           }?contract_addresses=${
//             balances.tokenBalances[0].contractAddress
//           }%2C${balances.tokenBalances
//             .map((bal) => bal.contractAddress)
//             .join('%2C')}&vs_currencies=usd`
//         )
//         .then((res) => res.data)

//       for (const balance of balances.tokenBalances) {
//         if (balance.error) return
//         const metadata = await alchemy.core.getTokenMetadata(
//           balance.contractAddress
//         )

//         d.push({
//           contractAddress: balance.contractAddress,
//           tokenBalance: parseFloat(
//             formatUnits(
//               BigNumber.from(balance.tokenBalance),
//               metadata?.decimals || 18
//             )
//           ),
//           priceUSD: prices[balance.contractAddress]?.usd || 0,
//           owner: address,
//           chainId: chainId,
//           tokenMetadata: metadata,
//         })
//       }

//       setData(d)
//     }

//     getData()
//       .then(() => setLastUpdated(Date.now()))
//       .catch((err) => console.error(err))
//   }, [address, alchemy, chainId, lastUpdated, setData, setLastUpdated])

//   return data
// }
