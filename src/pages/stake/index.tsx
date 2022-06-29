import React, { useState } from 'react'
import { ASCENSION, HOME_CHAINID, ZERO_ADDRESS } from '../../constants'
import { parseUnits, commify } from '@ethersproject/units'
import { formatBalance, parseBalance } from '../../functions'
import { Arbitrum, useContractFunction, useEthers, useTokenAllowance } from '@usedapp/core'
import { ethers } from 'ethers'
import { useASCENDBalance } from '../../hooks/useASCEND'
import { NextPage } from 'next'
import Stat from '../../components/ui/Stat'
import Card from '../../components/ui/Card'
import Loader from '../../components/ui/Loader'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Skeleton from '../../components/ui/Skeleton'
import Section from '../../components/ui/Section'
import dynamic from 'next/dynamic'
import { useAscendStakingContract, useAscendTokenContract, useSwitchNetwork } from '../../hooks'
import Container from '../../components/ui/Container'
import Head from 'next/head'
import TransactionButton from '../../components/ui/TransactionButton'
import { useStaking } from '../../hooks'
import Grid from '../../components/ui/Grid'
import ArbitrumIcon from '../../components/icons/networks/ArbitrumIcon'
import Toggle from '../../components/ui/Toggle'
import { useBoolean } from 'react-use'
import { Icon } from '@iconify/react'
import Typography from '../../components/ui/Typography'

const Connect = dynamic(() => import('../../components/Connect'), {
  ssr: false,
  loading: () => <Loader />,
})

const StakePage: NextPage = () => {
  const switchNetwork = useSwitchNetwork()
  const { account, chainId } = useEthers()
  const [amount, setAmount] = useState<string>('')
  const [isWithdrawing, toggle] = useBoolean(false)
  const ascendBalance = useASCENDBalance(account)
  const allowance = useTokenAllowance(
    ASCENSION.AscensionToken.address,
    account,
    ASCENSION.AscensionStaking.address
  )

  const token = useAscendTokenContract()
  const staking = useAscendStakingContract()
  const approve = useContractFunction(token, 'approve', {
    transactionName: 'Approve',
  })
  const stake = useContractFunction(staking, 'stake', {
    transactionName: 'Stake',
  })
  const withdraw = useContractFunction(staking, 'withdraw', { transactionName: 'Withdraw' })
  const getReward = useContractFunction(staking, 'getReward', {
    transactionName: 'Get Reward',
  })
  const exit = useContractFunction(staking, 'exit', { transactionName: 'Exit' })

  const { balanceOf, earned, totalStaked, rewardsEndAt, apy, paused } = useStaking()

  const handleAmountInput = (input: string) => {
    parseFloat(input) === NaN ? setAmount('') : setAmount(input)
  }
  return (
    <>
      <Head>
        <title>Staking | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol staking" />
      </Head>

      <Section fullscreen layout="start" padding="md">
        <Container maxWidth="4xl">
          <Grid gap="md">
            <div className="col-span-12 ">
              <Stat
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
              />
            </div>
            <div className="col-span-12">
              <Card
                header={
                  <div className="flex items-center  gap-3 p-3">
                    {' '}
                    <Toggle
                      className="absolute top-3 right-3"
                      iconSet={{
                        on: <Icon icon="gg:push-down" />,
                        off: <Icon icon="gg:push-up" />,
                      }}
                      onToggle={() => toggle()}
                      isActive={isWithdrawing}
                    />
                    <Typography as="h1" variant="xl">{`${
                      isWithdrawing ? 'Withdraw' : 'Stake'
                    } ASCEND`}</Typography>
                  </div>
                }
              >
                {!account ? (
                  <>
                    <div className="flex place-content-center">
                      <Connect />
                    </div>
                  </>
                ) : chainId != HOME_CHAINID ? (
                  <div className="flex place-content-center">
                    <Button color="blue" onClick={() => switchNetwork(Arbitrum.chainId)}>
                      <ArbitrumIcon />
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
                          <TransactionButton
                            method={approve}
                            color="green"
                            name="Enable Deposits"
                            args={[ASCENSION.AscensionStaking.address, ethers.constants.MaxUint256]}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="mr-3 flex flex-col gap-3 md:mr-9 md:flex-row">
                            <div className="w-full ">
                              <Input.Numeric
                                value={amount}
                                onUserInput={handleAmountInput}
                                max={
                                  isWithdrawing
                                    ? balanceOf
                                      ? formatBalance(balanceOf)
                                      : '0'
                                    : ascendBalance
                                    ? formatBalance(ascendBalance)
                                    : '0'
                                }
                              />
                            </div>
                            <div className="flex w-full gap-3">
                              {isWithdrawing ? (
                                <TransactionButton
                                  size="sm"
                                  color="blue"
                                  requirements={{
                                    requirement:
                                      amount !== '' &&
                                      parseFloat(amount) <= parseBalance(balanceOf),
                                    message: 'Invalid amount',
                                  }}
                                  method={withdraw}
                                  args={[
                                    amount === '' ? ethers.constants.Zero : parseUnits(amount),
                                  ]}
                                  name="Withdraw"
                                />
                              ) : (
                                <TransactionButton
                                  size="sm"
                                  color="blue"
                                  requirements={{
                                    requirement:
                                      amount !== '' &&
                                      parseFloat(amount) <= parseBalance(ascendBalance),
                                    message: 'Invalid amount',
                                  }}
                                  method={stake}
                                  args={[
                                    amount === '' ? ethers.constants.Zero : parseUnits(amount),
                                  ]}
                                  name="Stake"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {parseBalance(allowance) > 0 && (
                      <>
                        <ul className="my-4 w-full text-left">
                          <li className="flex w-full">
                            Balance:{' '}
                            {ascendBalance ? (
                              `${commify(formatBalance(ascendBalance))} ASCEND`
                            ) : (
                              <Skeleton />
                            )}{' '}
                          </li>

                          <li className="flex w-full">
                            Staked:{' '}
                            {balanceOf ? (
                              `${commify(formatBalance(balanceOf))} ASCEND`
                            ) : (
                              <Skeleton />
                            )}
                          </li>

                          <li className="flex w-full">
                            Earnings:{' '}
                            {earned ? ` ${commify(formatBalance(earned))} ASCEND` : <Skeleton />}
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
            </div>
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default StakePage
