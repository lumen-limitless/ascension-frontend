import Footer from '../components/Footer'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'
import useNotificationsToast from '../hooks/useNotificationsToast'

export default function Layout({ children }: any) {
  useNotificationsToast()
  return (
    <>
      <Header />
      <Toaster position="top-center" />
      <main className="h-full min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
