import { StateCreator } from 'zustand'
import { VIEW } from '../constants/enums'
export interface UISlice {
  viewingModal: boolean
  modalView: VIEW | null
  modalProps: Record<string, unknown> | null
  toggleViewingModal: (isViewing?: boolean) => void
  setModalView: (view: VIEW | null, props?: Record<string, unknown>) => void
}

const uiInitialState = {
  viewingModal: false,
  modalView: null,
  modalProps: null,
}

export const createUISlice: StateCreator<
  UISlice,
  [['zustand/devtools', unknown], ['zustand/immer', unknown]],
  []
> = (set) => ({
  ...uiInitialState,
  toggleViewingModal: (isViewing) =>
    set((state) => ({
      viewingModal: isViewing == null ? !state.viewingModal : isViewing,
    })),
  setModalView: (view, props?: Record<string, unknown>) =>
    set({
      modalView: view,
      modalProps: props,
      viewingModal: view !== null ? true : false,
    }),
})
