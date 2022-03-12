import Footer from '../components/Footer'
import Header from '../components/Header'
import ToastContainer from '../components/Toast/toastContainer'
import useNotificationsToast from '../hooks/useNotificationsToast'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <ToastContainer />
      <main className="flex  min-h-screen w-full flex-grow flex-col items-center justify-start px-3 pb-32 md:pb-0">
        {children}
      </main>
      <Footer />
    </>
  )
}
