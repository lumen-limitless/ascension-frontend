import React from "react"
import makeBlockie from "ethereum-blockies-base64"

import { ethers } from "ethers"

export default function Avatar({
  size = 64,
  address = ethers.constants.AddressZero,
}: {
  size?: number
  address?: string
}) {
  return (
    <img
      src={makeBlockie(address)}
      alt={address}
      width={size}
      height={size}
      className="rounded-full"
    />
  )
}
