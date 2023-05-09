'use client'
import { ReactNode } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, foundry } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'

import { APP_NAME } from '@/constants'
import Avatar from '@/components/Avatar'
import Disclaimer from '@/components/Disclaimer'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { SkeletonTheme } from 'react-loading-skeleton'

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
const { connectors } = getDefaultWallets({
  appName: APP_NAME,
  projectId: '',
  chains,
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const queryClient = new QueryClient()

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <LazyMotion features={domAnimation} strict>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              avatar={Avatar}
              appInfo={{
                appName: APP_NAME,
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
              <SkeletonTheme baseColor="#9F9F9F" highlightColor="#F9F9F9">
                {children}
              </SkeletonTheme>
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </LazyMotion>
    </>
  )
}
