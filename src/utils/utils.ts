import crypto from 'crypto'
export function generateGradientFromAddress(address?: string): string {
  if (!address) return ''
  // Hash the address using SHA-256
  const hash = crypto.createHash('sha256').update(address).digest('hex')
  // Take the first 6 characters of the hash
  const colorCode1 = hash.substring(0, 6)
  const colorCode2 = hash.substring(26, 32)
  // Create a linear gradient string
  const gradient = `linear-gradient(to right, #${colorCode1}, #${colorCode2})`
  // Return the gradient string
  return gradient
}

export function splitSignature(signature: string) {
  if (signature.length !== 132) {
    throw new Error('Invalid signature length')
  }

  const r = `0x${signature.slice(2, 66)}` as `0x${string}`
  const s = `0x${signature.slice(66, 130)}` as `0x${string}`
  const v = parseInt(`0x${signature.slice(130, 132)}`, 16)

  console.log('r component:', r)
  console.log('s component:', s)
  console.log('v component:', v)

  return { r, s, v }
}
