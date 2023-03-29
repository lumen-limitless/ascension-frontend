import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, ReactNode, useCallback } from 'react'
import toast, { Toast } from 'react-hot-toast'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

/**
 * useToast returns a function that can be used to display a toast.
 * The function takes two arguments: the type of toast to display and the
 * message to display. The function returns the toast id.
 */

export const useToast = () => {
  return useCallback((type: 'success' | 'error' | 'info', message: string) => {
    return toast.custom((t) => (
      <ToastComponent t={t} type={type} message={message} />
    ))
  }, [])
}

interface ToastComponentProps {
  t: Toast
  type: string
  message: ReactNode
}
export default function ToastComponent({
  t,
  type,
  message,
}: ToastComponentProps) {
  return (
    <>
      <Transition
        show={t.visible}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-3 opacity-0 sm:translate-y-0 sm:translate-x-3"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={clsx(
            ' pointer-events-auto w-80 overflow-hidden rounded  border-l  bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5',
            type === 'success'
              ? 'border-green-500'
              : type === 'info'
              ? 'border-blue-500'
              : type === 'error'
              ? 'border-red-500'
              : null
          )}
        >
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {type === 'success' ? (
                  <CheckCircleIcon className="h-6 w-6 text-green" />
                ) : type === 'error' ? (
                  <XCircleIcon
                    className="h-6 w-6 text-red-500"
                    aria-hidden="true"
                  />
                ) : type === 'info' ? (
                  <InformationCircleIcon className="h-6 w-6 text-blue" />
                ) : null}
              </div>
              <div className="ml-3 w-0 flex-1 ">
                <p className="text-sm text-primary">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  className="inline-flex rounded-md text-gray-400 hover:text-gray-500 "
                  onClick={() => toast.dismiss(t.id)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6 " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
