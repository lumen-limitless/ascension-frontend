import { formatUnits } from 'ethers/lib/utils'
import { useState } from 'react'
import { useSessionStorage, useToggle } from 'react-use'
import { formatBalance } from '../functions'
import Button from './ui/Button'
import Card from './ui/Card'
import Input from './ui/Input'
import Modal from './ui/Modal'
import tokenList from '../json/tokenList.json'
import { useAccount } from 'wagmi'
import { Token } from '../types'

// export default function Swap() {
//   const { address } = useAccount()
//   const balance = 0
//   const [tokenIn, setTokenIn] = useSessionStorage<Token>('mercury_tokenIn')
//   const [tokenOut, setTokenOut] = useSessionStorage<Token>('mercury_tokenOut')

//   console.debug(quote)
//   const allowance = 0

//   const sellTokenBalance = 0
//   const buyTokenBalance = 0
//   const [sellAmount, setSellAmount] = useState('')
//   const [buyAmount, setBuyAmount] = useState('')

//   const [settingTokenIn, toggleSettingTokenIn] = useToggle(false)
//   const [settingTokenOut, toggleSettingTokenOut] = useToggle(false)
//   const [input, setInput] = useState('')

//   const switchTokens = () => {
//     setTokenIn(tokenOut)
//     setTokenOut(tokenIn)
//   }

//   return (
//     <>
//       <Card className="shrink-0">
//         <Card.Header>Swap</Card.Header>
//         <Card.Body>
//           <div className="text-low-emphesis flex text-sm">You Pay:</div>
//           <div className="relative  flex w-full flex-col gap-1 rounded-xl bg-purple-900 p-6 shadow-md">
//             <div className="absolute top-3 right-3 text-xs">
//               Balance:{' '}
//               {sellTokenBalance
//                 ? formatBalance(sellTokenBalance)
//                 : balance
//                 ? formatBalance(balance)
//                 : '0.0'}
//             </div>
//             <Button
//               color="gray"
//               className="w-32"
//               onClick={toggleSettingTokenIn}
//             >
//               {tokenIn.symbol}
//             </Button>
//             <Input.Numeric
//               value={sellAmount}
//               onUserInput={(i) => {
//                 setSellAmount(i)
//               }}
//             />
//           </div>
//           <div className="flex justify-center">
//             <Button onClick={switchTokens}>
//               <svg
//                 width="32px"
//                 height="32px"
//                 viewBox="0 0 1024 1024"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="text-ascend-magenta rotate-90 fill-current"
//               >
//                 <path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
//               </svg>
//             </Button>
//           </div>
//           <div className="text-low-emphesis flex text-sm">You Receive:</div>
//           <div className="relative flex w-full flex-col gap-1 rounded-xl bg-purple-900 p-6 shadow-md">
//             <div className="absolute top-3 right-3 text-xs">
//               Balance: {buyTokenBalance && formatUnits(buyTokenBalance)}
//             </div>
//             <Button
//               color="gray"
//               className="w-32"
//               onClick={toggleSettingTokenOut}
//             >
//               {tokenOut.symbol}
//             </Button>
//             <Input.Numeric
//               value={buyAmount}
//               onUserInput={(i) => {
//                 setBuyAmount(i)
//               }}
//             />
//           </div>
//           <div className="mt-9">
//             <Button full color="gradient">
//               Swap
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>
//       {[settingTokenIn, settingTokenOut].includes(true) && (
//         <Modal
//           isOpen={settingTokenIn || settingTokenOut ? true : false}
//           onDismiss={() => {
//             toggleSettingTokenIn(false)
//             toggleSettingTokenOut(false)
//             setInput('')
//           }}
//         >
//           <div className="flex flex-col gap-3">
//             <h2>Select a token</h2>
//             <Input.Address
//               placeholder="Enter contract address..."
//               value={input}
//               onUserInput={(input) => setInput(input)}
//             />

//             <h2>Token List</h2>
//             <div className=" h-64 overflow-y-scroll">
//               {tokenList.map((token) => (
//                 <button
//                   onClick={() =>
//                     settingTokenIn ? setTokenIn(token) : setTokenOut(token)
//                   }
//                   key={token.address + token.chainId}
//                   className="flex gap-3 p-3"
//                 >
//                   <img className="h-6 w-6" src={token.logoURI} />
//                   <span>{token.name}</span>
//                   <span>{token.symbol}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   )
// }
