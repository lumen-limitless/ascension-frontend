import { StateCreator } from 'zustand'
import { ContractEvent, ContractFunction } from '../types'

export interface ReactorSlice {
  event: {
    address: string
    index: number
    abi: Array<ContractEvent | ContractFunction> | null
    args: any[]
  }
  function: {
    address: string
    index: number
    abi: Array<ContractEvent | ContractFunction> | null
    args: any[]
  }

  reactionActive: boolean
  resetAll: () => void
  reset: (type?: 'event' | 'function') => void
  fetchABI: (name: string, address: string, apiKey: string, type?: 'event' | 'function') => void
  setIndex: (index: number, type?: 'event' | 'function') => void
  setAddress: (address: string, type?: 'event' | 'function') => void
  setArgs: (args: any[], type?: 'event' | 'function') => void
  updateArgsAt: (i: number, arg: any, type: 'event' | 'function') => void
  clearArgs: (type?: 'event' | 'function') => void
  toggleReaction: (active?: boolean) => void
}

const initialState = {
  event: {
    address: '',
    index: 0,
    abi: null,
    args: [],
  },
  function: {
    address: '',
    index: 0,
    abi: null,
    args: [],
  },
  reactionActive: false,
}

const createReactorSlice: StateCreator<
  ReactorSlice,
  [['zustand/devtools', any], ['zustand/immer', any]],
  []
> = (set) => ({
  ...initialState,
  resetAll: () => set(initialState),
  reset: (type?) =>
    set((state) => {
      state[type] = initialState[type]
    }),

  fetchABI: async (name, address, apiKey, type?) => {
    const data = await fetch(
      `https://api.${name}/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    ).then((res) => res.json())

    if (!data || data?.status === '0') {
      set((state) => {
        type != undefined
          ? (state[type].abi = [])
          : ((state.function.abi = []), (state.event.abi = []))
      })
      return
    }
    const abi = JSON.parse(data.result)
    set((state) => {
      type != undefined
        ? (state[type].abi = abi)
        : ((state.function.abi = abi), (state.event.abi = abi))
    })
  },
  setIndex: (index, type?) =>
    set((state) => {
      type != undefined
        ? (state[type].index = index)
        : ((state.function.index = index), (state.event.index = index))
    }),
  setAddress: (address, type?) =>
    set((state) => {
      type != undefined
        ? (state[type].address = address)
        : ((state.function.address = address), (state.event.address = address))
    }),
  setArgs: (args, type?) =>
    set((state) => {
      type != undefined
        ? (state[type].args = args)
        : ((state.function.args = args), (state.event.args = args))
    }),
  updateArgsAt: (i, arg, type?) =>
    set((state) => {
      if (type != undefined) {
        const arr = state[type].args.slice()
        arr[i] = arg
        state[type].args = arr
      } else {
        const eventArr = state.event.args.slice()
        eventArr[i] = arg
        state.event.args = eventArr

        const functionArr = state.function.args.slice()
        functionArr[i] = arg
        state.function.args = functionArr
      }
    }),
  clearArgs: (type?) =>
    set((state) => {
      type != undefined
        ? (state[type].args = [])
        : ((state.function.args = []), (state.event.args = []))
    }),
  toggleReaction: (active: boolean) =>
    set((state) => ({
      reactionActive: active === undefined ? !state.reactionActive : active,
    })),
})

export default createReactorSlice
