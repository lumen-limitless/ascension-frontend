import dynamic from 'next/dynamic'
import { useNetworkNotifications } from '../hooks'

const Footer = dynamic(() => import('../components/Footer'), { ssr: false })
const Header = dynamic(() => import('../components/Header'), { ssr: false })
const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), { ssr: false })

export default function Layout({ children }: any) {
  useNetworkNotifications()
  return (
    <>
      <Header />
      <Toaster position="top-center" />
      <main className="relative flex h-full min-h-screen w-full flex-col items-center justify-start">
        {children}
      </main>
      <Footer />
    </>
  )
}
