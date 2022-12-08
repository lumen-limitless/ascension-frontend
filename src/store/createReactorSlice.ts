import { StateCreator } from 'zustand'
import { REACTOR_STEPS } from '../constants/enums'
import { ContractEvent, ContractFunction } from '../types'

export interface ReactorSlice {
  eventInfo: {
    address: string
    index: number
    abi: Array<ContractEvent | ContractFunction> | null
    args: any[]
  }
  funcInfo: {
    address: string
    index: number
    abi: Array<ContractEvent | ContractFunction> | null
    args: any[]
    value: string
  }
  step: REACTOR_STEPS
  setStep: (step: REACTOR_STEPS) => void
  reset: () => void
  clearEvent: () => void
  clearFunction: () => void
  setIndex: (index: number, type?: 'event' | 'function') => void
  setAddress: (address: string, type?: 'event' | 'function') => void
  setABI: (abi: any, type?: 'event' | 'function') => void
  setArgs: (args: any[], type?: 'event' | 'function') => void
  updateArgsAt: (i: number, arg: any, type: 'event' | 'function') => void
  clearArgs: (type?: 'event' | 'function') => void
  setValue: (value: string) => void
}

const initialState = {
  eventInfo: {
    address: '',
    index: 0,
    abi: null,
    args: [],
  },
  funcInfo: {
    address: '',
    index: 0,
    abi: null,
    args: [],
    value: '',
  },
  step: REACTOR_STEPS.SETTING_EVENT,
}

const TYPES = {
  event: 'eventInfo',
  function: 'funcInfo',
}
const createReactorSlice: StateCreator<
  ReactorSlice,
  [['zustand/devtools', unknown], ['zustand/immer', unknown]],
  []
> = (set) => ({
  ...initialState,
  setStep: (step) =>
    set((state) => {
      state.step = step
    }),
  reset: () => set(initialState),
  clearEvent: () =>
    set((state) => {
      state.eventInfo = initialState.eventInfo
    }),
  clearFunction: () =>
    set((state) => {
      state.funcInfo = initialState.funcInfo
    }),

  setIndex: (index, type?) =>
    set((state) => {
      type != undefined
        ? (state[TYPES[type]].index = index)
        : ((state.funcInfo.index = index), (state.eventInfo.index = index))
    }),
  setAddress: (address, type?) =>
    set((state) => {
      type != undefined
        ? (state[TYPES[type]].address = address)
        : ((state.funcInfo.address = address),
          (state.eventInfo.address = address))
    }),
  setABI: (abi, type?) =>
    set((state) => {
      type != undefined
        ? (state[TYPES[type]].abi = abi)
        : ((state.funcInfo.address = abi), (state.eventInfo.address = abi))
    }),
  setArgs: (args, type?) =>
    set((state) => {
      type != undefined
        ? (state[TYPES[type]].args = args)
        : ((state.funcInfo.args = args), (state.eventInfo.args = args))
    }),
  updateArgsAt: (i, arg, type?) =>
    set((state) => {
      if (type != undefined) {
        const arr = state[TYPES[type]].args.slice()
        arr[i] = arg
        state[TYPES[type]].args = arr
      } else {
        const eventArr = state.eventInfo.args.slice()
        eventArr[i] = arg
        state.eventInfo.args = eventArr

        const functionArr = state.funcInfo.args.slice()
        functionArr[i] = arg
        state.funcInfo.args = functionArr
      }
    }),
  clearArgs: (type?) =>
    set((state) => {
      type != undefined
        ? (state[TYPES[type]].args = [])
        : ((state.funcInfo.args = []), (state.eventInfo.args = []))
    }),
  setValue: (value) =>
    set((state) => {
      state.funcInfo.value = value
    }),
})

export default createReactorSlice
