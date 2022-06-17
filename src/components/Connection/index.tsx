import React, { FC } from 'react'
import Button from '../ui/Button'
import AccountInfo from '../AccountInfo'
import { CHAIN_NAME, HOME_CHAINID, RPC } from '../../constants'
import { ChainId, useEthers } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Modal from '../ui/Modal'
import useToast from '../../hooks/useToast'
import { useBoolean } from 'react-use'
import { LoginIcon } from '@heroicons/react/outline'
import ArbitrumIcon from '../icons/networks/ArbitrumIcon'
import EthereumIcon from '../icons/networks/EthereumIcon'
import HardhatIcon from '../icons/networks/HardhatIcon'
import AvalancheIcon from '../icons/networks/AvalancheIcon'
import HarmonyIcon from '../icons/networks/HarmonyIcon'
import BscIcon from '../icons/networks/BscIcon'
import { Polygon } from 'recharts'
import PolygonIcon from '../icons/networks/PolygonIcon'
import GnosisIcon from '../icons/networks/GnosisIcon'
import FantomIcon from '../icons/networks/FantomIcon'

const CHAIN_ICON = {
  [ChainId.Hardhat]: <HardhatIcon />,
  [ChainId.ArbitrumRinkeby]: <ArbitrumIcon />,
  [ChainId.Arbitrum]: <ArbitrumIcon />,
  [ChainId.Mainnet]: <EthereumIcon />,
  [ChainId.Ropsten]: <EthereumIcon />,
  [ChainId.Rinkeby]: <EthereumIcon />,
  [ChainId.Goerli]: <EthereumIcon />,
  [ChainId.Kovan]: <EthereumIcon />,
  [ChainId.Fantom]: <FantomIcon />,
  [ChainId.Polygon]: <PolygonIcon />,
  [ChainId.xDai]: <GnosisIcon />,
  [ChainId.BSC]: <BscIcon />,
  [ChainId.BSCTestnet]: <ArbitrumIcon />,
  [ChainId.Avalanche]: <AvalancheIcon />,
  [ChainId.Harmony]: <HarmonyIcon />,
}

export default function Connection() {
  const { account, chainId } = useEthers()
  const { activateBrowserWallet, activate } = useEthers()
  const [viewing, toggle] = useBoolean(false)
  const t = useToast()

  const onWalletConnect = async () => {
    try {
      const provider = new WalletConnectProvider({
        chainId: HOME_CHAINID,
        rpc: RPC,
      })
      await provider.enable()
      await activate(provider as any)
      toggle()
    } catch (err) {
      t('error', err?.message)
    }
  }

  return (
    <>
      {!account ? (
        <>
          <Button color="blue" onClick={toggle}>
            <LoginIcon width={20} /> Connect Wallet
          </Button>
        </>
      ) : (
        <div className="flex gap-2">
          <Button className="border border-dark-900">{CHAIN_ICON[chainId ?? 1]}</Button>
          <AccountInfo />
        </div>
      )}

      <Modal isOpen={viewing && !account} onDismiss={() => toggle(false)}>
        <div className="my-3 flex flex-col items-center gap-3">
          <span className="mb-3 text-xl">Select a Wallet</span>
          <Button
            color="gray"
            onClick={() => {
              activateBrowserWallet()
              toggle()
            }}
          >
            <svg
              fill="none"
              height="24px"
              viewBox="0 0 35 33"
              width="32px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeLinecap="round" strokeLinejoin="round" strokeWidth=".25">
                <path
                  d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z"
                  fill="#e17726"
                  stroke="#e17726"
                />
                <g fill="#e27625" stroke="#e27625">
                  <path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z" />
                  <path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z" />
                  <path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z" />
                  <path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z" />
                  <path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z" />
                  <path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z" />
                  <path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z" />
                </g>
                <path
                  d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z"
                  fill="#d5bfb2"
                  stroke="#d5bfb2"
                />
                <path
                  d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z"
                  fill="#d5bfb2"
                  stroke="#d5bfb2"
                />
                <path
                  d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z"
                  fill="#233447"
                  stroke="#233447"
                />
                <path
                  d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z"
                  fill="#233447"
                  stroke="#233447"
                />
                <path
                  d="m10.8733 28.8721.6495-5.3386-4.13117.1167z"
                  fill="#cc6228"
                  stroke="#cc6228"
                />
                <path
                  d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z"
                  fill="#cc6228"
                  stroke="#cc6228"
                />
                <path
                  d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z"
                  fill="#cc6228"
                  stroke="#cc6228"
                />
                <path
                  d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z"
                  fill="#cc6228"
                  stroke="#cc6228"
                />
                <path
                  d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z"
                  fill="#e27525"
                  stroke="#e27525"
                />
                <path
                  d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z"
                  fill="#e27525"
                  stroke="#e27525"
                />
                <path
                  d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z"
                  fill="#e27525"
                  stroke="#e27525"
                />
                <path
                  d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z"
                  fill="#e27525"
                  stroke="#e27525"
                />
                <path
                  d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z"
                  fill="#f5841f"
                  stroke="#f5841f"
                />
                <path
                  d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z"
                  fill="#f5841f"
                  stroke="#f5841f"
                />
                <path
                  d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z"
                  fill="#c0ac9d"
                  stroke="#c0ac9d"
                />
                <path
                  d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z"
                  fill="#161616"
                  stroke="#161616"
                />
                <path
                  d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z"
                  fill="#763e1a"
                  stroke="#763e1a"
                />
                <path
                  d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z"
                  fill="#763e1a"
                  stroke="#763e1a"
                />
                <path
                  d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z"
                  fill="#f5841f"
                  stroke="#f5841f"
                />
                <path
                  d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z"
                  fill="#f5841f"
                  stroke="#f5841f"
                />
                <path
                  d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z"
                  fill="#f5841f"
                  stroke="#f5841f"
                />
              </g>
            </svg>{' '}
            MetaMask
          </Button>

          <Button color="gray" onClick={() => onWalletConnect()}>
            <svg
              width="32px"
              height="24px"
              viewBox="0 0 300 185"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="walletconnect-logo-alt" fill="#3B99FC" fillRule="nonzero">
                  <path
                    d="M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z"
                    id="WalletConnect"
                  ></path>
                </g>
              </g>
            </svg>{' '}
            WalletConnect
          </Button>
        </div>
      </Modal>
    </>
  )
}
