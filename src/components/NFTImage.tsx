import { OwnedNft } from 'alchemy-sdk'

export default function NFTImage({ nft }: { nft: OwnedNft }) {
  return (
    <>
      {nft.media[0].format &&
      ['png', 'svg+xml', 'jpg', 'gif'].includes(nft.media[0].format) ? (
        <img
          role={'img'}
          className="w-full"
          src={nft.media[0].thumbnail}
          alt={nft.title}
        />
      ) : nft.media[0].gateway && nft.media[0].gateway.length > 0 ? (
        <video
          role={'presentation'}
          className="w-full"
          src={nft.media[0].gateway}
          controls
        />
      ) : (
        <div className="w-full animate-pulse bg-gradient-to-r from-gray-500 to-gray-400" />
      )}
    </>
  )
}
