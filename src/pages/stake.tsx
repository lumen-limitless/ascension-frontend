import React, { useMemo, useState } from 'react'
import { ASCENSION, HOME_CHAINID } from '../constants'
import { parseUnits, commify } from '@ethersproject/units'
import { formatBalance, parseBalance } from '../functions'
import {
  Arbitrum,
  useCalls,
  useContractFunction,
  useEthers,
  useTokenAllowance,
} from '@usedapp/core'
import { ethers } from 'ethers'
import { useASCENDBalance } from '../hooks/useASCEND'
import { NextPage } from 'next'
import Stat from '../components/ui/Stat'
import Card from '../components/ui/Card'
import Loader from '../components/ui/Loader'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Skeleton from '../components/ui/Skeleton'
import Section from '../components/ui/Section'
import {
  useAscendStakingContract,
  useAscendTokenContract,
  useUI,
} from '../hooks'
import Container from '../components/ui/Container'
import TransactionButton from '../components/TransactionButton'
import Grid from '../components/ui/Grid'
import ArbitrumIcon from '../components/icons/networks/ArbitrumIcon'
import Toggle from '../components/ui/Toggle'
import { useBoolean } from 'react-use'
import { LoginIcon } from '@heroicons/react/outline'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'

const Connect = dynamic(() => import('../components/Connect'), { ssr: false })

const StakePage: NextPage = () => {
  const { setModalView } = useUI()
  const { account, chainId, switchNetwork } = useEthers()
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
  const withdraw = useContractFunction(staking, 'withdraw', {
    transactionName: 'Withdraw',
  })
  const getReward = useContractFunction(staking, 'getReward', {
    transactionName: 'Get Reward',
  })
  const exit = useContractFunction(staking, 'exit', { transactionName: 'Exit' })

  const contract = useAscendStakingContract()

  const [balanceOf, totalStaked, rewardRate, periodFinish, earned, paused] =
    useCalls(
      [
        account && {
          contract: contract,
          method: 'balanceOf',
          args: [account],
        },
        {
          contract: contract,
          method: 'totalStaked',
          args: [],
        },
        {
          contract: contract,
          method: 'rewardRate',
          args: [],
        },
        {
          contract: contract,
          method: 'periodFinish',
          args: [],
        },
        account && {
          contract: contract,
          method: 'earned',
          args: [account],
        },
        {
          contract: contract,
          method: 'paused',
          args: [],
        },
      ],
      { chainId: HOME_CHAINID }
    )

  const rewardsEndAt = useMemo(() => {
    if (!periodFinish || periodFinish?.error) return null
    const timestamp = parseInt(periodFinish.value[0])
    return new Date(timestamp * 1000).toLocaleDateString()
  }, [periodFinish])

  const apy = useMemo(() => {
    if (!rewardRate || rewardRate?.error) return null
    if (!totalStaked || totalStaked?.error) return null
    const r = parseBalance(rewardRate.value[0])
    const t = parseBalance(totalStaked.value[0])
    return ((r * 31557600) / t) * 100
  }, [rewardRate, totalStaked])

  const handleAmountInput = (input: string) => {
    parseFloat(input) === NaN ? setAmount('') : setAmount(input)
  }
  return (
    <>
      <NextSeo title="Stake" description={`Ascension Protocol staking`} />

      <Section fullscreen layout="start" padding="md">
        <Container className="max-w-7xl">
          <Grid gap="md">
            <div className="col-span-12 ">
              <Stat
                stats={[
                  { name: 'APR', stat: apy, isPercent: true },
                  {
                    name: 'Total Staked',
                    stat: totalStaked?.value[0] || '',
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
                    <Toggle
                      className="absolute top-3 right-3"
                      iconSet={{
                        on: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                            />
                          </svg>
                        ),
                        off: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                        ),
                      }}
                      onToggle={() => toggle()}
                      isActive={isWithdrawing}
                    />
                    <h1>{`${isWithdrawing ? 'Withdraw' : 'Stake'} ASCEND`}</h1>
                  </div>
                }
              >
                {!account ? (
                  <>
                    <div className="flex place-content-center">
                      <Button
                        color="blue"
                        className=" max-w-sm"
                        onClick={() => setModalView(<Connect />)}
                      >
                        <LoginIcon height={24} /> Connect Wallet
                      </Button>
                    </div>
                  </>
                ) : chainId != HOME_CHAINID ? (
                  <div className="flex place-content-center">
                    <Button
                      color="blue"
                      className="max-w-sm"
                      onClick={() => switchNetwork(Arbitrum.chainId)}
                    >
                      <ArbitrumIcon />
                      Switch to Arbitrum
                    </Button>
                  </div>
                ) : !allowance ? (
                  <Loader />
                ) : paused?.value[0] === true ? (
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
                            className="mx-auto max-w-sm"
                            args={[
                              ASCENSION.AscensionStaking.address,
                              ethers.constants.MaxUint256,
                            ]}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="mr-3 flex flex-col gap-3 md:mr-9 md:flex-row">
                            <Input.Numeric
                              value={amount}
                              onUserInput={handleAmountInput}
                              max={
                                isWithdrawing
                                  ? formatBalance(balanceOf?.value[0]) || '0'
                                  : formatBalance(ascendBalance) || '0'
                              }
                            />

                            <div className="flex w-full gap-3">
                              {isWithdrawing ? (
                                <TransactionButton
                                  size="sm"
                                  color="blue"
                                  className="mx-auto max-w-xs md:mx-0"
                                  requirements={{
                                    requirement:
                                      amount !== '' &&
                                      parseFloat(amount) <=
                                        parseBalance(balanceOf.value[0] || '0'),
                                    message: 'Invalid amount',
                                  }}
                                  method={withdraw}
                                  args={[
                                    amount === ''
                                      ? ethers.constants.Zero
                                      : parseUnits(amount),
                                  ]}
                                  name="Withdraw"
                                />
                              ) : (
                                <TransactionButton
                                  size="sm"
                                  color="blue"
                                  className=" mx-auto max-w-xs md:mx-0 "
                                  requirements={{
                                    requirement:
                                      amount !== '' &&
                                      parseFloat(amount) <=
                                        parseBalance(ascendBalance),
                                    message: 'Invalid amount',
                                  }}
                                  method={stake}
                                  args={[
                                    amount === ''
                                      ? ethers.constants.Zero
                                      : parseUnits(amount),
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
                        <ul className="my-6 w-full space-y-1 ">
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
                              `${commify(
                                formatBalance(balanceOf?.value[0]) || '0'
                              )} ASCEND`
                            ) : (
                              <Skeleton />
                            )}
                          </li>

                          <li className="flex w-full">
                            Earnings:{' '}
                            {earned ? (
                              ` ${commify(
                                formatBalance(earned?.value[0]) || '0'
                              )} ASCEND`
                            ) : (
                              <Skeleton />
                            )}
                          </li>
                        </ul>
                        <div className="flex w-full flex-col  items-center justify-center gap-3 lg:flex-row">
                          {balanceOf &&
                            parseBalance(balanceOf?.value[0] || '0') > 0 && (
                              <TransactionButton
                                color="green"
                                requirements={{
                                  requirement:
                                    earned &&
                                    parseBalance(earned?.value[0] || '0') > 0,
                                }}
                                method={getReward}
                                name="Collect Earnings"
                              />
                            )}

                          {balanceOf &&
                            parseBalance(balanceOf?.value[0] || '0') > 0 && (
                              <TransactionButton
                                color="red"
                                requirements={{
                                  requirement:
                                    balanceOf &&
                                    parseBalance(balanceOf?.value[0] || '0') >
                                      0,
                                }}
                                method={exit}
                                name="Exit Staking"
                              />
                            )}
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
