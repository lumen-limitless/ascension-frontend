import { formatBalance, isAddress, shortenString } from '../functions'
import Button from '../components/ui/Button'
import Loader from '../components/ui/Loader'
import Skeleton from '../components/ui/Skeleton'
import { useBoolean } from 'react-use'
import { useState } from 'react'
import Input from '../components/ui/Input'
import Avatar from '../components/Avatar'
import ChainIcon from '../components/ChainIcon'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import {
  useAscensionRevenueDistributionTokenBalanceOf,
  useAscensionRevenueDistributionTokenDelegates,
  useAscensionRevenueDistributionTokenGetAssetVotes,
  useAscensionTokenBalanceOf,
  useAscensionTokenDelegates,
  useAscensionTokenGetVotes,
  usePrepareAscensionRevenueDistributionTokenDelegate,
  usePrepareAscensionTokenDelegate,
} from '../wagmi/generated'
import WagmiTransactionButton from '../components/WagmiTransactionButton'
import { commify } from '@ethersproject/units'
import { CHAIN_ID } from '../constants'

export default function Delegate() {
  const [token, setToken] = useState<'ASCEND' | 'xASCEND'>('ASCEND')
  const [delegating, toggleDelegating] = useBoolean(false)
  const [delegateAddress, setDelegateAddress] = useState<string>('')
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()

  const { config: delegateConfig } = usePrepareAscensionTokenDelegate({
    args: [
      delegating
        ? (delegateAddress as `0x${string}`)
        : (address as `0x${string}`),
    ],
  })

  const { config: stakedDelegateConfig } =
    usePrepareAscensionRevenueDistributionTokenDelegate({
      args: [
        delegating
          ? (delegateAddress as `0x${string}`)
          : (address as `0x${string}`),
      ],
    })

  const { data: balance } = useAscensionTokenBalanceOf({
    args: [address as `0x${string}`],
    enabled: !!address,
    watch: true,
    chainId: CHAIN_ID,
  })

  const { data: votes } = useAscensionTokenGetVotes({
    args: [address as `0x${string}`],
    enabled: !!address,
    watch: true,
    chainId: CHAIN_ID,
  })

  const { data: delegates } = useAscensionTokenDelegates({
    args: [address as `0x${string}`],
    enabled: !!address,
    watch: true,
    chainId: CHAIN_ID,
  })

  const { data: stakedBalance } = useAscensionRevenueDistributionTokenBalanceOf(
    {
      args: [address as `0x${string}`],
      enabled: !!address,
      watch: true,
      chainId: CHAIN_ID,
    }
  )

  const { data: stakedVotes } =
    useAscensionRevenueDistributionTokenGetAssetVotes({
      args: [address as `0x${string}`],
      enabled: !!address,
      watch: true,
      chainId: CHAIN_ID,
    })

  const { data: stakedDelegates } =
    useAscensionRevenueDistributionTokenDelegates({
      args: [address as `0x${string}`],
      enabled: !!address,
      watch: true,
      chainId: CHAIN_ID,
    })

  return (
    <>
      <div className=" my-6 space-y-3">
        {' '}
        <h1 className="mb-2 text-2xl">Delegate ASCEND Voting Power</h1>
        {!isConnected || !chain ? (
          <Loader />
        ) : chain.id !== CHAIN_ID ? (
          <div className="flex justify-center">
            <Button variant="blue" onClick={() => switchNetwork?.(CHAIN_ID)}>
              <ChainIcon chainId={CHAIN_ID} />
              Switch to Arbitrum
            </Button>
          </div>
        ) : (
          <>
            <div className="flex rounded bg-black p-2">
              <Button
                full
                variant={token === 'ASCEND' ? 'blue' : 'none'}
                onClick={() => setToken('ASCEND')}
              >
                ASCEND
              </Button>
              <Button
                full
                variant={token === 'xASCEND' ? 'blue' : 'none'}
                onClick={() => setToken('xASCEND')}
              >
                xASCEND
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded bg-gray-900 p-1 shadow">
              <svg
                className="h-20 text-blue"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm">
                {delegating
                  ? 'Delegate all your voting power to this address.You can always re-delegate to yourself or someone else.'
                  : 'To activate your voting power in the DAO, you must delegate your tokens to yourself or someone else.'}
              </p>
            </div>
            <div className="space-y-3 rounded border-2 border-purple/50 p-3">
              <div className=" ">
                <h2 className="text-secondary">{token} balance: </h2>{' '}
                {balance && stakedBalance ? (
                  <p>
                    {commify(
                      formatBalance(
                        token === 'ASCEND' ? balance : stakedBalance
                      ) as string
                    )}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className=" ">
                <h2 className="text-secondary">{token} voting power: </h2>{' '}
                {votes && stakedVotes ? (
                  <p>
                    {commify(
                      formatBalance(
                        token === 'ASCEND' ? votes : stakedVotes
                      ) as string
                    )}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="">
                <h2 className="text-secondary">{token} delegate address:</h2>
                {delegates && stakedDelegates ? (
                  <p>
                    {shortenString(
                      token === 'ASCEND' ? delegates : stakedDelegates,
                      10
                    )}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
            {delegating ? (
              <div className="flex items-center gap-1">
                {isAddress(delegateAddress) && (
                  <Avatar size={24} address={delegateAddress} />
                )}
                <Input.Address
                  onUserInput={(input) => setDelegateAddress(input)}
                  value={delegateAddress}
                  placeholder={'Enter new delegate address'}
                />
              </div>
            ) : null}{' '}
            <div className="flex flex-col items-center gap-3 py-3">
              <WagmiTransactionButton
                variant="blue"
                full
                config={
                  token === 'ASCEND' ? delegateConfig : stakedDelegateConfig
                }
                name={
                  delegating
                    ? isAddress(delegateAddress)
                      ? `Delegate to ${shortenString(delegateAddress, 9)}`
                      : 'Enter delegate address'
                    : 'Delegate to self'
                }
                className="w-full rounded bg-blue p-3"
              />

              {!delegating && (
                <Button variant="gray" full onClick={toggleDelegating}>
                  Delegate to different address
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
