import dynamic from 'next/dynamic'
import Loader from '../components/ui/Loader'
import Modal from '../components/ui/Modal'
import { useNetworkNotifications, useUI } from '../hooks'

const Footer = dynamic(() => import('../components/Footer'), { ssr: false })
const Header = dynamic(() => import('../components/Header'), { ssr: false })
const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  { ssr: false }
)
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

function ModalUI() {
  const { toggleViewingModal, viewingModal, modalView } = useUI()

  return (
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
  )
}
export default function Layout({ children }) {
  useNetworkNotifications()

  return (
    <>
      <Toaster position="top-right" containerClassName="mt-12" />
      <ModalUI />
      <Header />
      <main className="relative  flex h-full min-h-screen w-full flex-col items-center justify-start">
        {children}
      </main>
      <Footer />
    </>
  )
}
