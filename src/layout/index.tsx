import Footer from '../components/Footer'
import Header from '../components/Header'
import ToastContainer from '../components/Toast/toastContainer'
import useNotificationsToast from '../hooks/useNotificationsToast'

export default function Layout({ children }: any) {
  useNotificationsToast()
  return (
    <>
      <Header />
      <main className="flex  min-h-screen w-full flex-grow flex-col items-center justify-start px-3 py-20">
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </>
  )
}
