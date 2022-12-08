import dynamic from 'next/dynamic'
import Footer from '../components/Footer'
import Modal from '../components/ui/Modal'
import Spinner from '../components/ui/Spinner'
import { VIEW } from '../constants/enums'
import { useNetworkNotifications, useUI } from '../hooks'

const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  { ssr: false }
)
const Nav = dynamic(() => import('../components/Nav'), {
  ssr: false,
})
const Connect = dynamic(() => import('../components/views/Connect'), {
  ssr: false,
  loading: () => <Spinner />,
})
const Delegate = dynamic(() => import('../components/views/Delegate'), {
  ssr: false,
  loading: () => <Spinner />,
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
      {modalView === VIEW.CONNECT && <Connect />}
      {modalView === VIEW.DELEGATE && <Delegate />}
    </Modal>
  )
}
export default function AppLayout({ children }) {
  useNetworkNotifications()

  return (
    <>
      <a href="#main" aria-label="skip" className="sr-only">
        skip to main content
      </a>
      <Toaster position="bottom-right" containerClassName=" mb-3 md:mb-9" />
      <ModalUI />
      {/* <div className="flex items-center justify-center bg-blue text-center">
        Banner
      </div> */}
      <header
        id="header"
        className={
          'sticky top-0 z-20 border-b-2 border-purple-500/30 bg-purple-900/60 backdrop-blur'
        }
      >
        <Nav />
      </header>
      <main className="flex h-full w-full flex-grow flex-col" id="main">
        {children}
      </main>
      <Footer />
    </>
  )
}
