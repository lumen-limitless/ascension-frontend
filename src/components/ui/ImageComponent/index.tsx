import { startsWith } from 'lodash'
import Image, { ImageLoader, ImageProps } from 'next/image'

export default function ImageComponent({ src, alt = '', ...rest }: ImageProps) {
  const myLoader: ImageLoader = ({ src }) => {
    if (startsWith(src, 'http')) return src
    return `https://res.cloudinary.com/ascension-protocol/image/upload/v1655240855/ASCENSION${src}`
  }
  return <Image loader={myLoader} src={src} alt={alt} {...rest} />
}
