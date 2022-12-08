import {
  shortenIfAddress,
  useCalls,
  useContractFunction,
  useEthers,
} from '@usedapp/core'

import { HOME_CHAINID } from '../../constants'
import { formatBalance, isAddress } from '../../functions'
import {
  useAscendStakedTokenContract,
  useAscendTokenContract,
} from '../../hooks'
import TransactionButton from '../TransactionButton'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import Skeleton from '../ui/Skeleton'
import Typography from '../ui/Typography'
import { useBoolean } from 'react-use'
import { useMemo, useState } from 'react'
import Input from '../ui/Input'
import Avatar from '../Avatar'
import ChainIcon from '../icons/ChainIcon'

export default function Delegate() {
  enum TOKEN {
    'ASCEND',
    'STAKED_ASCEND',
  }
  const [delegating, toggleDelegating] = useBoolean(false)
  const [token, setToken] = useState<TOKEN>(TOKEN.ASCEND)
  const [delegateAddress, setDelegateAddress] = useState<string>('')
  const { account, chainId, switchNetwork } = useEthers()
  const stakedAscend = useAscendStakedTokenContract()
  const ascend = useAscendTokenContract()

  const [ascendVotes, ascendDelegate, stakedAscendVotes, stakedAscendDelegate] =
    useCalls(
      account
        ? [
            { contract: ascend, method: 'getVotes', args: [account] },
            { contract: ascend, method: 'delegates', args: [account] },
            { contract: stakedAscend, method: 'getVotes', args: [account] },
            { contract: stakedAscend, method: 'delegates', args: [account] },
          ]
        : [],
      { chainId: HOME_CHAINID }
    )

  const contract = useMemo(() => {
    return token === TOKEN.ASCEND ? ascend : stakedAscend
  }, [token, ascend, stakedAscend, TOKEN])

  const delegate = useContractFunction(contract, 'delegate', {
    transactionName: `Delegate ${['ASCEND', 'sASCEND'][token]}`,
  })

  return (
    <>
      <div className=" my-6 space-y-3">
        {' '}
        <Typography as="h1" variant="xl">
          Delegate {['ASCEND', 'sASCEND'][token]} Voting Power
        </Typography>
        <div className="inline-flex rounded bg-black">
          <Button
            className={
              token === TOKEN.ASCEND
                ? 'bg-gradient-to-r from-orange to-yellow'
                : ''
            }
            onClick={() => setToken(TOKEN.ASCEND)}
          >
            ASCEND
          </Button>
          <Button
            className={
              token === TOKEN.STAKED_ASCEND
                ? 'bg-gradient-to-r from-orange to-yellow'
                : ''
            }
            onClick={() => setToken(TOKEN.STAKED_ASCEND)}
          >
            sASCEND
          </Button>
        </div>
        {!chainId ? (
          <Loader />
        ) : chainId !== HOME_CHAINID ? (
          <div className="flex justify-center">
            {' '}
            <Button color="blue" onClick={() => switchNetwork(HOME_CHAINID)}>
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
              <Typography as="p" variant="sm">
                {delegating
                  ? 'Delegate all your voting power to this address.You can always re-delegate to yourself or someone else.'
                  : 'To activate your voting power in the DAO, you must delegate your tokens to yourself or someone else.'}
              </Typography>
            </div>
            <div className="rounded bg-black p-3 shadow">
              <div className="flex flex-col ">
                {' '}
                <Typography className="text-secondary">
                  {['ASCEND', 'sASCEND'][token]} voting power:{' '}
                </Typography>{' '}
                {formatBalance(
                  token === TOKEN.ASCEND
                    ? ascendVotes?.value[0]
                    : stakedAscendVotes?.value[0]
                ) || <Skeleton />}
              </div>
              <div className="flex flex-col">
                {' '}
                <Typography className="text-secondary">
                  {['ASCEND', 'sASCEND'][token]} delegate address:
                </Typography>
                {shortenIfAddress(
                  token === TOKEN.STAKED_ASCEND
                    ? ascendDelegate?.value[0]
                    : stakedAscendDelegate?.value[0]
                ) || <Skeleton />}
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
              {' '}
              <TransactionButton
                full
                size="lg"
                method={delegate}
                args={delegating ? [delegateAddress] : [account]}
                color="blue"
                requirements={{
                  requirement: delegating
                    ? isAddress(delegateAddress)
                      ? true
                      : false
                    : true,
                  message: 'Invalid address',
                }}
                name={`Delegate to ${
                  !delegating
                    ? 'self'
                    : !isAddress(delegateAddress)
                    ? ''
                    : shortenIfAddress(delegateAddress)
                }`}
              />
              {!delegating && (
                <Button color="gray" full onClick={toggleDelegating}>
                  Delegate to different address
                </Button>
              )}
            </div>
          </>
        )}
      </div>{' '}
    </>
  )
}
