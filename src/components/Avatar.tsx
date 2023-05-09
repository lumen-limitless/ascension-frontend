import { AvatarComponent } from '@rainbow-me/rainbowkit'
import { generateGradientFromAddress } from '../utils'

const Avatar: AvatarComponent = ({ address, ensImage, size }) => {
  const color = generateGradientFromAddress(address)
  return ensImage ? (
    <img
      alt="avatar"
      src={ensImage}
      width={size}
      height={size}
      className="overflow-clip rounded-full ring"
    />
  ) : (
    <div
      style={{
        backgroundImage: color,
        height: size,
        width: size,
      }}
      className="overflow-clip rounded-full ring"
    />
  )
}

export default Avatar
