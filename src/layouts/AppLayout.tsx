import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import NetworkStats from '../components/NetworkStats'
import Loader from '../components/ui/Loader'
import Modal from '../components/ui/Modal'
import { VIEW } from '../constants/enums'
import { useUI } from '../hooks'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, foundry } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import {
  connectorsForWallets,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  braveWallet,
  ledgerWallet,
  argentWallet,
  safeWallet,
  zerionWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { APP_NAME } from '../constants'
import Avatar from '../components/Avatar'
import Disclaimer from '../components/Disclaimer'
import Link from 'next/link'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//dynamic imports
const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  { ssr: false }
)

const Delegate = dynamic(() => import('../views/Delegate'), {
  ssr: false,
  loading: () => <Loader />,
})

// Wagmi client
const { chains, provider } = configureChains(
  [
    arbitrum,
    {
      ...foundry,
      // Add multicall3 contract to Foundry (arbitrum fork)
      contracts: {
        multicall3: {
          address: '0xca11bde05977b3631167028862be2a173976ca11',
          blockCreated: 7654707,
        },
      },
    },
  ],
  [
    alchemyProvider({
      priority: 0,
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB || '',
    }),
    publicProvider({ priority: 1 }),
  ]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      braveWallet({ chains }),
      walletConnectWallet({ chains }),
      ledgerWallet({ chains }),
      rainbowWallet({ chains }),
      trustWallet({ chains }),
      coinbaseWallet({ chains, appName: APP_NAME }),
      argentWallet({ chains }),
      safeWallet({ chains }),
      zerionWallet({ chains }),
    ],
  },
])
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const queryClient = new QueryClient()

function ModalUI() {
  const { toggleViewingModal, viewingModal, modalView, modalProps } = useUI()

  return (
    <Modal
      isOpen={viewingModal}
      onDismiss={() => {
        toggleViewingModal(false)
      }}
    >
      {modalView &&
        { [VIEW.DELEGATE]: <Delegate {...modalProps} /> }[modalView]}
    </Modal>
  )
}
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            avatar={Avatar}
            appInfo={{
              appName: APP_NAME,
              disclaimer: Disclaimer,
            }}
            initialChain={
              process.env.NODE_ENV === 'production' ? arbitrum.id : foundry.id
            }
            chains={chains}
            theme={midnightTheme({
              overlayBlur: 'large',
              accentColor: '#0346a2',
            })}
          >
            <Toaster
              position="top-right"
              containerClassName=" mt-3 md:mt-12 lg:mt-24"
            />
            <ModalUI />

            <header
              id="header"
              className={
                'sticky top-0 z-20 w-full border-b-2 border-purple-500/50 bg-purple-900'
              }
            >
              <Nav />
            </header>
            <Banner>
              <svg
                className="mr-1 h-3 md:h-4 lg:h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <p className="text-xs md:text-sm lg:text-base">
                Ascension rewards are now active!
              </p>

              <Link
                href="/earn"
                className="ml-3 text-xs font-extrabold underline md:text-sm lg:text-base"
              >
                Deposit ASCEND
              </Link>
            </Banner>
            <main
              className=" relative flex h-full w-full flex-grow flex-col overflow-clip"
              id="main"
            >
              <div className=" absolute -right-40 -top-40  h-[700px] w-[700px] bg-gradient-radial  from-purple-500/20 to-transparent blur-3xl" />
              <div className=" absolute -bottom-40 -left-40  h-[700px] w-[700px] bg-gradient-radial  from-purple-500/20 to-transparent blur-3xl" />
              {children}
            </main>
            <Footer />
            <NetworkStats />
          </RainbowKitProvider>
        </WagmiConfig>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
