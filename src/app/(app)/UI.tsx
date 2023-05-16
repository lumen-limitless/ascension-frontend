'use client'
import Loader from '@/components/ui/Loader'
import Modal from '@/components/ui/Modal'
import { VIEW } from '@/constants/enums'
import { useUI } from '@/hooks'
import dynamic from 'next/dynamic'

//dynamic imports
const Toaster = dynamic(() =>
  import('react-hot-toast').then((mod) => mod.Toaster)
)

const Delegate = dynamic(() => import('@/components/Delegate'), {
  loading: () => <Loader />,
})

function ModalUI() {
  const { toggleViewingModal, viewingModal, modalView, modalProps } = useUI()

  return (
    <Modal
      isOpen={viewingModal}
      onDismiss={() => {
        toggleViewingModal(false)
      }}
    >
      {modalView &&
        { [VIEW.DELEGATE]: <Delegate {...modalProps} /> }[modalView]}
    </Modal>
  )
}

export default function UI() {
  return (
    <>
      <Toaster position="top-right" containerClassName="mt-24" />
      <ModalUI />
    </>
  )
}
