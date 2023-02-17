import React from 'react'
import Skeleton from './ui/Skeleton'
import Button from './ui/Button'
import { useToast, useUI, useWatchAsset } from '../hooks'
import Logo from './ui/Logo'
import { ASCENSION } from '../constants'
import { VIEW } from '../constants/enums'
import ExternalLink from './ui/ExternalLink'
import { useCopyToClipboard } from 'react-use'
import Avatar from './Avatar'
import Typography from './ui/Typography'
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsName,
  useNetwork,
} from 'wagmi'
import { formatBalance, shortenString } from '../functions'
import { BigNumberish } from 'ethers'
import { useAscensionTokenBalanceOf } from '../wagmi/generated'
import { commify } from '@ethersproject/units'

export default function Account() {
  const [, setCopy] = useCopyToClipboard()
  const t = useToast()
  const { setModalView } = useUI()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: balance, isFetched: isBalanceFetched } = useBalance({ address })
  const { data: ascendBalance, isFetched: isAscendBalanceFetched } =
    useAscensionTokenBalanceOf({
      args: [address as `0x${string}`],
      watch: true,
      chainId: 42161,
    })
  console.debug(balance)
  const { data: ens } = useEnsName(address)
  const watchAsset = useWatchAsset()

  return (
    <div className="space-y-3 p-3">
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <div className="mr-3 flex items-center gap-1">
          <Avatar size={32} address={address as string} />
          <Typography as="p">
            {ens ?? shortenString(address as string, 9)}
          </Typography>
        </div>
        <div className="flex gap-1">
          <Button
            color="gray"
            aria-label="copy to clipboard"
            onClick={() => {
              setCopy(address as string)
              t('success', 'Copied address to clipboard')
            }}
            title="copy to clipboard"
          >
            <svg
              className="h-4 w-4 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
            </svg>
          </Button>
          <ExternalLink
            aria-label="block explorer"
            about="View on block explorer"
            title="Block Explorer"
            href={`${chain?.blockExplorers?.default.url}/address/${address}`}
          >
            <Button color="gray">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </Button>
          </ExternalLink>
          <Button
            color="gray"
            title="logout"
            aria-label="logout"
            onClick={() => {
              disconnect()
            }}
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className=" flex h-full w-full items-center  justify-center   py-3 ">
        <div className="mx-auto w-36 text-center text-3xl">
          {isBalanceFetched ? (
            ` ${formatBalance(balance?.value as BigNumberish, 18, 3)} ${
              chain?.nativeCurrency.symbol
            }`
          ) : (
            <Skeleton />
          )}
        </div>
      </div>

      <div className=" flex flex-col gap-1 sm:flex-row">
        <button
          type="button"
          aria-label="watch-asset"
          className="flex w-full  items-center justify-start gap-3 rounded  bg-gradient-to-r from-purple to-pink p-2 shadow-md  "
          onClick={() => {
            watchAsset(
              ASCENSION.AscensionToken.address,
              'ASCEND',
              18,
              'https://ipfs.io/ipfs/QmX6sXb4QuYoFsuBwox9ZCfCbXbxHaeHL9vYeYFt6qGr1y?filename=ascension.svg'
            )
          }}
        >
          <div className="rounded-full bg-zinc-100 p-1">
            <Logo className="h-6 w-6" />
          </div>

          <div className="flex gap-9 ">
            <div className="flex flex-col text-center">
              {isAscendBalanceFetched ? (
                commify(formatBalance(ascendBalance as BigNumberish) as string)
              ) : (
                <Skeleton />
              )}
            </div>
          </div>
        </button>
        {/* <button
          type="button"
          aria-label="watch-asset"
          className="flex w-full   items-center justify-start gap-3  rounded bg-gradient-to-r from-purple to-pink p-2 shadow-md "
          onClick={() => {
            watchAsset(
              ASCENSION.AscensionStakedToken.address,
              'sASCEND',
              18,
              'https://ipfs.io/ipfs/QmX6sXb4QuYoFsuBwox9ZCfCbXbxHaeHL9vYeYFt6qGr1y?filename=ascension.svg'
            )
          }}
        >
          <div className="rounded-full bg-zinc-100 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
              className=" h-6 w-6 text-yellow"
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
              {false ? 'insert bal' : <Skeleton />}
            </div>
          </div>
        </button> */}
      </div>

      <Button full color="green" onClick={() => setModalView(VIEW.DELEGATE)}>
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
  )
}
