'use client'
import React from 'react'
import { useToast, useUI, useWatchAsset } from '@/hooks'
import { VIEW } from '@/constants/enums'
import ExternalLink from './ui/ExternalLink'
import { useCopyToClipboard } from 'react-use'
import Avatar from './Avatar'
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsName,
  useNetwork,
} from 'wagmi'
import { commify, shortenString } from '@/utils'
import {
  ascensionRevenueDistributionTokenAddress,
  ascensionTokenAddress,
  useAscensionRevenueDistributionTokenBalanceOf,
  useAscensionTokenBalanceOf,
} from '@/wagmi/generated'
import CopySVG from 'public/assets/copy.svg'
import GoToSVG from 'public/assets/goto.svg'
import LogoutSVG from 'public/assets/logout.svg'
import DelegateSVG from 'public/assets/delegate.svg'
import { formatUnits } from 'viem'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { Dialog, DialogContent } from './ui/dialog'

export default function Account() {
  const [, setCopy] = useCopyToClipboard()
  const t = useToast()
  const { setModalView } = useUI()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: ethBalance, isFetched: ethBalanceIsFetched } = useBalance({
    address,
    enabled: !!address,
    watch: true,
  })
  const { data: ascendBalance, isFetched: ascendBalanceIsFetched } =
    useAscensionTokenBalanceOf({
      args: [address as `0x${string}`],
      enabled: !!address,
      watch: true,
    })
  console.debug(ascendBalance)

  const { data: stakedBalance, isFetched: stakedBalanceIsFetched } =
    useAscensionRevenueDistributionTokenBalanceOf({
      args: [address as `0x${string}`],
      enabled: !!address,
      watch: true,
    })

  const { data: ens } = useEnsName({
    address,
    enabled: !!address,
  })
  const watchAsset = useWatchAsset()

  return (
    <div className="space-y-3 p-3">
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <div className="mr-3 flex items-center gap-1">
          <Avatar size={32} address={address as string} />
          <p>{ens ?? shortenString(address as string, 9)}</p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="gray"
            aria-label="copy to clipboard"
            onClick={() => {
              setCopy(address || '')
              t('success', 'Copied address to clipboard')
            }}
            title="copy to clipboard"
          >
            <CopySVG className="h-4" />
          </Button>
          <ExternalLink
            aria-label="block explorer"
            about="View on block explorer"
            title="Block Explorer"
            href={`${chain?.blockExplorers?.default.url}/address/${address}`}
          >
            <Button variant="gray">
              <GoToSVG className="h-4" />
            </Button>
          </ExternalLink>
          <Button
            variant="destructive"
            title="logout"
            aria-label="logout"
            onClick={() => {
              disconnect()
            }}
          >
            <LogoutSVG className="h-4" />{' '}
          </Button>
        </div>
      </div>

      <div className=" flex h-full w-full items-center  justify-center   py-3 ">
        <div className="mx-auto w-36 text-center text-3xl">
          {ethBalanceIsFetched ? (
            ` ${commify(ethBalance?.formatted || '0', 2)} ${
              chain?.nativeCurrency.symbol
            }`
          ) : (
            <Skeleton className="h-5 w-24" />
          )}
        </div>
      </div>

      <div className=" flex flex-col gap-1 ">
        <button
          type="button"
          aria-label="watch-asset"
          className="flex w-full  items-center justify-start gap-3 rounded  bg-gradient-to-r from-purple to-pink p-2 shadow-md  "
          onClick={() => {
            watchAsset(
              ascensionTokenAddress,
              'ASCEND',
              18,
              'https://ipfs.io/ipfs/QmX6sXb4QuYoFsuBwox9ZCfCbXbxHaeHL9vYeYFt6qGr1y?filename=ascension.svg'
            )
          }}
        >
          <div className="flex gap-9 ">
            <div className="flex flex-col text-center">
              {ascendBalanceIsFetched ? (
                <span>
                  {commify(formatUnits(ascendBalance ?? 0n, 18), 2)} ASCEND
                </span>
              ) : (
                <Skeleton className="h-5 w-24" />
              )}
            </div>
          </div>
        </button>
        <button
          type="button"
          title="Add to Metamask"
          aria-label="watch-asset"
          className="flex w-full   items-center justify-start gap-3  rounded bg-gradient-to-r from-purple to-pink p-2 shadow-md "
          onClick={() => {
            watchAsset(
              ascensionRevenueDistributionTokenAddress,
              'xASCEND',
              18,
              'https://ipfs.io/ipfs/QmX6sXb4QuYoFsuBwox9ZCfCbXbxHaeHL9vYeYFt6qGr1y?filename=ascension.svg'
            )
          }}
        >
          <div className="flex gap-9 ">
            <div className="flex text-center">
              <div>
                {stakedBalanceIsFetched ? (
                  <span>
                    {commify(formatUnits(stakedBalance ?? 0n, 18), 2)} xASCEND
                  </span>
                ) : (
                  <Skeleton className="h-5 w-24" />
                )}
              </div>
            </div>
          </div>
        </button>
      </div>

      <Button
        className="w-full"
        variant={'green'}
        onClick={() => {
          setModalView(VIEW.DELEGATE)
        }}
      >
        <DelegateSVG className="h-5" />
        Delegate
      </Button>
    </div>
  )
}
