import Toast from './toast'
import { useToastStateContext } from '../../context/ToastContext'

export default function ToastContainer() {
  const { toasts } = useToastStateContext()

  return (
    <div className="absolute top-16 right-0 z-50 w-full">
      <div className="ml-auto flex max-w-md flex-col-reverse gap-1">
        {toasts &&
          toasts.map((toast) => <Toast id={toast.id} key={toast.id} type={toast.type} message={toast.message} />)}
      </div>
    </div>
  )
}
