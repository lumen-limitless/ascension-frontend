import { OwnedNft } from 'alchemy-sdk'

export default function NFTImage({ nft }: { nft: OwnedNft }) {
  return (
    <>
      {nft.media[0].format &&
      ['png', 'svg+xml', 'jpg', 'webm'].includes(nft.media[0].format) ? (
        <img
          className="h-48 w-48"
          src={nft.media[0].thumbnail}
          alt={nft.title}
        />
      ) : nft.media[0].gateway ? (
        <video className="h-48 w-48" src={nft.media[0].gateway} controls />
      ) : null}
    </>
  )
}
