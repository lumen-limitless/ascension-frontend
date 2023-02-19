import { AvatarComponent } from '@rainbow-me/rainbowkit'
import { generateGradientFromAddress } from '../functions'

const Avatar: AvatarComponent = ({ address, ensImage, size }) => {
  const color = generateGradientFromAddress(address)
  return ensImage ? (
    <img
      alt="avatar"
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundImage: color,
        borderRadius: 999,
        height: size,
        width: size,
      }}
    ></div>
  )
}

export default Avatar
