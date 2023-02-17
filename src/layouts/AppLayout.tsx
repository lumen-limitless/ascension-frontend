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
import { arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { APP_NAME } from '../constants'
import Avatar from '../components/Avatar'
import Disclaimer from '../components/Disclaimer'
import Link from 'next/link'

// Wagmi client
const { chains, provider } = configureChains(
  [arbitrum],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_ARB || '',
    }),

    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: APP_NAME,
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  { ssr: false }
)

const Delegate = dynamic(() => import('../components/views/Delegate'), {
  ssr: false,
  loading: () => <Loader />,
})

function ModalUI() {
  const { toggleViewingModal, viewingModal, modalView } = useUI()

  return (
    <Modal
      isOpen={viewingModal}
      onDismiss={() => {
        toggleViewingModal(false)
      }}
    >
      {modalView === VIEW.DELEGATE && <Delegate />}
    </Modal>
  )
}
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          avatar={Avatar}
          appInfo={{
            disclaimer: Disclaimer,
          }}
          initialChain={arbitrum}
          chains={chains}
          theme={darkTheme({ overlayBlur: 'large' })}
        >
          <Toaster position="bottom-right" containerClassName=" mb-3 md:mb-9" />
          <ModalUI />
          <Banner>
            <p className="text-xs md:text-sm lg:text-base">
              Ascension staking has ended.
            </p>

            <Link
              href="/stake"
              className="ml-3 text-xs font-extrabold underline md:text-sm lg:text-base"
            >
              {' '}
              Remove Stake & Rewards
            </Link>
          </Banner>

          <header
            id="header"
            className={
              'sticky top-0 z-20 w-full border-b-2 border-purple-500/50 bg-purple-900'
            }
          >
            <Nav />
          </header>

          <main
            className=" relative flex h-full w-full flex-grow flex-col overflow-clip"
            id="main"
          >
            <div className=" absolute -top-40 -right-40  h-[700px] w-[700px] bg-gradient-radial  from-purple-500/20 to-transparent blur-3xl" />
            <div className=" absolute -bottom-40 -left-40  h-[700px] w-[700px] bg-gradient-radial  from-purple-500/20 to-transparent blur-3xl" />
            {children}
          </main>
          <Footer />
          <NetworkStats />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}
