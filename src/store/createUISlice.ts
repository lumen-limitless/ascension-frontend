import { StateCreator } from 'zustand'

export type UIViewController = 'none' | 'account' | 'connect' | 'network'

export interface UISlice {
  viewingModal: boolean
  modalView: UIViewController
  toggleViewingModal: (isViewing?: boolean) => void
  setModalView: (view: UIViewController) => void
}

const initialState: { viewingModal: boolean; modalView: UIViewController } = {
  viewingModal: false,
  modalView: 'none',
}
const createUISlice: StateCreator<UISlice, [['zustand/devtools', unknown]], []> = (set) => ({
  ...initialState,
  toggleViewingModal: (isViewing) =>
    set((state) => ({
      viewingModal: isViewing ?? !state.viewingModal,
    })),
  setModalView: (view) =>
    set({
      modalView: view,
      viewingModal: view !== 'none' ? true : false,
    }),
})

export default createUISlice
