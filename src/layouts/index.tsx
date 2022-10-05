import dynamic from 'next/dynamic'
import Modal from '../components/ui/Modal'
import { useNetworkNotifications, useUI } from '../hooks'

const Footer = dynamic(() => import('../components/Footer'), { ssr: false })
const Header = dynamic(() => import('../components/Header'), { ssr: false })
const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  { ssr: false }
)

function ModalUI() {
  const { toggleViewingModal, viewingModal, modalView } = useUI()

  return (
    <Modal
      isOpen={viewingModal}
      onDismiss={() => {
        toggleViewingModal(false)
      }}
    >
      {modalView && modalView}
    </Modal>
  )
}
export default function Layout({ children }) {
  useNetworkNotifications()

  return (
    <>
      <a href="#main" aria-label="skip" className="sr-only">
        skip to main content
      </a>
      <Toaster position="top-right" containerClassName="mt-12" />
      <ModalUI />
      <Header />
      <main
        className="relative flex h-full min-h-screen w-full flex-col"
        id="main"
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
