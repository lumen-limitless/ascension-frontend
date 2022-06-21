import { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface ReactorSlice {
  address: string
  input: string
  settingAddress: boolean
  eventIndex: number
  reset: () => void
  toggleSettingAddress: (bool: boolean) => void
  setIndex: (i: number) => void
  setInput: (input: string) => void
  setAddress: (address: string) => void
}

const initialState = {
  address: '',
  input: '',
  settingAddress: true,
  eventIndex: 0,
}

const createReactorSlice: StateCreator<ReactorSlice, [['zustand/persist', unknown]], []> = (
  set
) => ({
  ...initialState,
  reset: () => set(initialState),
  toggleSettingAddress: (bool: boolean) => set({ settingAddress: bool }),
  setIndex: (i: number) => set({ eventIndex: i }),
  setInput: (input: string) => set({ input: input }),
  setAddress: (address: string) => set({ address: address }),
})

export default createReactorSlice
