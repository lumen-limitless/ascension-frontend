import StakePage from './stake-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stake',
}

export default function Page() {
  return <StakePage />
}
