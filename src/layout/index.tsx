import Header from '../components/Header'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main className="flex  h-full w-full flex-grow  flex-col items-center justify-start">{children}</main>
    </>
  )
}
