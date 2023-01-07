import React from 'react'
import Button from '../ui/Button'
import { useEthers } from '@usedapp/core'
import { useToast, useUI } from '../../hooks'
import ExternalLink from '../ui/ExternalLink'
import { RPC } from '../../constants'

export default function Connect() {
  const { activateBrowserWallet, activate } = useEthers()
  const { toggleViewingModal } = useUI()
  const t = useToast()
  const onWalletConnect = async () => {
    try {
      const WalletConnectConnector = await import(
        '@web3-react/walletconnect-connector'
      ).then((mod) => mod.WalletConnectConnector)
      const walletconnect = new WalletConnectConnector({
        rpc: RPC,
        qrcode: true,
      })
      await activate(walletconnect).then(() => toggleViewingModal(false))
    } catch (err) {
      console.error(err)
      t('error', 'Failed to connect wallet')
      return
    }
  }

  const onBrowserWallet = (type: string) => {
    try {
      activateBrowserWallet({ type: type })
      toggleViewingModal(false)
    } catch (err) {
      console.error(err)
      t('error', 'Failed to connect wallet')
      return
    }
  }

  return (
    <>
      <div className="my-3 flex flex-col items-center gap-3">
        <h2 className="mb-3 text-xl">Select a Wallet</h2>
        <Button
          full
          size="lg"
          color="gray"
          onClick={() => onBrowserWallet('metamask')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width={24}
            height={24}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 240"
          >
            <path fill="#E17726" d="M250.066 0L140.219 81.279l20.427-47.9z" />
            <path
              fill="#E27625"
              d="m6.191.096l89.181 33.289l19.396 48.528zM205.86 172.858l48.551.924l-16.968 57.642l-59.243-16.311zm-155.721 0l27.557 42.255l-59.143 16.312l-16.865-57.643z"
            />
            <path
              fill="#E27625"
              d="m112.131 69.552l1.984 64.083l-59.371-2.701l16.888-25.478l.214-.245zm31.123-.715l40.9 36.376l.212.244l16.888 25.478l-59.358 2.7zM79.435 173.044l32.418 25.259l-37.658 18.181zm97.136-.004l5.131 43.445l-37.553-18.184z"
            />
            <path
              fill="#D5BFB2"
              d="m144.978 195.922l38.107 18.452l-35.447 16.846l.368-11.134zm-33.967.008l-2.909 23.974l.239 11.303l-35.53-16.833z"
            />
            <path
              fill="#233447"
              d="m100.007 141.999l9.958 20.928l-33.903-9.932zm55.985.002l24.058 10.994l-34.014 9.929z"
            />
            <path
              fill="#CC6228"
              d="m82.026 172.83l-5.48 45.04l-29.373-44.055zm91.95.001l34.854.984l-29.483 44.057zm28.136-44.444l-25.365 25.851l-19.557-8.937l-9.363 19.684l-6.138-33.849zm-148.237 0l60.435 2.749l-6.139 33.849l-9.365-19.681l-19.453 8.935z"
            />
            <path
              fill="#E27525"
              d="m52.166 123.082l28.698 29.121l.994 28.749zm151.697-.052l-29.746 57.973l1.12-28.8zm-90.956 1.826l1.155 7.27l2.854 18.111l-1.835 55.625l-8.675-44.685l-.003-.462zm30.171-.101l6.521 35.96l-.003.462l-8.697 44.797l-.344-11.205l-1.357-44.862z"
            />
            <path
              fill="#F5841F"
              d="m177.788 151.046l-.971 24.978l-30.274 23.587l-6.12-4.324l6.86-35.335zm-99.471 0l30.399 8.906l6.86 35.335l-6.12 4.324l-30.275-23.589z"
            />
            <path
              fill="#C0AC9D"
              d="m67.018 208.858l38.732 18.352l-.164-7.837l3.241-2.845h38.334l3.358 2.835l-.248 7.831l38.487-18.29l-18.728 15.476l-22.645 15.553h-38.869l-22.63-15.617z"
            />
            <path
              fill="#161616"
              d="m142.204 193.479l5.476 3.869l3.209 25.604l-4.644-3.921h-36.476l-4.556 4l3.104-25.681l5.478-3.871z"
            />
            <path
              fill="#763E1A"
              d="M242.814 2.25L256 41.807l-8.235 39.997l5.864 4.523l-7.935 6.054l5.964 4.606l-7.897 7.191l4.848 3.511l-12.866 15.026l-52.77-15.365l-.457-.245l-38.027-32.078zm-229.628 0l98.326 72.777l-38.028 32.078l-.457.245l-52.77 15.365l-12.866-15.026l4.844-3.508l-7.892-7.194l5.952-4.601l-8.054-6.071l6.085-4.526L0 41.809z"
            />
            <path
              fill="#F5841F"
              d="m180.392 103.99l55.913 16.279l18.165 55.986h-47.924l-33.02.416l24.014-46.808zm-104.784 0l-17.151 25.873l24.017 46.808l-33.005-.416H1.631l18.063-55.985zm87.776-70.878l-15.639 42.239l-3.319 57.06l-1.27 17.885l-.101 45.688h-30.111l-.098-45.602l-1.274-17.986l-3.32-57.045l-15.637-42.239z"
            />
          </svg>
          MetaMask
        </Button>
        <Button full size="lg" color="gray" onClick={onWalletConnect}>
          <svg
            width={24}
            height={24}
            viewBox="0 0 300 185"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title>WalletConnect</title>
            <desc>Created with Sketch.</desc>
            <defs />
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="walletconnect-logo-alt" fill="#3B99FC" fillRule="nonzero">
                <path
                  d="M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z"
                  id="WalletConnect"
                />
              </g>
            </g>
          </svg>
          WalletConnect
        </Button>
        <Button
          full
          size="lg"
          color="gray"
          onClick={() => onBrowserWallet('coinbase')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 1024 1024"
          >
            <circle cx="512" cy="512" r="512" style={{ fill: '#0052ff' }} />
            <path
              style={{ fill: '#fff' }}
              d="M516.3 361.83c60.28 0 108.1 37.18 126.26 92.47H764C742 336.09 644.47 256 517.27 256 372.82 256 260 365.65 260 512.49S370 768 517.27 768c124.35 0 223.82-80.09 245.84-199.28H642.55c-17.22 55.3-65 93.45-125.32 93.45-83.23 0-141.56-63.89-141.56-149.68.04-86.77 57.43-150.66 140.63-150.66z"
            />
          </svg>
          Coinbase Wallet
        </Button>

        <p>
          By connecting a wallet, you confirm that you have read and agreed to
          Ascension Protocol&apos;s{' '}
          <ExternalLink href={''} className="text-blue-300">
            Terms of Service
          </ExternalLink>{' '}
          and consented to it&apos;s{' '}
          <ExternalLink href="" className="text-blue-300">
            Privacy Policy
          </ExternalLink>
        </p>
      </div>
    </>
  )
}
