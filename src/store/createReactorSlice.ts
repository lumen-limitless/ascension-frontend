import { StateCreator } from 'zustand'
import { ContractEvent, ContractFunction } from '../types'

export interface ReactorSlice {
  address: string
  eventIndex: number
  functionIndex: number
  reactionActive: boolean
  contractABI: Array<ContractEvent | ContractFunction> | null
  reset: () => void
  fetchContractABI: (url: string) => void
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
  contractABI: null,
}

const createReactorSlice: StateCreator<ReactorSlice, [['zustand/devtools', unknown]], []> = (
  set
) => ({
  ...initialState,
  reset: () => set(initialState),
  fetchContractABI: async (url) => {
    const data = await fetch(url).then((res) => res.json())

    if (!data || data?.status === '0') {
      set({ contractABI: [] })
      return
    }
    const abi = JSON.parse(data.result)
    set({ contractABI: abi })
  },
  setEventIndex: (i) => set({ eventIndex: i }),
  setFunctionIndex: (i) => set({ functionIndex: i }),
  setAddress: (address) => set({ address: address }),
  setReaction: (active: boolean) => set({ reactionActive: active }),
})

export default createReactorSlice
