import dynamic from 'next/dynamic'
import { useNetworkNotifications } from '../hooks'
import useStore from '../store/useStore'

const Footer = dynamic(() => import('../components/Footer'), { ssr: false })
const Header = dynamic(() => import('../components/Header'), { ssr: false })
const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), { ssr: false })
const Connect = dynamic(() => import('../components/Connect'), { ssr: false })
const Network = dynamic(() => import('../components/Network'), { ssr: false })
const Account = dynamic(() => import('../components/Account'), { ssr: false })
const Modal = dynamic(() => import('../components/ui/Modal'), { ssr: false })

const MODAL_VIEWS = {
  none: <></>,
  account: <Account />,
  network: <Network />,
  connect: <Connect />,
}
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
        {MODAL_VIEWS[modalView]}
      </Modal>
      <Header />
      <main className="relative flex h-full min-h-screen w-full flex-col items-center justify-start">
        {children}
      </main>
      <Footer />
    </>
  )
}
