import Header from '../components/Header'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main className="flex w-full flex-grow flex-col items-center justify-start " style={{ height: 'max-content' }}>
        {children}
      </main>
    </>
  )
}
