'use client'
import { ReactNode } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, foundry } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import Avatar from '@/components/Avatar'
import Disclaimer from '@/components/Disclaimer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'framer-motion'

// Wagmi client
const { chains, publicClient } = configureChains(
  [
    arbitrum,
    process.env.NODE_ENV === 'development'
      ? {
          ...foundry,
          contracts: {
            multicall3: {
              address: '0xca11bde05977b3631167028862be2a173976ca11',
              blockCreated: 7654707,
            },
          },
        }
      : arbitrum,
  ],
  [publicProvider()]
)
const { connectors } = getDefaultWallets({
  appName: 'Ascension Protocol',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string,
  chains,
})
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const queryClient = new QueryClient()

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <LazyMotion features={domAnimation} strict>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              chains={chains}
              avatar={Avatar}
              appInfo={{
                appName: 'Ascension Protocol',
                disclaimer: Disclaimer,
              }}
              initialChain={
                process.env.NODE_ENV === 'production' ? arbitrum.id : foundry.id
              }
              theme={darkTheme({
                overlayBlur: 'large',
                accentColor: '#0346a2',
              })}
            >
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </LazyMotion>
    </>
  )
}
