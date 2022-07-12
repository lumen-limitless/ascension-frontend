import dynamic from 'next/dynamic'
import Loader from '../components/ui/Loader'
import Modal from '../components/ui/Modal'
import { useNetworkNotifications } from '../hooks'
import useStore from '../store/useStore'

const Footer = dynamic(() => import('../components/Footer'), { ssr: false })
const Header = dynamic(() => import('../components/Header'), { ssr: false })
const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), { ssr: false })
const Connect = dynamic(() => import('../components/Connect'), {
  ssr: false,
  loading: () => <Loader />,
})
const Network = dynamic(() => import('../components/Network'), {
  ssr: false,
  loading: () => <Loader />,
})
const Account = dynamic(() => import('../components/Account'), {
  ssr: false,
  loading: () => <Loader />,
})

const Delegate = dynamic(() => import('../components/Delegate'), {
  ssr: false,
  loading: () => <Loader />,
})

export default function Layout({ children }) {
  useNetworkNotifications()
  const viewingModal = useStore((state) => state.viewingModal)
  const modalView = useStore((state) => state.modalView)
  const toggleViewingModal = useStore((state) => state.toggleViewingModal)
  return (
    <>
      <Toaster position="top-right" containerClassName="mt-12" />
      <Modal
        isOpen={viewingModal}
        onDismiss={() => {
          toggleViewingModal(false)
        }}
      >
        {modalView === 'account' && <Account />}
        {modalView === 'network' && <Network />}
        {modalView === 'connect' && <Connect />}
        {modalView === 'delegate' && <Delegate />}
      </Modal>
      <Header />
      <main className="relative flex h-full min-h-screen w-full flex-col items-center justify-start">
        {children}
      </main>
      <Footer />
    </>
  )
}
