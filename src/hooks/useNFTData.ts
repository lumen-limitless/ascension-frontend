import { OwnedNft } from 'alchemy-sdk'
import { useEffect } from 'react'
import { useSessionStorage } from 'react-use'
import { useAlchemySDK } from './useAlchemy'

interface NFTData {
  nfts: OwnedNft[]
  chainId: number
  owner: string
}
export const useNFTData = (
  address: string,
  chainId: number,
  pageKey?: number
) => {
  const [data, setData] = useSessionStorage<NFTData>(
    `NFTData_${address}_${chainId}`
  )
  const [lastUpdated, setLastUpdated] = useSessionStorage<number>(
    `NFTDataLastUpdated_${address}_${chainId}`
  )

  const alchemy = useAlchemySDK(chainId)

  useEffect(() => {
    if (lastUpdated > Date.now() - 300000) return
    console.debug(`running useNFTData for ${address} on chainId ${chainId}`)
    const getData = async () => {
      const nfts = await alchemy.nft.getNftsForOwner(address)

      setData({ nfts: nfts.ownedNfts, chainId: chainId, owner: address })
    }

    getData()
      .then(() => setLastUpdated(Date.now()))
      .catch((err) => console.error(err))
  }, [address, alchemy, chainId, lastUpdated, setData, setLastUpdated])

  return data
}
