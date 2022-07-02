import React from 'react'
import { useEthers } from '@usedapp/core'
import makeBlockie from 'ethereum-blockies-base64'

import { BURN_ADDRESS } from '../../constants'
import Image from 'next/image'
export default function Avatar({ size = 64 }) {
  const { account } = useEthers()

  return (
    <Image
      src={makeBlockie(account ?? BURN_ADDRESS)}
      alt={account ?? BURN_ADDRESS}
      width={size}
      height={size}
      className="rounded-full"
      unoptimized
      layout="fixed"
    />
  )
}
