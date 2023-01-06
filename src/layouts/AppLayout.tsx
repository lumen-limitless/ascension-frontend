import dynamic from 'next/dynamic'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Container from '../components/ui/Container'
import Loader from '../components/ui/Loader'
import Modal from '../components/ui/Modal'
import Spinner from '../components/ui/Spinner'
import Connect from '../components/views/Connect'
import { VIEW } from '../constants/enums'
import { useNetworkNotifications, useUI } from '../hooks'

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

      <header
        id="header"
        className={
          'fixed top-0 z-20 w-full border-b-2 border-purple-500/50  bg-purple-900/80 backdrop-blur'
        }
      >
        <Container>
          <Nav />
        </Container>
      </header>
      <main
        className=" relative flex h-full w-full flex-grow flex-col overflow-clip"
        id="main"
      >
        <div className=" absolute -top-40 -right-40  h-[600px] w-[600px] bg-gradient-radial  from-purple-500/10 to-transparent blur-3xl" />
        <div className=" absolute -bottom-40 -left-40  h-[600px] w-[600px] bg-gradient-radial  from-purple-500/10 to-transparent blur-3xl" />
        {children}
      </main>
      <Footer />
    </>
  )
}
