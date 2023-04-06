import { useAccount, useContractReads, useSignTypedData } from 'wagmi'
import { CHAIN_ID } from '../../../constants'
import { formatBalance, isAddress, shortenString } from '../../../functions'
import { useToast } from '../../../hooks'
import {
  ascensionPolyStakingPoolABI,
  ascensionPolyStakingPoolAddress,
  ascensionTokenAddress,
  useAscensionPolyStakingPool,
  useAscensionPolyStakingPoolReward,
  useAscensionPolyStakingPoolTotalRewardsTokens,
  usePrepareAscensionPolyStakingPoolMulticall,
} from '../../../wagmi/generated'
import RewardsSVG from 'public/assets/rewards.svg'
import PermitSVG from 'public/assets/permit.svg'
import Card from '../../ui/Card'
import Skeleton from '../../ui/Skeleton'
import WagmiTransactionButton from '../../WagmiTransactionButton'
import { m } from 'framer-motion'
import { Suspense, useMemo } from 'react'
import { BigNumber, ethers } from 'ethers'
import tokenList from '../../../json/arbitrum-tokens.json'
import { getAddress } from 'ethers/lib/utils.js'
import { useAsync, useLocalStorage } from 'react-use'
import Toggle from '../../ui/Toggle'
import Button from '../../ui/Button'
import Spinner from '../../ui/Spinner'

export default function RewardsCard({
  nonces,
  deadline,
}: {
  nonces: any
  deadline: any
}) {
  const t = useToast()
  const [isCompounding, setIsCompounding] = useLocalStorage(
    'isCompounding',
    true
  )
  const { address } = useAccount()

  const { data: totalRewardsTokens } =
    useAscensionPolyStakingPoolTotalRewardsTokens()

  const { data: rewardsTokens } = useContractReads({
    contracts: new Array(totalRewardsTokens?.toNumber())
      .fill(true)
      .map((_, i) => ({
        address: ascensionPolyStakingPoolAddress,
        abi: ascensionPolyStakingPoolABI,
        functionName: 'rewardsTokenAt',
        args: [BigNumber.from(i)],
        chainId: CHAIN_ID,
      })),
    enabled: !!address && !!totalRewardsTokens,
    onSuccess: (data) => {
      console.debug('REWARDS TOKENS', data)
    },
  })

  const { data: rewards } = useContractReads({
    contracts: new Array(totalRewardsTokens?.toNumber())
      .fill(true)
      .map((_, i) => ({
        address: ascensionPolyStakingPoolAddress,
        abi: ascensionPolyStakingPoolABI,
        functionName: 'reward',
        args: [rewardsTokens?.[i], address as `0x${string}`],
        chainId: CHAIN_ID,
      })),

    enabled: !!address && !!totalRewardsTokens && !!rewardsTokens,
    watch: true,
  })

  const { data: compoundableAscend } = useAscensionPolyStakingPoolReward({
    args: [ascensionTokenAddress, address as `0x${string}`],
    enabled: !!address,
  })

  const {
    data: sig,
    reset: resetSig,
    isLoading: isLoadingSig,
    isSuccess: isSuccessSig,
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
      spender: ascensionPolyStakingPoolAddress,
      value: compoundableAscend ?? ethers.constants.Zero,
      nonce: nonces ?? ethers.constants.Zero,
      deadline: deadline.current,
    },
  })

  const permit: ethers.Signature | null = useMemo(() => {
    if (!sig) return null
    try {
      return ethers.utils.splitSignature(sig)
    } catch (err) {
      console.error('SPLIT SIGNATURE ERROR', err)
      return null
    }
  }, [sig])

  const pool = useAscensionPolyStakingPool()

  const { value: claimCalldata } = useAsync(async () => {
    if (!address) return null
    if (!totalRewardsTokens) return null
    if (!pool) return null
    if (!rewardsTokens) return null
    if (!compoundableAscend) return null
    if (isCompounding && !isSuccessSig) return null
    try {
      let data = []

      for (let i = 0; i < totalRewardsTokens?.toNumber(); i++) {
        const tx = await pool?.populateTransaction.claim(
          rewardsTokens?.[i] as `0x${string}`,
          address
        )
        data.push(tx.data)
      }

      if (isCompounding) {
        const selfPermitTx = await pool?.populateTransaction.selfPermit(
          ascensionTokenAddress,
          compoundableAscend as BigNumber,
          deadline.current,
          permit?.v as number,
          permit?.r as `0x${string}`,
          permit?.s as `0x${string}`
        )

        const depositTx = await pool?.populateTransaction.deposit(
          compoundableAscend as BigNumber,
          address
        )
        data.push(selfPermitTx.data, depositTx.data)
      }

      console.debug('CLAIM CALLDATA', claimCalldata)
      return data
    } catch {
      return null
    }
  }, [
    address,
    totalRewardsTokens,
    pool,
    rewardsTokens,
    isCompounding,
    compoundableAscend,
    sig,
  ])

  const { data: claimMulticallConfig } =
    usePrepareAscensionPolyStakingPoolMulticall({
      args: [claimCalldata as any],
    })

  return (
    <>
      <Card>
        <Card.Header>
          <RewardsSVG className="h-10" />
          <h2 className="text-2xl text-secondary">Rewards</h2>
        </Card.Header>

        <ul className="mb-3 space-y-3 p-2">
          {totalRewardsTokens &&
            rewards &&
            new Array(totalRewardsTokens?.toNumber()).fill(true).map((_, i) => (
              <m.li
                initial={{ opacity: 0, translateY: 9 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                }}
                key={i}
                className="flex items-center justify-start gap-1 rounded bg-gradient-to-br from-gray-800 to-gray-900 p-1 ring ring-black drop-shadow"
              >
                <img
                  src={
                    (isAddress(rewardsTokens?.[i]) &&
                      tokenList.tokens?.find(
                        (t) =>
                          getAddress(t.address) ===
                          getAddress(rewardsTokens?.[i] as string)
                      )?.logoURI) ||
                    ''
                  }
                  alt=""
                  className="h-4"
                />
                <Suspense fallback={<Skeleton />}>
                  <span>{formatBalance(rewards?.[i] as BigNumber, 18, 6)}</span>
                  <span className="">
                    {(isAddress(rewardsTokens?.[i]) &&
                      tokenList.tokens?.find(
                        (t) =>
                          getAddress(t.address) ===
                          getAddress(rewardsTokens?.[i] as string)
                      )?.symbol) ||
                      shortenString(rewardsTokens?.[i] as string, 10)}
                  </span>
                </Suspense>
              </m.li>
            ))}
        </ul>
        <Card.Footer>
          <div className="flex-flex-col w-full space-y-3 ">
            <Toggle
              isActive={!!isCompounding}
              onToggle={() => setIsCompounding(!isCompounding)}
            />
            <span> Compound ASCEND rewards</span>
            {!isCompounding || (isCompounding && isSuccessSig) ? (
              <WagmiTransactionButton
                full
                variant="green"
                config={claimMulticallConfig}
                name={isCompounding ? `Claim & Compound` : `Claim`}
                onTransactionSuccess={(receipt) => {
                  t(
                    'success',
                    `Claim ${isCompounding ? '& Compound' : ''} successful.`
                  )
                  sig && resetSig()
                  console.debug('CLAIM RECEIPT', receipt)
                }}
              />
            ) : (
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
                    Permit Compound
                  </>
                )}
              </Button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </>
  )
}
