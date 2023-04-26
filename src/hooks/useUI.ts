import useStore from '@/store/useStore'
import { shallow } from 'zustand/shallow'

export const useUI = () => {
  return useStore(
    (state) => ({
      setModalView: state.setModalView,
      toggleViewingModal: state.toggleViewingModal,
      modalView: state.modalView,
      modalProps: state.modalProps,
      viewingModal: state.viewingModal,
    }),
    shallow
  )
}
