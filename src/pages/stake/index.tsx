import React, { useState } from 'react'
import { ASCENSION, HOME_CHAINID } from '../../constants'
import { parseUnits } from '@ethersproject/units'
import { formatBalance, parseBalance } from '../../functions'
import { Arbitrum, useContractFunction, useEthers, useTokenAllowance } from '@usedapp/core'
import { Contract, ethers } from 'ethers'
import { useASCENDBalance } from '../../hooks/useASCEND'
import { NextPage } from 'next'
import Stat from '../../components/Stat'
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Skeleton from '../../components/Skeleton'
import useStaking from '../../hooks/useStaking'
import Container from '../../components/Container'
import Connection from '../../components/Connection'
import { useSwitchNetwork } from '../../hooks/useSwitchNetwork'
import { AscensionStaking, AscensionToken } from '../../typechain'
import TransactionButton from '../../components/TransactionButton'

const token = new Contract(
  ASCENSION.AscensionToken.address,
  ASCENSION.AscensionToken.abi
) as AscensionToken
const staking = new Contract(
  ASCENSION.AscensionStaking.address,
  ASCENSION.AscensionStaking.abi
) as AscensionStaking
const StakePage: NextPage = () => {
  const switchNetwork = useSwitchNetwork()
  const { account, chainId } = useEthers()
  const [amount, setAmount] = useState<string>('')
  const ascendBalance = useASCENDBalance(account ?? '')
  const allowance = useTokenAllowance(
    ASCENSION.AscensionToken.address,
    account,
    ASCENSION.AscensionStaking.address
  )

  const approve = useContractFunction(token as any, 'approve', { transactionName: 'Approve' })

  const stake = useContractFunction(staking as any, 'stake', { transactionName: 'Stake' })

  const withdraw = useContractFunction(staking as any, 'withdraw', { transactionName: 'Withdraw' })

  const getReward = useContractFunction(staking as any, 'getReward', {
    transactionName: 'Get Reward',
  })

  const exit = useContractFunction(staking as any, 'exit', { transactionName: 'Exit' })

  const { balanceOf, earned, totalStaked, rewardsEndAt, apy, paused } = useStaking()

  return (
    <Container maxWidth="4xl">
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
            <div className="flex place-content-center">
              <Connection />
            </div>
          </>
        ) : chainId != HOME_CHAINID ? (
          <div className="flex place-content-center">
            <Button color="blue" onClick={() => switchNetwork(Arbitrum.chainId)}>
              Switch to Arbitrum
            </Button>
          </div>
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
                <div className="flex place-content-center">
                  {' '}
                  <TransactionButton
                    method={approve}
                    color="green"
                    name="Enable Deposits"
                    args={[ASCENSION.AscensionStaking.address, ethers.constants.MaxUint256]}
                  />
                </div>
              ) : (
                <div className="mr-3 flex gap-3 md:mr-9">
                  <div className="w-full ">
                    {' '}
                    <Input.Numeric
                      value={amount}
                      onUserInput={setAmount}
                      max={ascendBalance ? parseBalance(ascendBalance).toFixed(2).toString() : '0'}
                    />
                  </div>

                  <Button
                    size="none"
                    className="p-1 text-sm"
                    color="blue"
                    disabled={
                      amount && parseFloat(amount) <= parseBalance(ascendBalance) ? false : true
                    }
                    onClick={() => {
                      stake.send(parseUnits(amount))
                      setAmount('')
                    }}
                  >
                    Stake
                  </Button>
                  <Button
                    size="none"
                    className="p-1 text-sm"
                    color="red"
                    disabled={
                      amount && parseFloat(amount) <= parseBalance(balanceOf) ? false : true
                    }
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
                    Balance:{' '}
                    {ascendBalance ? formatBalance(ascendBalance) + ' ASCEND' : <Skeleton />}{' '}
                  </li>

                  <li className="flex w-full">
                    Stake: {balanceOf ? formatBalance(balanceOf) + ' ASCEND' : <Skeleton />}
                  </li>

                  <li className="flex w-full">
                    Earnings: {earned ? formatBalance(earned) + ' ASCEND' : <Skeleton />}
                  </li>
                </ul>
                <div className="flex w-full flex-col  items-center justify-center gap-3 lg:flex-row">
                  <Button
                    color="green"
                    disabled={
                      earned && parseBalance(earned) > 0 && getReward.state.status === 'None'
                        ? false
                        : true
                    }
                    onClick={() => {
                      getReward.send().then(() => getReward.resetState())
                    }}
                  >
                    {getReward.state.status !== 'None' ? <Loader /> : 'Collect earnings'}
                  </Button>
                  <Button
                    color="red"
                    disabled={
                      balanceOf && parseBalance(balanceOf) > 0 && exit.state.status === 'None'
                        ? false
                        : true
                    }
                    onClick={() => {
                      exit.send().then(() => exit.resetState())
                    }}
                  >
                    {exit.state.status != 'None' ? <Loader /> : 'Exit staking'}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Card>
    </Container>
  )
}

export default StakePage
