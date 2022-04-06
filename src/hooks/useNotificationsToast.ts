import { useEthers, useNotifications } from '@usedapp/core'
import { useEffect } from 'react'
import notification from '../components/Notification'

export default function useNotificationsToast() {
  const { chainId } = useEthers()
  const { notifications, removeNotification } = useNotifications()
  useEffect(() => {
    if (notification.length === 0) return
    notifications.forEach((n) => {
      if (n.type === 'walletConnected') {
        removeNotification({ notificationId: n.id, chainId })
        notification('success', 'Wallet connected')
      }
      if (n.type === 'transactionStarted') {
        removeNotification({ notificationId: n.id, chainId })
        notification('info', `${n.transactionName} transaction submitted`)
      }
      if (n.type === 'transactionSucceed') {
        removeNotification({ notificationId: n.id, chainId })
        notification('success', `${n.transactionName} transaction confirmed`)
      }
      if (n.type === 'transactionFailed') {
        removeNotification({ notificationId: n.id, chainId })
        notification('error', `${n.transactionName} transaction failed`)
      }
    })
  })
}
