import { render } from '@testing-library/react'
import NFTImage from '../src/components/NFTImage'
import { OwnedNft } from 'alchemy-sdk'

describe('NFTImage component', () => {
  const nft: any = {
    media: [{ format: 'png', thumbnail: 'example.png', raw: '', gateway: '' }],
    title: 'Example NFT',
  }

  it('renders an image when media format is valid', () => {
    const { getByAltText } = render(<NFTImage nft={nft} />)
    const imgElement = getByAltText(nft.title)
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', nft.media[0].thumbnail)
  })

  it('renders a video when gateway is present', () => {
    const nftWithVideo: any = {
      media: [
        {
          format: 'png',
          thumbnail: 'example.png',
          raw: '',
          gateway: 'example.webm',
        },
      ],
      title: 'Example NFT',
    }
    const { getByRole } = render(<NFTImage nft={nftWithVideo} />)
    const videoElement = getByRole('video')
    expect(videoElement).toBeInTheDocument()
    expect(videoElement).toHaveAttribute('src', nftWithVideo.media[0].gateway)
  })

  it('does not render anything when media format and gateway are invalid', () => {
    const nftWithInvalidMedia: any = {
      media: [
        {
          format: 'pdf',
          thumbnail: 'example.png',
          raw: '',
          gateway: 'example.webm',
        },
      ],
      title: 'Example NFT',
    }
    const { container } = render(<NFTImage nft={nftWithInvalidMedia} />)
    expect(container.firstChild).toBeNull()
  })
})
