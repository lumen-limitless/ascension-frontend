import React, { useMemo, useState } from 'react'
import { ASCENSION, HOME_CHAINID } from '../constants'
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
import ChainIcon from '../components/icons/ChainIcon'
import Toggle from '../components/ui/Toggle'
import { useBoolean } from 'react-use'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
import { VIEW } from '../constants/enums'
import { commify, parseUnits } from 'ethers/lib/utils'

const useStakingCalls = () => {
  const { account } = useEthers()
  const staking = useAscendStakingContract()
  const results =
    useCalls(
      [
        account && {
          contract: staking,
          method: 'balanceOf',
          args: [account],
        },
        {
          contract: staking,
          method: 'totalStaked',
          args: [],
        },
        {
          contract: staking,
          method: 'rewardRate',
          args: [],
        },

        account && {
          contract: staking,
          method: 'earned',
          args: [account],
        },
        {
          contract: staking,
          method: 'paused',
          args: [],
        },
        { contract: staking, method: 'periodFinish', args: [] },
      ],
      {
        chainId: HOME_CHAINID,
      }
    ) ?? []

  results.forEach((result) => {
    if (result && result.error) {
      console.error(`Error encountered: ${result.error.message}`)
    }
  })

  return results.map((result) => result?.value?.[0])
}

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

  const [balanceOf, totalStaked, rewardRate, earned, paused, periodFinish] =
    useStakingCalls()

  const rewardsEndAt = useMemo(() => {
    if (!periodFinish) return null
    const timestamp = parseInt(periodFinish)
    return new Date(timestamp * 1000).toLocaleDateString()
  }, [periodFinish])

  const apy = useMemo(() => {
    if (!rewardRate) return null
    if (!totalStaked) return null
    const r = parseBalance(rewardRate)
    const t = parseBalance(totalStaked)
    return ((r * Math.floor(31557600)) / t) * 100
  }, [rewardRate, totalStaked])

  const handleAmountInput = (input: string) => {
    Number.isNaN(parseFloat(input)) ? setAmount('') : setAmount(input)
  }
  return (
    <>
      <NextSeo title="Stake" description={`Ascension Protocol staking`} />

      <Section className="py-24">
        <Container className="max-w-7xl">
          <Grid gap="md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.33 }}
              className="col-span-12 "
            >
              <Stat
                stats={[
                  { name: 'APR', stat: apy, isPercent: true },
                  {
                    name: 'Total Staked',
                    stat: totalStaked || '',
                    isBalance: true,
                  },
                  {
                    name: 'Rewards End',
                    stat: rewardsEndAt || '',
                  },
                ]}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.33 }}
              className="col-span-12"
            >
              <Card>
                <Card.Header>
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
                </Card.Header>
                <Card.Body>
                  {!account ? (
                    <>
                      <div className="flex place-content-center">
                        <Button
                          full
                          color="blue"
                          className=" max-w-sm"
                          onClick={() => setModalView(VIEW.CONNECT)}
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    </>
                  ) : chainId != HOME_CHAINID ? (
                    <div className="flex place-content-center">
                      <Button
                        full
                        color="blue"
                        className="max-w-sm"
                        onClick={() => switchNetwork(Arbitrum.chainId)}
                      >
                        <ChainIcon chainId={42161} />
                        Switch to Arbitrum
                      </Button>
                    </div>
                  ) : !allowance ? (
                    <Loader />
                  ) : paused === true ? (
                    <>
                      <Loader message="Staking inactive, please check back later." />
                    </>
                  ) : (
                    <>
                      <div>
                        {parseBalance(allowance) === 0 ? (
                          <div className="flex place-content-center">
                            <TransactionButton
                              full
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
                                    ? formatBalance(balanceOf) || '0'
                                    : formatBalance(ascendBalance) || '0'
                                }
                              />

                              <div className="flex w-full gap-3">
                                {isWithdrawing ? (
                                  <TransactionButton
                                    full
                                    size="sm"
                                    color="blue"
                                    className="mx-auto max-w-xs md:mx-0"
                                    requirements={{
                                      requirement:
                                        amount !== '' &&
                                        parseFloat(amount) <=
                                          parseBalance(balanceOf || '0'),
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
                                    full
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
                      {parseBalance(allowance) > 0 ? (
                        <>
                          <ul className="my-6 w-full space-y-1 ">
                            <li className="flex w-full">
                              Balance:{' '}
                              {ascendBalance ? (
                                `${commify(
                                  formatBalance(ascendBalance)
                                )} ASCEND`
                              ) : (
                                <Skeleton />
                              )}{' '}
                            </li>

                            <li className="flex w-full">
                              Staked:{' '}
                              {balanceOf ? (
                                `${commify(
                                  formatBalance(balanceOf) || '0'
                                )} ASCEND`
                              ) : (
                                <Skeleton />
                              )}
                            </li>

                            <li className="flex w-full">
                              Earnings:{' '}
                              {earned ? (
                                ` ${commify(
                                  formatBalance(earned) || '0'
                                )} ASCEND`
                              ) : (
                                <Skeleton />
                              )}
                            </li>
                          </ul>
                          <div className="flex w-full flex-col  items-center justify-center  gap-3 lg:flex-row">
                            {balanceOf &&
                              parseBalance(balanceOf || '0') > 0 && (
                                <TransactionButton
                                  full
                                  color="green"
                                  requirements={{
                                    requirement:
                                      earned && parseBalance(earned || '0') > 0,
                                  }}
                                  method={getReward}
                                  name="Collect Earnings"
                                />
                              )}

                            {balanceOf &&
                              parseBalance(balanceOf || '0') > 0 && (
                                <TransactionButton
                                  full
                                  color="red"
                                  requirements={{
                                    requirement:
                                      balanceOf &&
                                      parseBalance(balanceOf || '0') > 0,
                                  }}
                                  method={exit}
                                  name="Exit Staking"
                                />
                              )}
                          </div>
                        </>
                      ) : null}
                    </>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default StakePage
