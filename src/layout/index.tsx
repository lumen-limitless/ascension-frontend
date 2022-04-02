import Footer from '../components/Footer'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'
import useNotificationsToast from '../hooks/useNotificationsToast'
export default function Layout({ children }: any) {
  useNotificationsToast()
  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} toastOptions={{}} />
      <main className="flex min-h-screen w-full flex-grow flex-col items-center justify-start pb-32">{children}</main>
      <Footer />
    </>
  )
}
