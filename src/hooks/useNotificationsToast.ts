import { useEthers, useNotifications } from '@usedapp/core'
import { useEffect } from 'react'
import Toast from '../components/Toast'

export default function useNotificationsToast() {
  const { chainId } = useEthers()
  const { notifications, removeNotification } = useNotifications()
  useEffect(() => {
    notifications.forEach((n) => {
      if (n.type === 'walletConnected') {
        removeNotification({ notificationId: n.id, chainId })
        Toast('info', 'Wallet connected')
      }
      if (n.type === 'transactionStarted') {
        removeNotification({ notificationId: n.id, chainId })
        Toast('info', `${n.transactionName} transaction submitted`)
      }
      if (n.type === 'transactionSucceed') {
        removeNotification({ notificationId: n.id, chainId })
        Toast('success', `${n.transactionName} transaction confirmed`)
      }
      if (n.type === 'transactionFailed') {
        removeNotification({ notificationId: n.id, chainId })
        Toast('error', `${n.transactionName} transaction failed`)
      }
    })
  }, [notifications, chainId, removeNotification])
}
