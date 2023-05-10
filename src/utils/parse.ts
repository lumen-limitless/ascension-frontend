/// @dev CONVENTION parseFoo -> number

import { formatUnits } from 'viem'

export const parseBalance = (value: bigint, decimals = 18) => {
  if (!value) return null
  return parseFloat(formatUnits(value, decimals))
}
