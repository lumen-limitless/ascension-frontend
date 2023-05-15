'use client'

import { useSearchParams } from 'next/navigation'
import { useAccount, useSignMessage } from 'wagmi'
import { useBoolean } from 'react-use'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

const messageText =
  'Ascension Protocol (connect.ascensionprotocol.io) asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees.  '

export default function Home() {
  const { isConnected } = useAccount()
  const { address } = useAccount()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useBoolean(false)

  const { signMessage, data, status } = useSignMessage({
    message:
      messageText +
      '\n- Discord ID: ' +
      searchParams.get('userId') +
      '\n- Discord Interaction: ' +
      searchParams.get('interactionId') +
      '\n- Timestamp: ' +
      searchParams.get('timestamp'),
  })

  const handleSubmit = async () => {
    if (!data) {
      alert('Please sign the message first')
      return
    }
    setLoading(true)
    const res = await fetch('/api/connect-discord-account', {
      method: 'POST',
      body: JSON.stringify({
        signature: data,
        userId: searchParams.get('userId'),
        interactionId: searchParams.get('interactionId'),
        timestamp: searchParams.get('timestamp'),
        ethereumAddress: address,
      }),
    }).then((res) => res.json())
    console.log(res)
    setLoading(false)
    if (res.error) return alert(res.error)
  }

  if (!searchParams.get('userId') || !searchParams.get('interactionId'))
    return (
      <section className="flex h-full w-full flex-grow flex-col items-center justify-center">
        <p className="text-xl">Invalid URI</p>
      </section>
    )

  if (loading)
    return (
      <section className="flex h-full w-full flex-grow flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </section>
    )

  return (
    <section className="flex h-full w-full flex-grow flex-col items-center justify-center">
      {isConnected ? (
        <>
          {status === 'success' ? (
            <button
              className="w-72 rounded bg-green p-3 text-lg"
              onClick={handleSubmit}
            >
              Link Discord Account
            </button>
          ) : (
            <button
              className="inline-flex h-12 w-72 items-center justify-center gap-2 rounded bg-blue p-3 text-xl"
              onClick={() => signMessage()}
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Image
                    src="/assets/permit.svg"
                    alt=""
                    className="h-12 w-12"
                  />
                  Sign Message
                </>
              )}
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6">
          <Image src="assets/logo.svg" alt="" className="h-24 w-24" />
          <h1>Connect your wallet</h1>
        </div>
      )}
    </section>
  )
}
