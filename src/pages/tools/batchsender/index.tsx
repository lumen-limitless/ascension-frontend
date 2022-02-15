import Head from 'next/head'
import BatchSender from './BatchSender'

export default function BatchSenderPage() {
  return (
    <>
      <Head>
        <title>ERC20 Batch Sender | Ascension Protocol</title>
        <meta key="description" name="description" content="Ascension Protocol reactor" />
      </Head>
      <BatchSender />
    </>
  )
}
