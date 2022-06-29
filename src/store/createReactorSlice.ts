import { StateCreator } from 'zustand'

export interface ReactorSlice {
  address: string
  eventIndex: number
  functionIndex: number
  reactionActive: boolean
  reset: () => void
  setEventIndex: (i: number) => void
  setFunctionIndex: (i: number) => void
  setAddress: (address: string) => void
  setReaction: (active: boolean) => void
}

const initialState = {
  address: '',
  eventIndex: 0,
  functionIndex: 0,
  reactionActive: false,
}

const createReactorSlice: StateCreator<
  ReactorSlice,
  [['zustand/devtools', unknown], ['zustand/persist', unknown]],
  []
> = (set) => ({
  ...initialState,
  reset: () => set(initialState),
  setEventIndex: (i) => set({ eventIndex: i }),
  setFunctionIndex: (i) => set({ functionIndex: i }),
  setAddress: (address) => set({ address: address }),
  setReaction: (active: boolean) => set({ reactionActive: active }),
})

export default createReactorSlice
