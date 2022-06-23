import React from 'react'
import Skeleton from '../ui/Skeleton'
import { formatBalance } from '../../functions'
import { useCopyToClipboard, useToggle } from 'react-use'
import Modal from '../ui/Modal'
import Avatar from '../Avatar'
import Button from '../ui/Button'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { ClipboardCopyIcon, ExternalLinkIcon, LogoutIcon } from '@heroicons/react/outline'
import { useAscendSubgraph } from '../../hooks/useSubgraph'
import { useToast } from '../../hooks'
import ImageComponent from '../ui/ImageComponent'
import Typography from '../ui/Typography'
import Grid from '../ui/Grid'

export default function Account() {
  const { account, deactivate } = useEthers()

  const tokenData = useAscendSubgraph(account)
  const [viewing, toggle] = useToggle(false)
  const [, setCopy] = useCopyToClipboard()
  const t = useToast()
  return (
    <>
      <Button className="border border-dark-900" onClick={() => toggle(true)}>
        <Avatar size={24} />
      </Button>

      {viewing && (
        <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
          <Grid gap="sm">
            <div className="col-span-12 place-self-center">
              <Avatar size={100} />
            </div>

            <div className="col-span-12 mt-3 flex w-full items-center justify-center rounded bg-dark-1000 px-6 py-3 shadow-md">
              <Typography>{shortenIfAddress(account)}</Typography>
              <ClipboardCopyIcon
                width={24}
                onClick={() => {
                  setCopy(account)
                  t('success', 'Copied address to clipboard')
                }}
                cursor="pointer"
                className="ml-1 text-secondary"
              />
            </div>

            <div className=" col-span-12 flex w-full items-center justify-evenly rounded bg-gradient-to-r from-ascend-purple to-ascend-magenta px-3 py-3 shadow-md ">
              <ImageComponent
                src="/circle-coin_weqrld.png"
                height={72}
                width={72}
                alt="ASCEND balance"
              />
              <div className="flex w-full flex-col items-center">
                <Typography className="text-xs md:text-sm">Balance</Typography>
                <Typography>
                  {tokenData ? formatBalance(tokenData.balance) : <Skeleton />}
                </Typography>
              </div>{' '}
              <div className="flex w-full flex-col items-center">
                <Typography className="text-xs md:text-sm">Staked</Typography>
                {tokenData ? formatBalance(tokenData.stakedBalance) : <Skeleton />}
              </div>{' '}
            </div>

            <div className="col-span-6">
              {' '}
              <a
                className="w-full"
                about="View on block explorer"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://arbiscan.io/address/${account}`}
              >
                <Button size="sm" color="blue">
                  <ExternalLinkIcon width={24} height={24} className="stroke-current" /> Block
                  Explorer
                </Button>
              </a>
            </div>
            <div className="col-span-6">
              <Button size="sm" color="red" onClick={deactivate}>
                <LogoutIcon className="stroke-current" width={24} height={24} /> Disconnect
              </Button>
            </div>
          </Grid>
        </Modal>
      )}
    </>
  )
}
