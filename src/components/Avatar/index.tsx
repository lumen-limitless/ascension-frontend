import React from 'react'
import { useEthers } from '@usedapp/core'
import makeBlockie from 'ethereum-blockies-base64'
import { BURN_ADDRESS, ZERO_ADDRESS } from '../../constants'
import Image from 'next/image'

interface AvaterProps {
  size?: number
  address?: string
}
export default function Avatar({ size = 64, address = ZERO_ADDRESS }: AvaterProps) {
  return (
    <Image
      src={makeBlockie(address)}
      alt={address}
      width={size}
      height={size}
      className="rounded-full"
      unoptimized
      layout="fixed"
    />
  )
}
