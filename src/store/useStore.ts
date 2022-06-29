import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import createReactorSlice, { ReactorSlice } from './createReactorSlice'
import createUISlice, { UISlice } from './createUISlice'

const useStore = create<ReactorSlice & UISlice>()(
  devtools(
    persist((...a) => ({
      ...createUISlice(...a),
      ...createReactorSlice(...a),
    }))
  )
)

export default useStore
