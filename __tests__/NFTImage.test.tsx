import { render, screen } from '@testing-library/react'
import NFTImage from '../src/components/NFTImage'
import '@testing-library/jest-dom'

describe('NFTImage', () => {
  it('should show an <img> tag if the item has an image content', () => {
    let nft: any = {
      title: 'my awesome NFT',
      media: [
        {
          thumbnail:
            'https://i.seadn.io/gcs/files/12ba9bfad9beba840fb785587e86e4a8.png?auto=format&w=1000',
          format: 'png',
        },
      ],
    }
    render(<NFTImage nft={nft} />)
    expect(screen.getByAltText(nft.title)).toBeInTheDocument()
  })
})
