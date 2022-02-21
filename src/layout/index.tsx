import Footer from '../components/Footer'
import Header from '../components/Header'
import ToastContainer from '../components/Toast/toastContainer'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main className="flex  min-h-screen w-full flex-grow flex-col items-center justify-start px-3 py-20">
        <ToastContainer />
        {children}
      </main>
    </>
  )
}
