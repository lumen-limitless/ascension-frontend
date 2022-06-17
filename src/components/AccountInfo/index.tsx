import React from 'react'
import Skeleton from '../ui/Skeleton'
import { formatBalance } from '../../functions'
import { useCopyToClipboard, useToggle } from 'react-use'
import Modal from '../ui/Modal'
import Avatar from '../Avatar'
import Button from '../ui/Button'
import { shortenIfAddress, useEthers, useLookupAddress } from '@usedapp/core'
import { ClipboardCopyIcon, ExternalLinkIcon, LogoutIcon } from '@heroicons/react/outline'
import { useAscendSubgraph } from '../../hooks/useSubgraph'
import { useToast } from '../../hooks'
import Image from 'next/image'
import ImageComponent from '../ui/ImageComponent'

export default function AccountInfo() {
  const { account, deactivate } = useEthers()

  const tokenData = useAscendSubgraph(account)
  const [viewing, toggle] = useToggle(false)
  const [, setCopy] = useCopyToClipboard()
  const t = useToast()
  return (
    <>
      <Button className="border border-dark-900" onClick={() => toggle(true)}>
        <Avatar size={20} />
      </Button>

      {viewing && (
        <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
          <div className="my-3 flex w-full flex-col items-center justify-center ">
            <Avatar size={100} />
            <div className="mt-3 flex w-full items-center justify-center rounded bg-dark-1000 px-6 py-3 shadow-md">
              {shortenIfAddress(account)}{' '}
              <ClipboardCopyIcon
                width={20}
                onClick={() => {
                  setCopy(account)
                  t('success', 'Copied address to clipboard')
                }}
                cursor="pointer"
                className="ml-1 text-secondary"
              />
            </div>
          </div>
          <div className="mb-3 flex w-full items-center justify-evenly rounded bg-gradient-to-r from-ascend-purple to-ascend-magenta px-3 py-3 shadow-md ">
            <ImageComponent
              src="/circle-coin_weqrld.png"
              height={72}
              width={72}
              alt="ASCEND balance"
            />
            <div className="flex w-full flex-col items-center">
              <span className="text-xs md:text-sm">Balance</span>
              <span>{tokenData ? formatBalance(tokenData.balance) : <Skeleton />}</span>
            </div>{' '}
            <div className="flex w-full flex-col items-center">
              <span className="text-xs md:text-sm">Staked</span>
              {tokenData ? formatBalance(tokenData.stakedBalance) : <Skeleton />}
            </div>{' '}
          </div>
          <div className="flex gap-1">
            {' '}
            <a
              className="w-full"
              about="View on block explorer"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://arbiscan.io/address/${account}`}
            >
              <Button size="sm" color="blue">
                <ExternalLinkIcon width={16} height={16} className="stroke-current" /> Block
                Explorer
              </Button>
            </a>
            <Button size="sm" color="red" onClick={deactivate}>
              <LogoutIcon className="stroke-current" width={16} height={16} /> Disconnect
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
