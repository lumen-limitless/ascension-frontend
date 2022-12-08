import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import toast, { ErrorIcon, Toast } from 'react-hot-toast'
import cn from 'clsx'

interface ToastComponentProps {
  t: Toast
  type: string
  message: string
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
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={cn(
            ' pointer-events-auto w-72 overflow-hidden rounded  border-l  bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5',
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
                  <svg
                    className="h-6 w-6 text-green"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : type === 'error' ? (
                  <ErrorIcon
                    className="h-6 w-6 text-red-500"
                    aria-hidden="true"
                  />
                ) : type === 'info' ? (
                  <svg
                    className="h-6 w-6 text-blue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
