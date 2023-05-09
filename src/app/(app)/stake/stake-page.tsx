'use client'

import React from 'react'
import { NextPageWithLayout } from '@/types'
// import PolyStaking from './PolyStaking'
import SingleStaking from './SingleStaking'

const StakePage: NextPageWithLayout = () => {
  return (
    <>
      {/* <PolyStaking /> */}
      <SingleStaking />
    </>
  )
}

export default StakePage
