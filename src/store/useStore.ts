import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UISlice, createUISlice } from './createUISlice'

//TODO: fix type too complex error
interface RootSlice extends UISlice {}

const useStore = create<RootSlice>()(
  devtools(
    immer((...a) => ({
      ...createUISlice(...a),
    }))
  )
)

export default useStore
