'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAccount, useSignMessage } from 'wagmi'
import { useBoolean } from 'react-use'
import { Loader2 } from 'lucide-react'
import Section from '@/components/ui/Section'
import PermitButton from '@/components/PermitButton'

const messageText =
  'Ascension Protocol asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees.  '

export default function Home() {
  const { isConnected } = useAccount()
  const { address } = useAccount()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useBoolean(false)
  const { push } = useRouter()

  const { signMessage, data, status, isLoading } = useSignMessage({
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
    push('/connect/success')
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
        <Loader2 className="h-32 w-32 animate-spin" />
        <span>Linking your account...</span>
      </section>
    )

  return (
    <Section centered>
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
            <PermitButton isLoading={isLoading} sign={signMessage} />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6">
          <span>Connect your wallet</span>
        </div>
      )}
    </Section>
  )
}
