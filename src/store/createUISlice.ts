import { StateCreator } from 'zustand'
import { VIEW } from '../constants/enums'

export interface UISlice {
  viewingModal: boolean
  modalView: VIEW | null
  toggleViewingModal: (isViewing?: boolean) => void
  setModalView: (view: VIEW | null) => void
}

const initialState = {
  viewingModal: false,
  modalView: null,
}

const createUISlice: StateCreator<
  UISlice,
  [['zustand/devtools', unknown], ['zustand/immer', unknown]],
  []
> = (set) => ({
  ...initialState,
  toggleViewingModal: (isViewing) =>
    set((state) => ({
      viewingModal: isViewing == null ? !state.viewingModal : isViewing,
    })),
  setModalView: (view) =>
    set({
      modalView: view,
      viewingModal: view !== null ? true : false,
    }),
})

export default createUISlice
