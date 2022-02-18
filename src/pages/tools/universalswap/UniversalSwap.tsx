import { useDebounce, useEtherBalance, useEthers, useLocalStorage, useToken } from '@usedapp/core'
import { useState } from 'react'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import Loader from '../../../components/Loader'
import { CHAIN_IMG, CHAIN_NAME, CHAIN_SYMBOL, USD_ADDRESS, WNATIVE_ADDRESS } from '../../../constants'
import TradingChart from './TradingChart'
import Input from '../../../components/Input'
import { isAddress } from '../../../functions'
import { useToggle } from 'react-use'
import Modal from '../../../components/Modal'
import Skeleton from '../../../components/Skeleton'
import { CogIcon } from '@heroicons/react/outline'
import { getAddress } from 'ethers/lib/utils'
import Image from 'next/image'

export default function UniversalSwap() {
  const { chainId, account } = useEthers()
  const balance = useEtherBalance(account)
  const [lastToken, setLastToken] = useLocalStorage('LastToken')
  const [sellToken, setSellToken] = useState(WNATIVE_ADDRESS[chainId])
  const [buyToken, setBuyToken] = useState(lastToken ?? USD_ADDRESS[chainId])

  const [buyAmount, setBuyAmount] = useState()
  const [sellAmount, setSellAmount] = useState()
  const [settingBuyToken, toggleSettingBuyToken] = useToggle(false)
  const [input, setInput] = useState('')
  const tokenMetaData = useToken(isAddress(input) ? input : buyToken)

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row ">
        <Card className="shrink-0" title="Swap">
          <Button className="absolute top-0 right-0">{<CogIcon width={24} />}</Button>

          <div className="relative  flex w-full flex-col gap-1 rounded-xl bg-dark-1000 p-6">
            <Button variant="outlined" color="gray" className="w-32">
              {CHAIN_SYMBOL[chainId]}
            </Button>
            <Input.Numeric
              value="0.0"
              onUserInput={() => {
                return
              }}
            ></Input.Numeric>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                return
              }}
            >
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
            <Button variant="outlined" color="gray" className="w-32" onClick={toggleSettingBuyToken}>
              {tokenMetaData?.symbol ?? <Skeleton />}
            </Button>
            <Input.Numeric
              value={buyAmount}
              onUserInput={() => {
                return
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
        <TradingChart buyToken={buyToken} chainId={chainId} />
      </div>
      {settingBuyToken && (
        <Modal
          isOpen={settingBuyToken}
          onDismiss={() => {
            toggleSettingBuyToken()
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
            {isAddress(input) && tokenMetaData && (
              <Button
                disabled={isAddress(input) ? false : true}
                color="gray"
                variant="outlined"
                onClick={() => {
                  setBuyToken(getAddress(input))
                  setInput('')
                  setLastToken(input)
                  toggleSettingBuyToken()
                }}
              >
                {tokenMetaData.symbol}
              </Button>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
