import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Grid from '@/components/ui/Grid'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Input from '@/components/ui/Input'
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
import {
  formatBalance,
  formatPercent,
  commify,
  splitSignature,
  parseBalance,
} from '@/utils'
import Skeleton from 'react-loading-skeleton'
import { useBoolean } from 'react-use'
import WagmiTransactionButton from '@/components/WagmiTransactionButton'
import { m } from 'framer-motion'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useToast } from '@/hooks'
import { CHAIN_ID } from '@/constants'
import StatGrid from '@/components/StatGrid'
import PermitButton from '@/components/PermitButton'
import { formatUnits, parseUnits } from 'viem'

export default function SingleStaking() {
  const t = useToast()
  const [amount, setAmount] = useState<string>('')
  const [isWithdrawing, toggleWithdrawing] = useBoolean(false)
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const deadline = useRef(Math.floor(Date.now() / 1000 + 3600)) //1 hour from now

  const { data: ascendBalance, isFetched: ascendBalanceIsFetched } =
    useAscensionTokenBalanceOf({
      args: [address as `0x${string}`],
      enabled: !!address,
      watch: true,
      chainId: CHAIN_ID,
    })

  const { data: nonces } = useAscensionTokenNonces({
    watch: true,
    args: [address as `0x${string}`],
    chainId: CHAIN_ID,
  })

  const { data: stakedBalance, isFetched: stakedBalanceIsFetched } =
    useAscensionRevenueDistributionTokenBalanceOfAssets({
      args: [address || '0x'],
      watch: true,
      enabled: !!address,
      chainId: CHAIN_ID,
    })

  const { data: conversionRate } =
    useAscensionRevenueDistributionTokenConvertToAssets({
      args: [parseUnits('1', 18)],
      watch: true,
      chainId: CHAIN_ID,
    })

  const { data: periodFinish } =
    useAscensionRevenueDistributionTokenVestingPeriodFinish({
      chainId: CHAIN_ID,
    })

  const { data: issuanceRate } =
    useAscensionRevenueDistributionTokenIssuanceRate({
      chainId: CHAIN_ID,
      watch: true,
    })

  const { data: totalAssets } = useAscensionRevenueDistributionTokenTotalAssets(
    {
      chainId: CHAIN_ID,
      watch: true,
    }
  )

  const { data: totalSupply } = useAscensionRevenueDistributionTokenTotalSupply(
    {
      chainId: CHAIN_ID,
      watch: true,
    }
  )

  const apr = useMemo(() => {
    if (!issuanceRate) return null
    if (!totalSupply) return null

    const r = (parseBalance(issuanceRate) as number) / 1e30
    console.debug('r', r)
    const t = parseBalance(totalSupply) as number
    console.debug('t', t)
    const apr = ((r * 31557600) / t) * 100
    console.debug('apr', apr)
    return formatPercent(apr)
  }, [issuanceRate, totalSupply])

  const {
    data: sig,
    reset: resetSig,
    isLoading: isLoadingSig,
    signTypedData,
  } = useSignTypedData({
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
      nonce: nonces ?? 0n,
      deadline: BigInt(deadline.current),
    },
  })

  const permit = useMemo(() => {
    if (!sig) return null
    try {
      return splitSignature(sig)
    } catch (e) {
      console.error(e)
      return null
    }
  }, [sig])

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
        <Container>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.66 }}
          >
            <Grid gap="md" className="">
              <div className="col-span-12 md:col-span-8">
                <StatGrid
                  stats={[
                    { name: 'APR', stat: apr },
                    {
                      name: 'Total Staked',
                      stat: totalAssets ? (
                        commify(formatUnits(totalAssets, 18))
                      ) : (
                        <Skeleton />
                      ),
                    },
                    {
                      name: 'Rewards End',
                      stat:
                        !!periodFinish &&
                        Number(periodFinish) * 1000 < Date.now()
                          ? '--'
                          : new Date(
                              Math.floor(Number(periodFinish) * 1000)
                            ).toLocaleDateString(),
                    },
                  ]}
                />
              </div>
              <div className="col-span-12 md:col-span-4 md:row-span-2   ">
                <Card className="h-full">
                  <Card.Body>
                    <div className="flex min-w-max items-center gap-1">
                      <div>
                        <h2 className="text-3xl text-secondary">Staked</h2>
                        <span>
                          {stakedBalanceIsFetched ? (
                            commify(formatUnits(stakedBalance ?? 0n, 18))
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </div>
                    </div>
                    <Divider />
                    <div className="flex min-w-max items-center gap-1 ">
                      <div>
                        <h2 className="text-3xl text-secondary">Balance</h2>
                        <span>
                          {ascendBalanceIsFetched ? (
                            commify(formatUnits(ascendBalance ?? 0n, 18))
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-span-12 md:col-span-8 ">
                <Card>
                  <Card.Header>
                    <div className="mx-3 inline-flex w-full justify-center rounded bg-black p-2 md:mx-6">
                      <Button
                        variant={!isWithdrawing ? 'gray' : 'none'}
                        full
                        onClick={() => toggleWithdrawing(false)}
                      >
                        Deposit
                      </Button>
                      <Button
                        variant={isWithdrawing ? 'gray' : 'none'}
                        full
                        onClick={() => toggleWithdrawing(true)}
                      >
                        Withdraw
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
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
                          <div className="z-10 inline-flex min-w-max gap-1 rounded bg-gray-900 p-3">
                            {' '}
                            1 xASCEND ={' '}
                            {conversionRate ? (
                              commify(formatUnits(conversionRate, 18))
                            ) : (
                              <Skeleton />
                            )}{' '}
                            ASCEND
                          </div>
                        </div>
                      </div>
                      <Input.Numeric
                        value={amount}
                        onUserInput={(input) => {
                          handleAmountInput(input)
                          resetSig()
                        }}
                        max={
                          ascendBalance && stakedBalance
                            ? isWithdrawing
                              ? formatUnits(stakedBalance, 18)
                              : formatUnits(ascendBalance, 18)
                            : '0'
                        }
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    {!isConnected ? (
                      <Button variant="blue" full onClick={openConnectModal}>
                        Connect Wallet
                      </Button>
                    ) : amount === '' ? (
                      <>
                        <Button full disabled>
                          Enter an amount
                        </Button>
                      </>
                    ) : isWithdrawing ? (
                      <WagmiTransactionButton
                        full
                        variant="green"
                        transaction={withdraw}
                        name={`Withdraw ${commify(amount)} ASCEND`}
                        onTransactionSuccess={(receipt) => {
                          resetSig()
                          t('success', 'Withdrawal Successful.')
                          console.debug('WITHDRAWAL RECEIPT', receipt)
                        }}
                      />
                    ) : !permit ? (
                      <PermitButton
                        isLoadingSig={isLoadingSig}
                        signTypedData={signTypedData}
                      >
                        Permit Deposit{' '}
                      </PermitButton>
                    ) : (
                      <WagmiTransactionButton
                        full
                        variant="green"
                        transaction={depositWithPermit}
                        name={`Deposit ${commify(amount)} ASCEND`}
                        onTransactionSuccess={(receipt) => {
                          resetSig()
                          t('success', 'Deposit Successful.')
                          console.debug('DEPOSIT RECEIPT', receipt)
                        }}
                      />
                    )}
                  </Card.Footer>
                </Card>
              </div>
            </Grid>
          </m.div>
        </Container>
      </Section>
    </>
  )
}
