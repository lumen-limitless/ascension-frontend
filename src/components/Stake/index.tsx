import React, { useState } from 'react'
import Card from '../Card'
import useStaking from '../../hooks/useStaking'
import ConnectButton from '../Button/ConnectButton'
import Input from '../Input'
import SwitchNetworkButton from '../Button/SwitchNetworkButton'
import Stat from '../Stat'
import Skeleton from '../Skeleton'
import Button from '../Button'
import { ASCENSION, HOME_CHAINID } from '../../constants'
import { parseUnits } from '@ethersproject/units'
import Loader from '../Loader'
import { formatBalance, parseBalance } from '../../functions'
import { useContractFunction, useEthers, useTokenAllowance } from '@usedapp/core'
import { BigNumber, Contract, ethers } from 'ethers'
import { useASCENDBalance } from '../../hooks/useASCEND'

export default function Stake() {
  const { account, chainId } = useEthers()
  const [amount, setAmount] = useState<string>('')
  const ascendBalance = useASCENDBalance(account)
  const allowance = useTokenAllowance(ASCENSION.AscensionToken.address, account, ASCENSION.AscensionStaking.address)

  const approve = useContractFunction(
    new Contract(ASCENSION.AscensionToken.address, ASCENSION.AscensionToken.abi),
    'approve',
    { transactionName: 'Approve' }
  )

  const stake = useContractFunction(
    new Contract(ASCENSION.AscensionStaking.address, ASCENSION.AscensionStaking.abi),
    'stake',
    { transactionName: 'Stake' }
  )

  const withdraw = useContractFunction(
    new Contract(ASCENSION.AscensionStaking.address, ASCENSION.AscensionStaking.abi),
    'withdraw',
    { transactionName: 'Withdraw' }
  )

  const getReward = useContractFunction(
    new Contract(ASCENSION.AscensionStaking.address, ASCENSION.AscensionStaking.abi),
    'getReward',
    { transactionName: 'Get Reward' }
  )

  const exit = useContractFunction(
    new Contract(ASCENSION.AscensionStaking.address, ASCENSION.AscensionStaking.abi),
    'exit',
    { transactionName: 'Exit' }
  )

  const { balanceOf, earned, totalStaked, rewardsEndAt, apy, paused } = useStaking()

  return (
    <>
      <Stat
        title=""
        stats={[
          { name: 'APR', stat: apy, isPercent: true },
          {
            name: 'Total Staked',
            stat: totalStaked,
            isBalance: true,
          },
          {
            name: 'Rewards End',
            stat: rewardsEndAt,
          },
        ]}
      ></Stat>

      <Card title="Stake ASCEND">
        {!account ? (
          <>
            <ConnectButton />
          </>
        ) : chainId != HOME_CHAINID ? (
          <SwitchNetworkButton chainId={HOME_CHAINID}>Switch to Arbitrum</SwitchNetworkButton>
        ) : !allowance ? (
          <Loader />
        ) : paused ? (
          <>
            <Loader message="Staking inactive, please check back later." />
          </>
        ) : (
          <>
            <div>
              {parseBalance(allowance) === 0 ? (
                <>
                  <Button
                    color="gradient"
                    disabled={approve?.state?.status == 'None' ? false : true}
                    onClick={() => {
                      approve.send(ASCENSION.AscensionStaking.address, ethers.constants.MaxUint256).then(() => {
                        if (approve?.state?.status == 'None') return approve.resetState()
                      })
                    }}
                  >
                    {approve?.state?.status == 'None' ? 'Enable Deposits' : <Loader />}
                  </Button>
                </>
              ) : (
                <div className="mr-3 flex gap-3 md:mr-9">
                  <Input.Numeric
                    value={amount}
                    onUserInput={setAmount}
                    max={ascendBalance ? parseBalance(ascendBalance).toFixed(2).toString() : '0'}
                  />
                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue"
                    disabled={amount && parseFloat(amount) <= parseBalance(ascendBalance) ? false : true}
                    onClick={() => {
                      stake.send(parseUnits(amount))
                      setAmount('')
                    }}
                  >
                    Stake
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="red"
                    disabled={amount && parseFloat(amount) <= parseBalance(balanceOf) ? false : true}
                    onClick={() => {
                      withdraw.send(parseUnits(amount))
                      setAmount('')
                    }}
                  >
                    Withdraw
                  </Button>
                </div>
              )}
            </div>
            {parseBalance(allowance) > 0 && (
              <>
                <ul className="my-4 w-full text-left">
                  <li className="flex w-full">
                    Balance: {ascendBalance ? formatBalance(ascendBalance) + ' ASCEND' : <Skeleton />}{' '}
                  </li>
                  <li className="flex w-full">
                    Stake: {balanceOf ? formatBalance(balanceOf) + ' ASCEND' : <Skeleton />}
                  </li>
                  <li className="flex w-full">earned: {earned ? formatBalance(earned) + ' ASCEND' : <Skeleton />}</li>
                </ul>
                <div className="flex w-full flex-col items-center justify-center">
                  <Button
                    color="green"
                    className=" my-2 w-11/12"
                    disabled={earned && parseBalance(earned) > 0 && getReward.state.status === 'None' ? false : true}
                    onClick={() => {
                      getReward.send().then(() => getReward.resetState())
                    }}
                  >
                    {getReward.state.status !== 'None' ? <Loader /> : 'Collect Earned'}
                  </Button>
                  <Button
                    color="red"
                    className="my-2 w-11/12 "
                    disabled={balanceOf && parseBalance(balanceOf) > 0 && exit.state.status === 'None' ? false : true}
                    onClick={() => {
                      exit.send().then(() => exit.resetState())
                    }}
                  >
                    {exit.state.status != 'None' ? <Loader /> : 'Exit Staking'}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Card>
    </>
  )
}
