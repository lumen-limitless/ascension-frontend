import React, { useState } from 'react'
import { ASCENSION, HOME_CHAINID, ZERO_ADDRESS } from '../../constants'
import { parseUnits } from '@ethersproject/units'
import { formatBalance, parseBalance } from '../../functions'
import { Arbitrum, useContractFunction, useEthers, useTokenAllowance } from '@usedapp/core'
import { Contract, ethers } from 'ethers'
import { useASCENDBalance } from '../../hooks/useASCEND'
import { NextPage } from 'next'
import Stat from '../../components/ui/Stat'
import Card from '../../components/ui/Card'
import Loader from '../../components/ui/Loader'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Skeleton from '../../components/ui/Skeleton'
import useStaking from '../../hooks/useStaking'
import Container from '../../components/ui/Container'
import Connection from '../../components/Connection'
import { useSwitchNetwork } from '../../hooks'
import { AscensionStaking, AscensionToken } from '../../typechain'
import TransactionButton from '../../components/ui/TransactionButton'
import Head from 'next/head'
import Section from '../../components/ui/Section'

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
  const ascendBalance = useASCENDBalance(account ?? ZERO_ADDRESS)
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

  const handleAmountInput = (input) => {
    parseFloat(input) === NaN ? setAmount('') : setAmount(input)
  }
  return (
    <>
      <Head>
        <title>Staking | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol staking" />
      </Head>
      <Section layout="start" fullscreen>
        {' '}
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
                    <div className="mr-3 flex flex-col gap-3 md:mr-9 md:flex-row">
                      <div className="w-full ">
                        {' '}
                        <Input.Numeric
                          value={amount}
                          onUserInput={handleAmountInput}
                          max={
                            ascendBalance ? parseBalance(ascendBalance).toFixed(2).toString() : '0'
                          }
                        />
                      </div>
                      <div className="flex w-full gap-3">
                        {' '}
                        <TransactionButton
                          size="sm"
                          color="blue"
                          requirements={{
                            requirement:
                              amount !== '' && parseFloat(amount) <= parseBalance(ascendBalance),
                            message: 'Stake',
                          }}
                          method={stake}
                          args={[amount === '' ? ethers.constants.Zero : parseUnits(amount)]}
                          name="Stake"
                        />
                        <TransactionButton
                          size="sm"
                          color="blue"
                          requirements={{
                            requirement:
                              amount !== '' && parseFloat(amount) <= parseBalance(balanceOf),
                            message: 'Withdraw',
                          }}
                          method={withdraw}
                          args={[amount === '' ? ethers.constants.Zero : parseUnits(amount)]}
                          name="Withdraw"
                        />
                      </div>
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
                      <TransactionButton
                        color="green"
                        requirements={{
                          requirement: earned && parseBalance(earned) > 0,
                          message: 'No Earnings',
                        }}
                        method={getReward}
                        name="Collect Earnings"
                      />

                      <TransactionButton
                        color="red"
                        requirements={{
                          requirement: balanceOf && parseBalance(balanceOf) > 0,
                          message: '',
                        }}
                        method={exit}
                        name="Exit Staking"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default StakePage
