// import React from 'react'
// import Section from '@/components/ui/Section'
// import Container from '@/components/ui/Container'
// import Grid from '@/components/ui/Grid'
// import Card from '@/components/ui/Card'
// import Button from '@/components/ui/Button'
// import { useMemo, useRef, useState } from 'react'
// import Input from '@/components/ui/Input'
// import { useAccount, useSignTypedData } from 'wagmi'
// import { commify, formatUnits, parseUnits } from '@ethersproject/units'
// import { BigNumber, ethers } from 'ethers'
// import { useAsync, useBoolean } from 'react-use'
// import WagmiTransactionButton from '@/components/WagmiTransactionButton'
// import Spinner from '@/components/ui/Spinner'
// import { m } from 'framer-motion'
// import { useConnectModal } from '@rainbow-me/rainbowkit'
// import { useToast } from '@/hooks'
// import { CHAIN_ID } from '@/constants'
// import {
//   ascensionPolyStakingPoolABI,
//   ascensionPolyStakingPoolAddress,
//   ascensionTokenAddress,
//   useAscensionPolyStakingPoolBalanceOf,
//   useAscensionTokenBalanceOf,
//   useAscensionTokenNonces,
//   usePrepareAscensionPolyStakingPoolMulticall,
//   usePrepareAscensionPolyStakingPoolSelfPermitIfNecessary,
//   usePrepareAscensionPolyStakingPoolWithdraw,
// } from '@/wagmi/generated'
// import RewardsCard from './RewardsCard'
// import BalanceCard from './BalanceCard'
// import EarnStats from './PolyStakingStats'
// import PermitSVG from 'public/assets/permit.svg'
// import { clsx } from 'clsx'

// export default function PolyStaking() {
//   const t = useToast()
//   const [amount, setAmount] = useState('')
//   const [isWithdrawing, toggleWithdrawing] = useBoolean(false)
//   const { openConnectModal } = useConnectModal()
//   const { address, isConnected } = useAccount()
//   const deadline = useRef(BigNumber.from(Math.floor(Date.now() / 1000 + 3600))) //1 hour from now

//   const { data: ascendBalance } = useAscensionTokenBalanceOf({
//     args: [address || '0x'],
//     enabled: !!address,
//     watch: true,
//     chainId: CHAIN_ID,
//   })

//   const { data: stakedBalance } = useAscensionPolyStakingPoolBalanceOf({
//     args: [address as `0x${string}`],
//     watch: true,
//     enabled: !!address,
//     chainId: CHAIN_ID,
//   })

//   const { data: nonces } = useAscensionTokenNonces({
//     args: [address as `0x${string}`],
//     watch: true,
//     enabled: !!address,
//     chainId: CHAIN_ID,
//   })

//   const {
//     data: sig,
//     reset: resetSig,
//     isLoading: isLoadingSig,
//     signTypedData,
//   } = useSignTypedData({
//     domain: {
//       name: 'Ascension Protocol',
//       version: '1',
//       chainId: CHAIN_ID,
//       verifyingContract: ascensionTokenAddress,
//     },
//     types: {
//       Permit: [
//         { name: 'owner', type: 'address' },
//         { name: 'spender', type: 'address' },
//         { name: 'value', type: 'uint256' },
//         { name: 'nonce', type: 'uint256' },
//         { name: 'deadline', type: 'uint256' },
//       ],
//     },
//     value: {
//       owner: address as `0x${string}`,
//       spender: ascensionPolyStakingPoolAddress,
//       value: parseUnits(amount || '0'),
//       nonce: nonces ?? ethers.constants.Zero,
//       deadline: deadline.current,
//     },
//   })

//   const permit: ethers.Signature | null = useMemo(() => {
//     if (!sig) return null
//     try {
//       return ethers.utils.splitSignature(sig)
//     } catch (err) {
//       console.error('SPLIT SIGNATURE ERROR', err)
//       return null
//     }
//   }, [sig])

//   const { data: selfPermitConfig } =
//     usePrepareAscensionPolyStakingPoolSelfPermitIfNecessary({
//       args: [
//         ascensionTokenAddress,
//         parseUnits(amount || '0'),
//         deadline.current,
//         permit?.v as number,
//         permit?.r as `0x${string}`,
//         permit?.s as `0x${string}`,
//       ],
//       enabled: !!amount && !!permit,
//     })

//   const { value: depositCalldata } = useAsync(async () => {
//     if (!amount) return null
//     if (!address) return null
//     try {
//       const contract = new ethers.Contract(
//         ascensionPolyStakingPoolAddress,
//         ascensionPolyStakingPoolABI
//       )

//       const unsignedTx = await contract.populateTransaction.deposit(
//         parseUnits(amount),
//         address
//       )

//       return unsignedTx.data as `0x${string}`
//     } catch (err) {
//       console.error(err)
//       return null
//     }
//   }, [amount, address])

//   const { data: depositMulticallConfig } =
//     usePrepareAscensionPolyStakingPoolMulticall({
//       args: [
//         [
//           selfPermitConfig?.request?.data as `0x${string}`,
//           depositCalldata as `0x${string}`,
//         ],
//       ],
//       enabled: !!depositCalldata && !!selfPermitConfig?.request?.data,
//     })

//   const { data: withdrawConfig } = usePrepareAscensionPolyStakingPoolWithdraw({
//     args: [
//       parseUnits(amount || '0'),
//       address as `0x${string}`,
//       address as `0x${string}`,
//     ],
//     enabled: !!amount && isWithdrawing,
//   })

//   const handleAmountInput = (input: string) => {
//     Number.isNaN(parseFloat(input))
//       ? setAmount('')
//       : setAmount(input.replace(/[^0-9.]/g, ''))
//     resetSig()
//   }

//   return (
//     <>
//       <Section className="mb-32 py-3 md:mb-0 md:py-12">
//         <Container className="max-w-5xl">
//           <m.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ ease: 'easeOut', duration: 0.66 }}
//           >
//             <Grid gap="md">
//               <div
//                 className={clsx(
//                   ' col-span-12 flex flex-col gap-3 md:col-span-8'
//                 )}
//               >
//                 <EarnStats />
//                 <Card className="h-full">
//                   <Card.Header>
//                     <div className="mx-3 inline-flex w-full justify-center rounded bg-black p-3 md:mx-6">
//                       <Button
//                         variant={!isWithdrawing ? 'gray' : 'none'}
//                         full
//                         onClick={() => toggleWithdrawing(false)}
//                       >
//                         Deposit
//                       </Button>
//                       <Button
//                         variant={isWithdrawing ? 'gray' : 'none'}
//                         full
//                         onClick={() => toggleWithdrawing(true)}
//                       >
//                         Withdraw
//                       </Button>
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <div className="space-y-5 ">
//                       <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
//                         <h2 className="text-xl">
//                           {isWithdrawing ? 'Withdraw' : 'Deposit'} ASCEND
//                         </h2>
//                       </div>
//                       <Input.Numeric
//                         value={amount}
//                         onUserInput={handleAmountInput}
//                         max={
//                           ascendBalance
//                             ? isWithdrawing
//                               ? (formatUnits(
//                                   stakedBalance as BigNumber
//                                 ) as string)
//                               : (formatUnits(
//                                   ascendBalance as BigNumber
//                                 ) as string)
//                             : '0'
//                         }
//                       />
//                     </div>
//                   </Card.Body>
//                   <Card.Footer>
//                     {!isConnected ? (
//                       <Button variant="blue" full onClick={openConnectModal}>
//                         Connect Wallet
//                       </Button>
//                     ) : amount === '' ? (
//                       <>
//                         <Button variant="none" full disabled>
//                           Enter an amount
//                         </Button>
//                       </>
//                     ) : isWithdrawing ? (
//                       <WagmiTransactionButton
//                         full
//                         variant="green"
//                         config={withdrawConfig}
//                         name={`Withdraw ${commify(amount)} ASCEND`}
//                         onTransactionSuccess={(receipt: any) => {
//                           resetSig()
//                           t('success', 'Withdrawal Successful.')
//                           console.debug('WITHDRAWAL RECEIPT', receipt)
//                         }}
//                       />
//                     ) : !permit ? (
//                       <>
//                         <Button
//                           full
//                           disabled={isLoadingSig}
//                           onClick={signTypedData}
//                           variant="blue"
//                         >
//                           {isLoadingSig ? (
//                             <Spinner />
//                           ) : (
//                             <>
//                               <PermitSVG className="h-4" />
//                               Permit Deposit
//                             </>
//                           )}
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <WagmiTransactionButton
//                           full
//                           variant="green"
//                           config={depositMulticallConfig}
//                           name={`Deposit ${commify(amount)} ASCEND`}
//                           onTransactionSuccess={(receipt: any) => {
//                             resetSig()
//                             t('success', 'Deposit successful.')
//                             console.debug('DEPOSIT RECEIPT', receipt)
//                           }}
//                         />
//                       </>
//                     )}
//                   </Card.Footer>
//                 </Card>
//               </div>
//               {isConnected && (
//                 <div className="col-span-12 space-y-3 md:col-span-4">
//                   <BalanceCard
//                     ascendBalance={ascendBalance}
//                     stakedBalance={stakedBalance}
//                   />
//                   <RewardsCard nonces={nonces} deadline={deadline} />
//                 </div>
//               )}
//             </Grid>
//           </m.div>
//         </Container>
//       </Section>
//     </>
//   )
// }
