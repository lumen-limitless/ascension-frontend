import Section from '../../components/ui/Section'
import Container from '../../components/ui/Container'
import Grid from '../../components/ui/Grid'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Divider from '../../components/ui/Divider'
import { useMemo, useRef, useState } from 'react'
import Input from '../../components/ui/Input'
import {
  ascensionTokenAddress,
  ascensionRevenueDistributionTokenAddress,
  useAscensionTokenBalanceOf,
  useAscensionTokenNonces,
  useAscensionRevenueDistributionTokenBalanceOfAssets,
  useAscensionRevenueDistributionTokenConvertToAssets,
  useAscensionRevenueDistributionTokenIssuanceRate,
  useAscensionRevenueDistributionTokenTotalAssets,
  useAscensionRevenueDistributionTokenVestingPeriodFinish,
  usePrepareAscensionRevenueDistributionTokenWithdraw,
  usePrepareAscensionRevenueDistributionTokenDepositWithPermit,
} from '../../wagmi/generated'
import { useAccount, useSignTypedData } from 'wagmi'
import { commify, formatUnits, parseUnits } from '@ethersproject/units'
import { BigNumber, ethers } from 'ethers'
import { formatBalance, parseBalance, formatPercent } from '../../functions'
import Skeleton from '../../components/ui/Skeleton'
import { useBoolean } from 'react-use'
import WagmiTransactionButton from '../../components/WagmiTransactionButton'
import Spinner from '../../components/ui/Spinner'
import { m } from 'framer-motion'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useToast } from '../../hooks'
import { CHAIN_ID } from '../../constants'
import StatGrid from '../../components/ui/StatGrid'
import PermitSVG from 'public/assets/permit.svg'

export default function AscendStaking() {
  const t = useToast()
  const [amount, setAmount] = useState('')
  const [isWithdrawing, toggleWithdrawing] = useBoolean(false)
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const deadline = useRef(BigNumber.from(Math.floor(Date.now() / 1000 + 3600))) //1 hour from now

  const { data: ascendBalance } = useAscensionTokenBalanceOf({
    args: [address as `0x${string}`],
    enabled: !!address,
    watch: true,
    chainId: CHAIN_ID,
  })

  const { data: stakedBalance } =
    useAscensionRevenueDistributionTokenBalanceOfAssets({
      args: [address || '0x'],
      watch: true,
      enabled: !!address,
      chainId: CHAIN_ID,
    })

  const { data: conversionRate } =
    useAscensionRevenueDistributionTokenConvertToAssets({
      args: [parseUnits('1')],
      watch: true,
      chainId: CHAIN_ID,
    })

  const { data: periodFinish } =
    useAscensionRevenueDistributionTokenVestingPeriodFinish({
      chainId: CHAIN_ID,
    })

  const { data: nonces } = useAscensionTokenNonces({
    watch: true,
    args: [address as `0x${string}`],
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

  const apr = useMemo(() => {
    if (!issuanceRate) return null
    if (!totalAssets) return null

    const r = (parseBalance(issuanceRate) as number) / 1e30
    console.debug('r', r)
    const t = parseBalance(totalAssets) as number
    console.debug('t', t)
    const apr = ((r * 31557600) / t) * 100
    console.debug('apr', apr)
    return formatPercent(apr)
  }, [issuanceRate, totalAssets])

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
    value: {
      owner: address as `0x${string}`,
      spender: ascensionRevenueDistributionTokenAddress,
      value: parseUnits(amount || '0'),
      nonce: nonces ?? ethers.constants.Zero,
      deadline: deadline.current,
    },
  })

  const permit: ethers.Signature | null = useMemo(() => {
    if (!sig) return null
    return ethers.utils.splitSignature(sig)
  }, [sig])

  const { config: depositWithPermitConfig } =
    usePrepareAscensionRevenueDistributionTokenDepositWithPermit({
      args: [
        parseUnits(amount || '0'),
        address as `0x${string}`,
        deadline.current,
        permit?.v as number,
        permit?.r as `0x${string}`,
        permit?.s as `0x${string}`,
      ],
      enabled: !!amount && !!permit && !isWithdrawing,
    })

  const { data: withdrawConfig } =
    usePrepareAscensionRevenueDistributionTokenWithdraw({
      args: [
        parseUnits(amount || '0'),
        address as `0x${string}`,
        address as `0x${string}`,
      ],
      enabled: !!amount && isWithdrawing,
    })

  const handleAmountInput = (input: string) => {
    // Ensure input is a number
    if (Number.isNaN(parseFloat(input))) {
      setAmount('')
      resetSig()
      return
    }

    // Some currencies have more than 2 decimal places. Remove any
    // extra decimals from input.
    const decimals = input.split('.')[1]
    if (decimals && decimals.length > 2) {
      setAmount(input.replace(/[^0-9.]/g, ''))
      resetSig()
      return
    }

    // Replace any non-digit characters from input
    setAmount(input.replace(/[^0-9.]/g, ''))
    resetSig()
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
              <div className="col-span-12 md:col-span-8">
                <StatGrid
                  stats={[
                    { name: 'APR', stat: apr ?? <Skeleton /> },
                    {
                      name: 'Total Staked',
                      stat: totalAssets ? (
                        commify(formatBalance(totalAssets) as string)
                      ) : (
                        <Skeleton />
                      ),
                    },
                    {
                      name: 'Rewards End',
                      stat: periodFinish ? (
                        new Date(
                          Math.floor(periodFinish?.toNumber() * 1000)
                        ).toLocaleDateString()
                      ) : (
                        <Skeleton />
                      ),
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
                          {stakedBalance ? (
                            commify(
                              formatBalance(
                                stakedBalance as BigNumber,
                                18,
                                2
                              ) as string
                            )
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
                          {ascendBalance ? (
                            commify(
                              formatBalance(
                                ascendBalance as BigNumber,
                                18,
                                2
                              ) as string
                            )
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
                        variant={!isWithdrawing ? 'gray' : 'default'}
                        full
                        onClick={() => toggleWithdrawing(false)}
                      >
                        Stake
                      </Button>
                      <Button
                        variant={isWithdrawing ? 'gray' : 'default'}
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
                          {isWithdrawing ? 'Withdraw' : 'Stake'} ASCEND
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
                              formatBalance(conversionRate as BigNumber, 18, 6)
                            ) : (
                              <Skeleton />
                            )}{' '}
                            ASCEND
                          </div>
                        </div>
                      </div>
                      <Input.Numeric
                        value={amount}
                        onUserInput={handleAmountInput}
                        max={
                          ascendBalance
                            ? isWithdrawing
                              ? (formatUnits(
                                  stakedBalance as BigNumber
                                ) as string)
                              : (formatUnits(
                                  ascendBalance as BigNumber
                                ) as string)
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
                        config={withdrawConfig}
                        name={`Withdraw ${commify(amount)} ASCEND`}
                        onTransactionSuccess={(receipt) => {
                          resetSig()
                          t('success', 'Withdrawal Successful.')
                          console.debug('WITHDRAWAL RECEIPT', receipt)
                        }}
                      />
                    ) : !permit ? (
                      <>
                        <Button
                          full
                          disabled={isLoadingSig}
                          onClick={signTypedData}
                          variant="blue"
                        >
                          {isLoadingSig ? (
                            <Spinner />
                          ) : (
                            <>
                              <PermitSVG className="h-4" />
                              Permit Deposit
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <WagmiTransactionButton
                        full
                        variant="green"
                        config={depositWithPermitConfig}
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
