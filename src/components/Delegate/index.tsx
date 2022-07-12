import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/outline'
import {
  shortenAddress,
  shortenIfAddress,
  useCalls,
  useContractFunction,
  useEthers,
} from '@usedapp/core'

import { HOME_CHAINID, ZERO_ADDRESS } from '../../constants'
import { formatBalance, isAddress } from '../../functions'
import {
  useAscendStakedTokenContract,
  useAscendSubgraph,
  useAscendTokenContract,
} from '../../hooks'
import useStore from '../../store/useStore'
import ArbitrumIcon from '../icons/networks/ArbitrumIcon'
import TransactionButton from '../TransactionButton'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import Skeleton from '../../components/ui/Skeleton'
import Tabs from '../ui/Tabs'
import Typography from '../ui/Typography'
import { useBoolean } from 'react-use'
import { useCallback, useMemo, useState } from 'react'
import Input from '../ui/Input'
import Avatar from '../Avatar'

export default function Delegate() {
  const [delegating, toggleDelegating] = useBoolean(false)
  const [token, setToken] = useState<'ASCEND' | 'sASCEND'>('ASCEND')
  const [delegateAddress, setDelegateAddress] = useState<string>('')

  const { account, chainId, switchNetwork } = useEthers()
  const setModalView = useStore((state) => state.setModalView)
  const stakedAscend = useAscendStakedTokenContract()
  const ascend = useAscendTokenContract()

  const [ascendVotes, ascendDelegate, stakedAscendVotes, stakedAscendDelegate] = useCalls(
    chainId === HOME_CHAINID
      ? [
          { contract: ascend, method: 'getVotes', args: [account] },
          { contract: ascend, method: 'delegates', args: [account] },
          { contract: stakedAscend, method: 'getVotes', args: [account] },
          { contract: stakedAscend, method: 'delegates', args: [account] },
        ]
      : []
  )

  const contract = useMemo(() => {
    return token === 'ASCEND' ? ascend : stakedAscend
  }, [token, ascend, stakedAscend])

  const delegate = useContractFunction(contract, 'delegate', {
    transactionName: `Delegate ${token}`,
  })

  const handleBack = useCallback(() => {
    delegating ? toggleDelegating(false) : setModalView('account')
  }, [delegating, setModalView, toggleDelegating])
  return (
    <>
      <Button className="absolute top-3 left-3" size="none" onClick={handleBack}>
        <ArrowLeftIcon height={24} />
      </Button>
      <div className=" my-6 space-y-3">
        {' '}
        <Typography as="h1" variant="xl">
          Delegate vote
        </Typography>
        <Tabs
          options={['ASCEND', 'sASCEND']}
          onTabChange={(i) => setToken(['ASCEND', 'sASCEND'][i] as 'ASCEND' | 'sASCEND')}
        />
        {!chainId ? (
          <Loader />
        ) : chainId !== HOME_CHAINID ? (
          <div className="flex justify-center">
            {' '}
            <Button color="blue" onClick={() => switchNetwork(HOME_CHAINID)}>
              <ArbitrumIcon />
              Switch to Arbitrum
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 rounded bg-dark-800 p-1 shadow">
              <InformationCircleIcon className="h-20 stroke-current text-blue" />
              <Typography as="p" variant="sm">
                {delegating
                  ? 'Delegate all your voting power to this address.You can always re-delegate to yourself or someone else.'
                  : 'To activate your voting power in the DAO, you must delegate your tokens to yourself or someone else.'}
              </Typography>
            </div>
            <div className="rounded bg-black p-3 shadow">
              <div className="flex flex-col ">
                {' '}
                <Typography className="text-secondary">{token} voting power: </Typography>{' '}
                {formatBalance(
                  token === 'ASCEND' ? ascendVotes?.value[0] : stakedAscendVotes?.value[0]
                ) || <Skeleton />}
              </div>
              <div className="flex flex-col">
                {' '}
                <Typography className="text-secondary">{token} delegate address:</Typography>
                {shortenIfAddress(
                  token === 'ASCEND' ? ascendDelegate?.value[0] : stakedAscendDelegate?.value[0]
                ) || <Skeleton />}
              </div>
            </div>
            {delegating && (
              <div className="flex items-center gap-1">
                {isAddress(delegateAddress) && <Avatar size={24} address={delegateAddress} />}
                <Input.Address
                  onUserInput={(input) => setDelegateAddress(input)}
                  value={delegateAddress}
                  placeholder={'Enter new delegate address'}
                />
              </div>
            )}{' '}
            <div className="flex flex-col items-center py-3">
              {' '}
              <TransactionButton
                size="lg"
                method={delegate}
                args={delegating ? [delegateAddress] : [account]}
                color="blue"
                requirements={{
                  requirement: delegating ? (isAddress(delegateAddress) ? true : false) : true,
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
              {!delegating && <Button onClick={toggleDelegating}>Delegate</Button>}
            </div>
          </>
        )}
      </div>{' '}
    </>
  )
}
