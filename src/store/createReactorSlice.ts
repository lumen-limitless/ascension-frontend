import { StateCreator } from 'zustand'

export interface ReactorSlice {
  address: string
  eventArgs: any[]
  functionArgs: any[]
  eventIndex: number
  functionIndex: number
  reactionActive: boolean
  reset: () => void
  setEventIndex: (i: number) => void
  setFunctionIndex: (i: number) => void
  setAddress: (address: string) => void
  setReaction: (filterArgs: any[], functionArgs: any[]) => void
  cancelReaction: () => void
}

const initialState = {
  address: '',
  eventArgs: [],
  functionArgs: [],
  eventIndex: 0,
  functionIndex: 0,
  reactionActive: false,
}

const createReactorSlice: StateCreator<ReactorSlice, [], []> = (set) => ({
  ...initialState,
  reset: () => set(initialState),
  setEventIndex: (i) => set({ eventIndex: i }),
  setFunctionIndex: (i) => set({ functionIndex: i }),
  setAddress: (address) => set({ address: address }),
  setReaction: (eventArgs, functionArgs) =>
    set({ eventArgs: eventArgs, functionArgs: functionArgs, reactionActive: true }),
  cancelReaction: () => set({ eventArgs: [], functionArgs: [], reactionActive: false }),
})

export default createReactorSlice
