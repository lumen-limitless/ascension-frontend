import { isAddress, shortenString } from '../../functions'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import Skeleton from '../ui/Skeleton'
import Typography from '../ui/Typography'
import { useBoolean } from 'react-use'
import { useState } from 'react'
import Input from '../ui/Input'
import Avatar from '../Avatar'
import ChainIcon from '../icons/ChainIcon'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import {
  useAscensionTokenDelegates,
  useAscensionTokenGetVotes,
  usePrepareAscensionTokenDelegate,
} from '../../wagmi/generated'
import WagmiTransactionButton from '../WagmiTransactionButton'
import { commify, formatUnits } from '@ethersproject/units'
import { BigNumberish } from 'ethers'

export default function Delegate() {
  const [delegating, toggleDelegating] = useBoolean(false)
  const [token, setToken] = useState<'ASCEND' | 'xASCEND'>('ASCEND')
  const [delegateAddress, setDelegateAddress] = useState<string>('')
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()

  const { config } = usePrepareAscensionTokenDelegate({
    args: [
      delegating
        ? (delegateAddress as `0x${string}`)
        : (address as `0x${string}`),
    ],
  })

  const { data: votes, isFetched: isVotesFetched } = useAscensionTokenGetVotes({
    args: [address as `0x${string}`],
  })
  const { data: currentDelegate, isFetched: isCurrentDelegateFetched } =
    useAscensionTokenDelegates({
      args: [address as `0x${string}`],
    })
  return (
    <>
      <div className=" space-y-3">
        {' '}
        <h1 className="mb-2 text-2xl">Delegate {token} Voting Power</h1>
        <div className="inline-flex rounded bg-black">
          <Button
            className={
              token === 'ASCEND' ? 'bg-gradient-to-r from-orange to-yellow' : ''
            }
            onClick={() => setToken('ASCEND')}
          >
            ASCEND
          </Button>
          <Button
            className={
              token === 'xASCEND'
                ? 'bg-gradient-to-r from-orange to-yellow'
                : ''
            }
            onClick={() => setToken('xASCEND')}
          >
            xASCEND
          </Button>
        </div>
        {!isConnected || !chain ? (
          <Loader />
        ) : chain.id !== arbitrum.id ? (
          <div className="flex justify-center">
            <Button color="blue" onClick={() => switchNetwork?.(42161)}>
              <ChainIcon chainId={42161} />
              Switch to Arbitrum
            </Button>
          </div>
        ) : (
          <>
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
            <div className="space-y-3  rounded border-2 border-purple/50 p-3">
              <div className=" ">
                <h2 className="text-secondary">{token} voting power: </h2>{' '}
                {isVotesFetched ? (
                  <p>{commify(formatUnits(votes as BigNumberish))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="">
                <h2 className="text-secondary">{token} delegate address:</h2>
                {isCurrentDelegateFetched ? (
                  <p>{currentDelegate}</p>
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
                config={config}
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
                <Button color="gray" full onClick={toggleDelegating}>
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
