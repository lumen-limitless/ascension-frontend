import React from 'react'
import Button from '../Button'
import AccountInfo from '../AccountInfo'
import { CHAIN_IMG, CHAIN_NAME, HOME_CHAINID } from '../../constants'
import { useEthers } from '@usedapp/core'
import Image from 'next/image'
import ConnectButton from '../Button/ConnectButton'

export default function Connection() {
  const { account, chainId } = useEthers()

  return (
    <>
      {!account ? (
        <ConnectButton />
      ) : (
        <>
          <div className="flex gap-2">
            <Button size="sm" variant="outlined" color="gray">
              {chainId && (
                <Image
                  about={CHAIN_NAME[chainId ?? HOME_CHAINID]}
                  width={24}
                  height={24}
                  src={CHAIN_IMG[chainId ?? HOME_CHAINID]}
                  alt={CHAIN_NAME[chainId ?? HOME_CHAINID]}
                ></Image>
              )}
            </Button>
            <AccountInfo />
          </div>
        </>
      )}
    </>
  )
}
