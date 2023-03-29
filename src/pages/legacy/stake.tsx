import React, { ReactElement, useMemo, useState } from 'react'
import { ASCENSION } from '../../constants'
import { formatBalance, parseBalance } from '../../functions'
import { BigNumber, BigNumberish, ethers } from 'ethers'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Skeleton from '../../components/ui/Skeleton'
import Section from '../../components/ui/Section'
import Container from '../../components/ui/Container'
import Grid from '../../components/ui/Grid'
import Toggle from '../../components/ui/Toggle'
import { useBoolean } from 'react-use'
import { NextSeo } from 'next-seo'
import { commify, formatUnits, parseUnits } from 'ethers/lib/utils'
import WagmiTransactionButton from '../../components/WagmiTransactionButton'
import {
  useAccount,
  useBalance,
  useContractReads,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import Loader from '../../components/ui/Loader'
import AppLayout from '../../layouts/AppLayout'
import { NextPageWithLayout } from '../../types'
import Stat from '../../components/ui/StatGrid'
import { motion } from 'framer-motion'
import { arbitrum } from 'wagmi/chains'
import { useToast } from '../../hooks'
import Logo from '../../components/ui/Logo'

const useStakingCalls = () => {
  const { address } = useAccount()

  const { data, isLoading, error, isError } = useContractReads({
    watch: true,
    contracts: [
      {
        address: ASCENSION.AscensionStaking.address as `0x${string}`,
        abi: ASCENSION.AscensionStaking.abi,
        functionName: 'balanceOf',
        args: [address || ethers.constants.AddressZero],
        chainId: arbitrum.id,
      },
      {
        address: ASCENSION.AscensionStaking.address as `0x${string}`,
        abi: ASCENSION.AscensionStaking.abi,
        functionName: 'totalStaked',
        chainId: arbitrum.id,
      },

      {
        address: ASCENSION.AscensionStaking.address as `0x${string}`,
        abi: ASCENSION.AscensionStaking.abi,
        functionName: 'rewardRate',
        chainId: arbitrum.id,
      },
      {
        address: ASCENSION.AscensionStaking.address as `0x${string}`,
        abi: ASCENSION.AscensionStaking.abi,
        functionName: 'earned',
        args: [address || ethers.constants.AddressZero],
        chainId: arbitrum.id,
      },
      {
        address: ASCENSION.AscensionStaking.address as `0x${string}`,
        abi: ASCENSION.AscensionStaking.abi,
        functionName: 'periodFinish',
        chainId: arbitrum.id,
      },
    ],
  })

  if (isLoading) return null

  if (isError) {
    console.error(error)
    return null
  }
  if (!data) return null

  return {
    balanceOf: data[0] as unknown as BigNumber,
    totalSupply: data[1] as unknown as BigNumber,
    rewardRate: data[2] as unknown as BigNumber,
    earned: data[3] as unknown as BigNumber,
    periodFinish: data[4] as unknown as BigNumber,
  }
}
const StakePage: NextPageWithLayout = () => {
  const [amount, setAmount] = useState<string>('')
  const [isWithdrawing, toggle] = useBoolean(false)
  const t = useToast()
  const { chain } = useNetwork()
  const { address, isDisconnected } = useAccount()

  const tokenBalance = useBalance({
    address: address,
    token: ASCENSION.AscensionToken.address as `0x${string}`,
    chainId: arbitrum.id,
    watch: true,
  })

  const stakingData = useStakingCalls()

  const apr = useMemo(() => {
    if (!stakingData) return null
    const r = parseBalance(stakingData.rewardRate) as number
    const t = parseBalance(stakingData.totalSupply) as number
    const apr = ((r * 31557600) / t) * 100
    if (isNaN(apr)) return '-%'
    if (apr < 1) return '<1%'
    if (apr > 1000000) return '>1,0000,000%'
    return `${commify(apr.toFixed(2))}%`
  }, [stakingData])

  const handleAmountInput = (input: string) => {
    Number.isNaN(parseFloat(input))
      ? setAmount('')
      : setAmount(input.replace(/\D/g, ''))
  }

  const exitConfig = usePrepareContractWrite({
    address: ASCENSION.AscensionStaking.address as `0x${string}`,
    abi: ASCENSION.AscensionStaking.abi,
    functionName: 'exit',
  })

  const withdrawConfig = usePrepareContractWrite({
    address: ASCENSION.AscensionStaking.address as `0x${string}`,
    abi: ASCENSION.AscensionStaking.abi,
    functionName: 'withdraw',
    args: [parseUnits(amount || '0')],
    enabled: Boolean(amount) && isWithdrawing,
  })
  const stakeConfig = usePrepareContractWrite({
    address: ASCENSION.AscensionStaking.address as `0x${string}`,
    abi: ASCENSION.AscensionStaking.abi,
    functionName: 'stake',
    args: [parseUnits(amount || '0')],
    enabled: Boolean(amount !== '') && !isWithdrawing,
  })

  const getRewardConfig = usePrepareContractWrite({
    address: ASCENSION.AscensionStaking.address as `0x${string}`,
    abi: ASCENSION.AscensionStaking.abi,
    functionName: 'getReward',
    chainId: arbitrum.id,
  })

  if (!stakingData) {
    return <Loader />
  }
  if (stakingData?.periodFinish?.lt(Math.floor(Date.now() / 1000))) {
    return (
      <>
        <NextSeo title="Stake" description="Ascension Protocol staking" />

        <Section centered>
          <div className="flex flex-col items-center justify-center gap-9 px-3 text-center">
            <Logo className="h-12" />
            <h2 className="text-xl">ASCEND staking is currently inactive</h2>

            {(stakingData?.balanceOf.gt(0) || stakingData?.earned.gt(0)) && (
              <WagmiTransactionButton
                color="gradient"
                full
                config={exitConfig?.config}
                name="Exit Staking"
                onTransactionSuccess={() =>
                  t('success', 'Exit Staking successful')
                }
                onTransactionError={() => t('error', 'Exit Staking failed')}
              />
            )}
            {/* {stakingData?.earned.gt(0) && (
              <WagmiTransactionButton
                color="green"
                full
                config={getRewardConfig?.config}
                name="Collect Rewards"
                onTransactionSuccess={() =>
                  t('success', 'Collect Rewards successful')
                }
              />
            )} */}
          </div>
        </Section>
      </>
    )
  }
  return (
    <>
      <NextSeo title="Stake" description="Ascension Protocol staking" />

      <Section className="pb-12 pt-9">
        <Container className="max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.66 }}
          >
            <Grid gap="md">
              <div className="col-span-12">
                <Stat
                  stats={[
                    { name: 'APR', stat: <>{apr || <Skeleton />}</> },
                    {
                      name: 'Total Staked',
                      stat: (
                        <>
                          {' '}
                          {stakingData ? (
                            <p>
                              {commify(
                                formatBalance(stakingData.totalSupply) || ''
                              )}
                            </p>
                          ) : (
                            <Skeleton />
                          )}
                        </>
                      ),
                    },
                    {
                      name: 'Rewards End',
                      stat: (
                        <>
                          {stakingData?.periodFinish ? (
                            new Date(
                              BigNumber.from(
                                stakingData?.periodFinish
                              ).toNumber() * 1000
                            ).toLocaleDateString()
                          ) : (
                            <Skeleton />
                          )}
                        </>
                      ),
                    },
                  ]}
                />
              </div>

              <Card className="col-span-12">
                <Card.Header>
                  <div className="flex w-full items-center  gap-3 ">
                    <Toggle
                      className=""
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
                      onToggle={toggle}
                      isActive={isWithdrawing}
                    />
                    <h1>{`${isWithdrawing ? 'Withdraw' : 'Deposit'}`}</h1>
                  </div>
                </Card.Header>
                <Card.Body>
                  {isDisconnected ? (
                    <div className="flex flex-col  items-center py-20 ">
                      <Loader message="Connect a wallet" />
                    </div>
                  ) : !stakingData ? (
                    <Loader message="Loading..." />
                  ) : chain?.id !== arbitrum.id ? (
                    <Loader message="Switch to Arbitrum" />
                  ) : (
                    <>
                      <div className="mr-3 flex flex-col items-center gap-3 md:mr-9 md:flex-row">
                        <div className="relative w-full">
                          <input
                            className="w-full rounded bg-zinc-100 p-3 text-sm text-black"
                            type="text"
                            value={amount}
                            placeholder="0.0"
                            onChange={(e) => handleAmountInput(e.target.value)}
                            max={
                              isWithdrawing
                                ? formatBalance(stakingData.balanceOf) || '0'
                                : tokenBalance.data?.formatted || '0'
                            }
                          />
                          <button
                            className="absolute right-9 top-0 bottom-0 p-1 text-black"
                            onClick={() => {
                              setAmount(
                                isWithdrawing
                                  ? formatBalance(
                                      stakingData.balanceOf as BigNumberish
                                    ) || '0'
                                  : tokenBalance.data?.formatted || '0'
                              )
                            }}
                          >
                            MAX
                          </button>
                        </div>

                        <div className="flex w-full items-center justify-center gap-3">
                          {amount === '' ? (
                            <>
                              <Button
                                color="gray"
                                className="md:mr-auto "
                                disabled
                              >
                                Enter an amount
                              </Button>
                            </>
                          ) : isWithdrawing ? (
                            <WagmiTransactionButton
                              className=" rounded bg-blue-500 p-3 md:mr-auto"
                              config={withdrawConfig.config}
                              name={`Withdraw ${commify(amount)} ASCEND`}
                              onTransactionSuccess={() =>
                                t('success', 'Withdraw successful')
                              }
                            />
                          ) : (
                            <WagmiTransactionButton
                              className="rounded bg-blue-500 p-3 md:mr-auto"
                              config={stakeConfig?.config}
                              name={`Deposit ${commify(amount)} ASCEND`}
                              onTransactionSuccess={() =>
                                t('success', 'Deposit successful')
                              }
                            />
                          )}
                        </div>
                      </div>
                      <ul className="my-6 max-w-sm space-y-2 rounded p-3 ">
                        <li className="flex">
                          Balance:{' '}
                          {commify(
                            formatBalance(
                              tokenBalance.data?.value as BigNumber
                            ) || '0'
                          )}
                        </li>

                        <li className="flex ">
                          Staked:{' '}
                          {`${commify(
                            formatBalance(
                              stakingData?.balanceOf as BigNumberish
                            ) || '0'
                          )} `}
                        </li>

                        <li className="flex ">
                          Rewards:{' '}
                          {` ${commify(
                            formatBalance(stakingData.earned as BigNumberish) ||
                              '0'
                          )} `}
                        </li>
                      </ul>
                      <div className="w-full  items-center justify-center space-y-3 lg:flex lg:gap-3 lg:space-y-0">
                        <WagmiTransactionButton
                          className="w-full rounded bg-green-500 p-3 "
                          config={getRewardConfig?.config}
                          name="Collect Rewards"
                          onTransactionSuccess={() =>
                            t('success', 'Collect Rewards successful')
                          }
                        />

                        <WagmiTransactionButton
                          className="w-full rounded bg-red-500 p-3 "
                          config={exitConfig?.config}
                          name="Exit Staking"
                          onTransactionSuccess={() =>
                            t('success', 'Exit Staking successful')
                          }
                        />
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Grid>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

StakePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  )
}

export default StakePage
