import React from 'react'
import makeBlockie from 'ethereum-blockies-base64'
import Image from 'next/image'
import { ethers } from 'ethers'

export default function Avatar({
  size = 64,
  address = ethers.constants.AddressZero,
}: {
  size?: number
  address?: string
}) {
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
