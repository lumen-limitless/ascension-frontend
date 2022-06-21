import create from 'zustand'
import createReactorSlice, { ReactorSlice } from './createReactorSlice'

const useStore = create<ReactorSlice>()((...a) => ({ ...createReactorSlice(...a) }))

export default useStore
