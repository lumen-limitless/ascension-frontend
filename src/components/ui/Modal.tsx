import { Dialog, Transition } from '@headlessui/react'
import React from 'react'

export default function Modal({
  isOpen,
  onDismiss,
  children,
}: {
  isOpen: boolean
  onDismiss: () => void
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  className?: string
}) {
  return (
    <>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          onClose={onDismiss}
          className="fixed inset-0 z-20 overflow-y-hidden backdrop-blur"
        >
          <div
            className="fixed inset-0 bg-black opacity-40 backdrop-blur"
            onClick={onDismiss}
          />
          <div className="flex h-screen items-end justify-center md:items-center md:px-3">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-[20%] "
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150 "
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-[20%]"
            >
              <div className="flex h-[80%] w-full transform flex-col overflow-y-auto overflow-x-hidden rounded  border-2 border-purple-500/50 bg-purple-900 p-3  transition-all md:h-auto md:max-w-xl  md:p-6 lg:p-9">
                <button onClick={onDismiss} className="absolute top-3 right-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>

                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
