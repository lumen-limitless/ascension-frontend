// @ts-nocheck
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import createReactorSlice, { ReactorSlice } from './createReactorSlice'
import createUISlice, { UISlice } from './createUISlice'

interface RootSlice extends ReactorSlice, UISlice {}

const useStore = create<RootSlice>()(
  devtools(
    immer((...a) => ({
      ...createUISlice(...a),
      ...createReactorSlice(...a),
    }))
  )
)

export default useStore
