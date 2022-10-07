import React, { useCallback } from 'react'
import Skeleton from '../ui/Skeleton'
import { formatBalance } from '../../functions'
import { useCopyToClipboard } from 'react-use'
import Avatar from '../Avatar'
import Button from '../ui/Button'
import {
  shortenIfAddress,
  useEtherBalance,
  useEthers,
  useLookupAddress,
} from '@usedapp/core'
import {
  ClipboardCopyIcon,
  ExternalLinkIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import {
  useASCENDBalance,
  useStakedASCENDBalance,
  useToast,
  useUI,
} from '../../hooks'
import Typography from '../ui/Typography'
import Grid from '../ui/Grid'
import { commify } from 'ethers/lib/utils'
import ExternalLink from '../ui/ExternalLink'
import Logo from '../ui/Logo'
import Delegate from './Delegate'
import { CHAIN_SYMBOL } from '../../constants'
import { ethers } from 'ethers'

export default function Account() {
  const { account, deactivate, chainId } = useEthers()
  const { ens } = useLookupAddress(account)
  const balance = useEtherBalance(account)
  const ascendBalance = useASCENDBalance(account)
  const stakedBalance = useStakedASCENDBalance(account)

  const [, setCopy] = useCopyToClipboard()
  const t = useToast()
  const { setModalView, toggleViewingModal } = useUI()

  const handleLogout = useCallback(() => {
    deactivate()
    toggleViewingModal(false)
    t('info', 'Wallet disconnected')
  }, [deactivate, toggleViewingModal, t])

  return (
    <Grid gap="sm" className="pb-9">
      <div className="col-span-12 place-self-center">
        <Avatar size={100} address={account ?? ethers.constants.AddressZero} />
      </div>
      <div className="col-span-12 flex  items-center justify-center rounded bg-dark-1000  text-center  shadow-md sm:col-span-9">
        <div className="w-full py-2">
          {' '}
          <Typography as="p">{ens ?? shortenIfAddress(account)}</Typography>
        </div>

        <div className=" flex h-full w-full items-center  justify-center rounded-r bg-blue py-2   shadow-md">
          {formatBalance(balance) || <Skeleton />} {CHAIN_SYMBOL[chainId]}
        </div>
      </div>
      <div className="col-span-4 sm:col-span-1">
        <Button
          size="sm"
          aria-label="copy to clipboard"
          onClick={() => {
            setCopy(account)
            t('success', 'Copied address to clipboard')
          }}
          color="green"
          title="copy to clipboard"
        >
          <ClipboardCopyIcon width={24} height={24} />
        </Button>
      </div>
      <div className="col-span-4 sm:col-span-1">
        <ExternalLink
          aria-label="block explorer"
          className="flex w-full justify-center"
          about="View on block explorer"
          href={`https://arbiscan.io/address/${account}`}
        >
          <Button size="sm" color="blue" title="block explorer">
            <ExternalLinkIcon
              width={24}
              height={24}
              className="stroke-current"
            />
          </Button>
        </ExternalLink>
      </div>
      <div className="col-span-4 sm:col-span-1">
        <Button
          size="sm"
          color="red"
          title="logout"
          aria-label="logout"
          onClick={handleLogout}
        >
          <LogoutIcon className="stroke-current" width={24} height={24} />{' '}
        </Button>
      </div>
      <div className=" col-span-6 ">
        <div className="flex w-full  items-center justify-evenly gap-3 rounded  bg-gradient-to-r from-purple to-pink p-3 shadow-md  ">
          <div className="rounded-full bg-zinc-100 p-1">
            <Logo size={24} />
          </div>

          <div className="flex gap-9 ">
            <div className="flex flex-col text-center">
              {ascendBalance ? (
                commify(formatBalance(ascendBalance))
              ) : (
                <Skeleton />
              )}{' '}
            </div>{' '}
          </div>
        </div>
      </div>
      <div className=" col-span-6 ">
        <div className="flex w-full  items-center justify-evenly gap-3 rounded  bg-gradient-to-r from-pink to-purple p-3 shadow-md  ">
          <div className="rounded-full bg-zinc-100 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
              className=" text-yellow"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
              />
            </svg>
          </div>
          <div className="flex gap-9 ">
            <div className="flex text-center">
              {stakedBalance ? (
                commify(formatBalance(stakedBalance))
              ) : (
                <Skeleton />
              )}{' '}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 flex items-center justify-center">
        {' '}
        <Button color="green" onClick={() => setModalView(<Delegate />)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6  text-primary"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M13.5 9h-1.268l1.732-3a1 1 0 0 0-.366-1.366L11 3.134a1 1 0 0 0-1.366.366l-2.5 4.33A1 1 0 0 0 7.257 9H6.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1Zm-3-5l2.598 1.5l-2.02 3.5H9.16L8 8.33L10.5 4Zm4.037 3l-.577 1h.54l2.25 3H3.25L5.5 8h.406a.961.961 0 0 1 .078-.17l.48-.83H5.5a1 1 0 0 0-.8.4l-2.5 3.333a1 1 0 0 0-.2.6V16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.667a1 1 0 0 0-.2-.6L15.3 7.4a1 1 0 0 0-.763-.4Z"
            />
          </svg>
          Delegate
        </Button>
      </div>
    </Grid>
  )
}
