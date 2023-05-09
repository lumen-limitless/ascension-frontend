import DashboardPage from './dashboard-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function Dashboard() {
  return <DashboardPage />
}
