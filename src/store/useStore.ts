import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import createReactorSlice, { ReactorSlice } from './createReactorSlice'

const useStore = create<ReactorSlice>()(persist((...a) => ({ ...createReactorSlice(...a) })))

export default useStore
