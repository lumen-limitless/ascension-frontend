import { useCallback } from 'react'
import toast from 'react-hot-toast'
import ToastComponent from '../components/ToastComponent'

export const useToast = () => {
  return useCallback((type: 'success' | 'error' | 'info', message: string) => {
    return toast.custom((t) => (
      <ToastComponent t={t} type={type} message={message} />
    ))
  }, [])
}

export default useToast
