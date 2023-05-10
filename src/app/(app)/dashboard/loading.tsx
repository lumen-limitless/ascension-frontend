import Loader from '@/components/ui/Loader'
import { useLockBodyScroll } from 'react-use'

export default function Loading() {
  useLockBodyScroll(true)
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-purple-900">
      <Loader size={64} />
    </div>
  )
}
