import React, { useCallback } from 'react'
import Skeleton from '../ui/Skeleton'
import { formatBalance } from '../../functions'
import { useCopyToClipboard } from 'react-use'
import Avatar from '../Avatar'
import Button from '../ui/Button'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { ClipboardCopyIcon, ExternalLinkIcon, LogoutIcon } from '@heroicons/react/outline'
import { useAscendSubgraph } from '../../hooks/useSubgraph'
import { useToast } from '../../hooks'
import Typography from '../ui/Typography'
import Grid from '../ui/Grid'
import { commify } from 'ethers/lib/utils'
import useStore from '../../store/useStore'
import ASCENDIcon from '../icons/ASCENDIcon'
import ExternalLink from '../ui/ExternalLink'
import { ZERO_ADDRESS } from '../../constants'

export default function Account() {
  const { account, deactivate } = useEthers()
  const tokenData = useAscendSubgraph(account)

  const [, setCopy] = useCopyToClipboard()
  const t = useToast()
  const toggleViewingModal = useStore((state) => state.toggleViewingModal)
  const setModalView = useStore((state) => state.setModalView)

  const handleLogout = useCallback(() => {
    deactivate()
    toggleViewingModal(false)
    t('info', 'Wallet disconnected')
  }, [deactivate, toggleViewingModal, t])

  return (
    <Grid gap="sm">
      <div className="col-span-12 place-self-center">
        <Avatar size={100} address={account ?? ZERO_ADDRESS} />
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

      <div className=" col-span-12 ">
        <div className="flex w-full flex-col items-center justify-evenly gap-3 rounded  bg-gradient-to-r from-ascend-purple to-ascend-magenta p-3 shadow-md  ">
          {' '}
          <ASCENDIcon />
          <div className="flex gap-9 ">
            <div className="flex flex-col text-center">
              <Typography className="text-xs md:text-sm">Balance</Typography>
              {tokenData ? commify(formatBalance(tokenData.balance)) : <Skeleton />}
            </div>{' '}
            <div className="flex flex-col text-center">
              <Typography className="text-xs md:text-sm">Staked</Typography>
              {tokenData ? commify(formatBalance(tokenData.stakedBalance)) : <Skeleton />}
            </div>{' '}
          </div>
          <Button color="green" onClick={() => setModalView('delegate')}>
            Delegate
          </Button>
        </div>
      </div>

      <div className=" col-span-12 flex  justify-center sm:col-span-6">
        {' '}
        <ExternalLink
          className="flex w-full justify-center"
          about="View on block explorer"
          href={`https://arbiscan.io/address/${account}`}
        >
          <Button size="sm" color="blue">
            <ExternalLinkIcon width={24} height={24} className="stroke-current" /> Block Explorer
          </Button>
        </ExternalLink>
      </div>
      <div className="col-span-12 flex justify-center sm:col-span-6">
        <Button size="sm" color="red" onClick={handleLogout}>
          <LogoutIcon className="stroke-current" width={24} height={24} /> Disconnect
        </Button>
      </div>
    </Grid>
  )
}
