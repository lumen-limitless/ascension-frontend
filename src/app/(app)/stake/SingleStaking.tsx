import Section from '@/components/ui/Section'
import Container from '@/components/ui/container'
import Grid from '@/components/ui/Grid'
import { useMemo, useRef, useState } from 'react'
import {
  ascensionRevenueDistributionTokenAddress,
  useAscensionTokenBalanceOf,
  useAscensionTokenNonces,
  useAscensionRevenueDistributionTokenBalanceOfAssets,
  useAscensionRevenueDistributionTokenConvertToAssets,
  useAscensionRevenueDistributionTokenIssuanceRate,
  useAscensionRevenueDistributionTokenTotalAssets,
  useAscensionRevenueDistributionTokenVestingPeriodFinish,
  useAscensionRevenueDistributionTokenDepositWithPermit,
  useAscensionRevenueDistributionTokenWithdraw,
  ascensionTokenAddress,
  useAscensionRevenueDistributionTokenTotalSupply,
} from '@/wagmi/generated'
import { useAccount, useSignTypedData } from 'wagmi'
import { formatPercent, commify, splitSignature, parseBalance } from '@/utils'
import { useBoolean } from 'react-use'
import WagmiTransactionButton from '@/components/WagmiTransactionButton'
import { m } from 'framer-motion'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useToast } from '@/hooks'
import { CHAIN_ID } from '@/constants'
import StatGrid from '@/components/StatGrid'
import PermitButton from '@/components/PermitButton'
import { formatUnits, parseUnits } from 'viem'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Scale } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

export default function SingleStaking() {
  const t = useToast()
  const [amount, setAmount] = useState<string>('')
  const [isWithdrawing, toggleWithdrawing] = useBoolean(false)
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const deadline = useRef(Math.floor(Date.now() / 1000 + 3600)) //1 hour from now

  const ascendPrice = useQuery({
    queryKey: ['ascendPrice'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ascension-protocol&vs_currencies=usd'
      )
      const data = await response.json()
      return data['ascension-protocol'].usd as number
    },
  })

  const ascendBalance = useAscensionTokenBalanceOf({
    args: [address as `0x${string}`],
    enabled: !!address,
    watch: true,
    chainId: CHAIN_ID,
  })

  const nonces = useAscensionTokenNonces({
    watch: true,
    args: [address as `0x${string}`],
    chainId: CHAIN_ID,
  })

  const stakedBalance = useAscensionRevenueDistributionTokenBalanceOfAssets({
    args: [address || '0x'],
    watch: true,
    enabled: !!address,
    chainId: CHAIN_ID,
  })

  const conversionRate = useAscensionRevenueDistributionTokenConvertToAssets({
    args: [parseUnits('1', 18)],
    watch: true,
    chainId: CHAIN_ID,
  })

  const periodFinish = useAscensionRevenueDistributionTokenVestingPeriodFinish({
    chainId: CHAIN_ID,
  })

  const issuanceRate = useAscensionRevenueDistributionTokenIssuanceRate({
    chainId: CHAIN_ID,
    watch: true,
  })

  const totalAssets = useAscensionRevenueDistributionTokenTotalAssets({
    chainId: CHAIN_ID,
    watch: true,
  })

  const totalSupply = useAscensionRevenueDistributionTokenTotalSupply({
    chainId: CHAIN_ID,
    watch: true,
  })

  const apr = useMemo(() => {
    if (!issuanceRate.isSuccess) return null
    if (!totalSupply.isSuccess) return null

    const r = (parseBalance(issuanceRate.data as bigint) as number) / 1e30
    console.debug('r', r)
    const t = parseBalance(totalSupply.data as bigint) as number
    console.debug('t', t)
    const apr = ((r * 31557600) / t) * 100
    console.debug('apr', apr)
    return formatPercent(apr)
  }, [issuanceRate, totalSupply])

  const permitTypedData = useSignTypedData({
    domain: {
      name: 'Ascension Protocol',
      version: '1',
      chainId: CHAIN_ID,
      verifyingContract: ascensionTokenAddress,
    },
    types: {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    primaryType: 'Permit',
    message: {
      owner: address as `0x${string}`,
      spender: ascensionRevenueDistributionTokenAddress,
      value: parseUnits(amount as `${number}`, 18),
      nonce: nonces?.data ?? 0n,
      deadline: BigInt(deadline.current),
    },
  })

  const permit = useMemo(() => {
    if (!permitTypedData.isSuccess) return null
    try {
      return splitSignature(permitTypedData.data as `0x${string}`)
    } catch (e) {
      console.error(e)
      return null
    }
  }, [permitTypedData])

  const depositWithPermit =
    useAscensionRevenueDistributionTokenDepositWithPermit({
      args: [
        parseUnits(amount as `${number}`, 18),
        address as `0x${string}`,
        BigInt(deadline.current),
        permit?.v as number,
        permit?.r as `0x${string}`,
        permit?.s as `0x${string}`,
      ],
    })

  const withdraw = useAscensionRevenueDistributionTokenWithdraw({
    args: [
      parseUnits(amount as `${number}`, 18),
      address as `0x${string}`,
      address as `0x${string}`,
    ],
  })

  const handleAmountInput = (input: string) => {
    // Ensure input is a number
    if (Number.isNaN(parseFloat(input))) {
      setAmount('')
      return
    }

    // Some currencies have more than 2 decimal places. Remove any
    // extra decimals from input.
    const decimals = input.split('.')[1]
    if (decimals && decimals.length > 2) {
      setAmount(input.replace(/[^0-9.]/g, '') as `${number}`)
      return
    }

    // Replace any non-digit characters from input
    setAmount(input.replace(/[^0-9.]/g, '') as `${number}`)
  }

  return (
    <>
      <Section className="mb-32 py-8 md:mb-0">
        <Container className="max-w-5xl">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.66 }}
          >
            <Grid gap="md" className="">
              <div className="col-span-12">
                <StatGrid
                  stats={[
                    { name: 'APR', stat: apr },
                    {
                      name: 'Total Staked',
                      stat:
                        totalAssets.isSuccess &&
                        commify(formatUnits(totalAssets.data as bigint, 18), 2),
                    },
                    {
                      name: 'Rewards End',
                      stat:
                        periodFinish.isSuccess &&
                        Number(periodFinish.data as bigint) * 1000 < Date.now()
                          ? '--'
                          : new Date(
                              Math.floor(
                                Number(periodFinish.data as bigint) * 1000
                              )
                            ).toLocaleDateString(),
                    },
                  ]}
                />
              </div>
              <div className="col-span-12 md:order-last md:col-span-4">
                <Card>
                  <CardContent className="flex items-center justify-center gap-1 md:flex-col">
                    <Scale className="h-24 w-24 " />

                    <div className="space-y-1 text-center">
                      <h2 className="text-3xl">Staked</h2>
                      {stakedBalance.isSuccess ? (
                        <p>
                          {commify(
                            formatUnits(stakedBalance.data as bigint, 18),
                            2
                          ) + ' ASCEND'}
                        </p>
                      ) : (
                        <Skeleton className="h-5 w-24" />
                      )}
                      {stakedBalance.isSuccess && ascendPrice.isSuccess ? (
                        <p className="text-foreground/80">
                          $
                          {commify(
                            parseFloat(
                              formatUnits(stakedBalance.data as bigint, 18)
                            ) * ascendPrice.data,
                            2
                          )}
                        </p>
                      ) : (
                        <Skeleton className="h-5 w-24" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-12 md:col-span-8 ">
                <Card>
                  <CardHeader>
                    <div className="flex w-full">
                      <Button
                        className="w-full"
                        size={'lg'}
                        variant={isWithdrawing ? 'ghost' : 'gray'}
                        onClick={() => toggleWithdrawing(false)}
                      >
                        Deposit
                      </Button>
                      <Button
                        className="w-full"
                        size={'lg'}
                        variant={!isWithdrawing ? 'ghost' : 'gray'}
                        onClick={() => toggleWithdrawing(true)}
                      >
                        Withdraw
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
                        <h2 className="text-xl">
                          {isWithdrawing ? 'Withdraw' : 'Deposit'} ASCEND
                        </h2>
                        <div className="relative flex">
                          <div
                            className={
                              'absolute inset-0 bg-gradient-to-r from-orange to-pink p-px blur'
                            }
                          ></div>
                          <div className="z-10 inline-flex min-w-max items-center gap-1 rounded bg-gray-900 p-3">
                            {' '}
                            1 xASCEND ={' '}
                            {conversionRate.isSuccess ? (
                              commify(
                                formatUnits(conversionRate.data as bigint, 18),
                                2
                              ) + ' ASCEND'
                            ) : (
                              <Skeleton className="h-5 w-16" />
                            )}{' '}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col rounded p-3">
                        <Input
                          type="text"
                          placeholder="0.0"
                          value={amount}
                          onInput={(e) => {
                            e.preventDefault()
                            handleAmountInput(e.currentTarget.value)
                            permitTypedData.reset()
                          }}
                          max={
                            ascendBalance.isSuccess && stakedBalance.isSuccess
                              ? isWithdrawing
                                ? formatUnits(stakedBalance.data as bigint, 18)
                                : formatUnits(ascendBalance.data as bigint, 18)
                              : '0'
                          }
                        />
                        <div className="flex w-full items-center p-1">
                          <p
                            className="mr-1 text-opacity-80"
                            onClick={() => {
                              return
                            }}
                          >
                            {' '}
                            Balance:{' '}
                          </p>
                          {ascendBalance.isSuccess &&
                          stakedBalance.isSuccess ? (
                            isWithdrawing ? (
                              commify(
                                formatUnits(stakedBalance.data as bigint, 18),
                                2
                              )
                            ) : (
                              commify(
                                formatUnits(ascendBalance.data as bigint, 18),
                                2
                              )
                            )
                          ) : (
                            <Skeleton className="h-5 w-24" />
                          )}
                          <Button
                            variant="ghost"
                            className="ml-auto"
                            onClick={() => {
                              ascendBalance.isSuccess && stakedBalance.isSuccess
                                ? isWithdrawing
                                  ? setAmount(
                                      formatUnits(
                                        stakedBalance.data as bigint,
                                        18
                                      )
                                    )
                                  : setAmount(
                                      formatUnits(
                                        ascendBalance.data as bigint,
                                        18
                                      )
                                    )
                                : setAmount('0')
                            }}
                          >
                            {' '}
                            Max
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {!isConnected ? (
                      <Button onClick={openConnectModal} variant="blue">
                        Connect Wallet
                      </Button>
                    ) : amount === '' ? (
                      <>
                        <Button disabled variant={'ghost'}>
                          Enter an amount
                        </Button>
                      </>
                    ) : isWithdrawing ? (
                      <WagmiTransactionButton
                        variant="green"
                        transaction={withdraw}
                        name={`Withdraw ${commify(amount, 2)} ASCEND`}
                        onTransactionSuccess={(receipt) => {
                          permitTypedData.reset()
                          t('success', 'Withdrawal Successful.')
                          console.debug('WITHDRAWAL RECEIPT', receipt)
                        }}
                      />
                    ) : !permit ? (
                      <PermitButton
                        variant="blue"
                        isLoadingSig={permitTypedData.isLoading}
                        signTypedData={permitTypedData.signTypedData}
                      >
                        Permit Deposit{' '}
                      </PermitButton>
                    ) : (
                      <WagmiTransactionButton
                        variant="green"
                        transaction={depositWithPermit}
                        name={`Deposit ${commify(amount, 2)} ASCEND`}
                        onTransactionSuccess={(receipt) => {
                          permitTypedData.reset()
                          t('success', 'Deposit Successful.')
                          console.debug('DEPOSIT RECEIPT', receipt)
                        }}
                      />
                    )}
                  </CardFooter>
                </Card>
              </div>
            </Grid>
          </m.div>
        </Container>
      </Section>
    </>
  )
}
