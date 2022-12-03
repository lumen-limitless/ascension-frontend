import { StateCreator } from 'zustand'

export enum VIEW {
  CONNECT,
  DELEGATE,
}
export interface UISlice {
  viewingModal: boolean
  modalView: VIEW | null
  toggleViewingModal: (isViewing?: boolean) => void
  setModalView: (view: VIEW | null) => void
}

const initialState: { viewingModal: boolean; modalView: VIEW | null } = {
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
      viewingModal: isViewing === undefined ? !state.viewingModal : isViewing,
    })),
  setModalView: (view) =>
    set({
      modalView: view,
      viewingModal: view !== null ? true : false,
    }),
})

export default createUISlice
