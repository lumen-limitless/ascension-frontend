import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  padding?: number
  maxWidth?: number
  className?: string
}

export default function Modal({ isOpen, onDismiss, children }: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          onClose={onDismiss}
          className="fixed inset-0 z-20 overflow-y-hidden backdrop-blur-md"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-40 backdrop-blur-md" />
          <div className="flex h-screen items-end justify-center md:items-center md:px-3">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 "
              enterTo="opacity-100 "
              leave="ease-in duration-200 "
              leaveFrom="opacity-100 "
              leaveTo="opacity-0 "
            >
              <div className={' w-full transform transition-all md:max-w-xl '}>
                <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden rounded bg-dark-900  p-3  md:p-6 lg:p-9 ">
                  <div className="absolute top-3 right-3">
                    <button onClick={onDismiss}>
                      <XIcon height={24} />
                    </button>
                  </div>
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
