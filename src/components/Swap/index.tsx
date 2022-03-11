import { CogIcon } from '@heroicons/react/outline'
import {
  shortenIfAddress,
  useEtherBalance,
  useEthers,
  useLocalStorage,
  useToken,
  useTokenAllowance,
  useTokenBalance,
  useTokenList,
} from '@usedapp/core'
import { BigNumber, ethers } from 'ethers'
import { formatUnits, getAddress } from 'ethers/lib/utils'
import Image from 'next/image'
import { SetStateAction, useState } from 'react'
import { useToggle } from 'react-use'
import { CHAIN_SYMBOL, DEX_BY_CHAIN, USD_ADDRESS, WNATIVE_ADDRESS } from '../../constants'
import { formatBalance, isAddress } from '../../functions'
import { Token } from '../../types'
import Button from '../Button'
import Card from '../Card'
import Dropdown from '../Dropdown'
import Input from '../Input'
import Loader from '../Loader'
import Modal from '../Modal'
import Skeleton from '../Skeleton'
import Tabs from '../Tabs'
import TradingChart from '../TradingChart'

interface SwapProps {
  sellToken: Token
  setSellToken: React.Dispatch<SetStateAction<Token>>
  buyToken: Token
  setBuyToken: React.Dispatch<SetStateAction<Token>>
  dex: string
  setDex: React.Dispatch<SetStateAction<string>>
}
export default function Swap({ sellToken, setSellToken, buyToken, setBuyToken, dex, setDex }: SwapProps) {
  const { chainId, account } = useEthers()
  const balance = useEtherBalance(account)
  const [, setLastSellToken] = useLocalStorage('LastSellToken')
  const [, setLastBuyToken] = useLocalStorage('LastBuyToken')
  const allowance = useTokenAllowance(sellToken.address, account, DEX_BY_CHAIN[chainId][dex].router)
  const sellTokenBalance = useTokenBalance(sellToken.address, account)
  const buyTokenBalance = useTokenBalance(buyToken.address, account)
  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')

  const [settingBuyToken, toggleSettingBuyToken] = useToggle(false)
  const [settingSellToken, toggleSettingSellToken] = useToggle(false)
  const [input, setInput] = useState('')
  const inputMeta = useToken(isAddress(input) ? getAddress(input) : null)
  const tokenList = useTokenList('https://gateway.ipfs.io/ipns/tokens.uniswap.org')

  const switchTokens = () => {
    setSellToken(buyToken)
    setBuyToken(sellToken)
  }

  const handleTokenInput = (t: Token) => {
    if (settingSellToken) {
      setSellToken(t)
      setInput('')
      setLastSellToken(t)
      toggleSettingSellToken()
    }
    if (settingBuyToken) {
      setBuyToken(t)
      setInput('')
      setLastBuyToken(t)
      toggleSettingBuyToken()
    }
  }

  return (
    <>
      <Card className="shrink-0" title="Swap">
        {' '}
        <div className="absolute top-1 right-1 flex items-center justify-center ">
          <Dropdown options={Object.keys(DEX_BY_CHAIN[chainId])} selected={dex} onSelect={setDex} />
          <Button className="">{<CogIcon width={24} />}</Button>
        </div>
        <div className="relative  flex w-full flex-col gap-1 rounded-xl bg-dark-1000 p-6">
          <div className="absolute top-3 right-3 text-xs">
            Balance: {sellTokenBalance ? formatBalance(sellTokenBalance) : balance ? formatBalance(balance) : '0.0'}
          </div>
          <Button variant="outlined" color="gray" className="w-32" onClick={toggleSettingSellToken}>
            {sellToken?.symbol ?? CHAIN_SYMBOL[chainId]}
          </Button>
          <Input.Numeric
            value={sellAmount}
            onUserInput={(i) => {
              setSellAmount(i)
            }}
          ></Input.Numeric>
        </div>
        <div className="flex justify-center">
          <Button onClick={switchTokens}>
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90 fill-current text-ascend-magenta"
            >
              <path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
            </svg>
          </Button>
        </div>
        <div className="relative flex w-full flex-col gap-1 rounded-xl bg-dark-1000 p-6">
          <div className="absolute top-3 right-3 text-xs">
            Balance: {buyTokenBalance && formatUnits(buyTokenBalance)}
          </div>
          <Button variant="outlined" color="gray" className="w-32" onClick={toggleSettingBuyToken}>
            {buyToken?.symbol}
          </Button>
          <Input.Numeric
            value={buyAmount}
            onUserInput={(i) => {
              setBuyAmount(i)
            }}
          ></Input.Numeric>
        </div>
        <div className="mt-9">
          <Button
            color="gradient"
            disabled
            onClick={() => {
              return
            }}
          >
            Swap
          </Button>
        </div>
      </Card>
      {[settingBuyToken, settingSellToken].includes(true) && (
        <Modal
          isOpen={settingBuyToken || settingSellToken ? true : false}
          onDismiss={() => {
            toggleSettingBuyToken(false)
            toggleSettingSellToken(false)
            setInput('')
          }}
        >
          <div className="flex flex-col gap-3">
            <h2>Select a token</h2>
            <Input.Address
              placeholder="Enter contract address..."
              value={input}
              onUserInput={(input) => setInput(input)}
            ></Input.Address>
            {isAddress(input) && inputMeta && (
              <Button
                disabled={isAddress(input) ? false : true}
                color="gray"
                variant="outlined"
                onClick={() =>
                  handleTokenInput({
                    address: input,
                    name: inputMeta.name,
                    symbol: inputMeta.symbol,
                    decimals: inputMeta.decimals,
                    chainId: chainId,
                  })
                }
              >
                {inputMeta.name}({inputMeta.symbol})
              </Button>
            )}

            <h2>Token List</h2>
            <div className=" h-64 overflow-y-scroll">
              {tokenList.tokens.map((t) => {
                return (
                  <Button key={t.address} onClick={() => handleTokenInput(t)}>
                    {t.name}({t.symbol})
                  </Button>
                )
              })}
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
