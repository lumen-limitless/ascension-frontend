/// @dev CONVENTION parseFoo -> number

import { formatUnits } from '@ethersproject/units'
import { BigNumberish } from 'ethers'

export const parseBalance = (value: BigNumberish, decimals = 18) => {
  if (!value) return null
  return parseFloat(formatUnits(value, decimals))
}
