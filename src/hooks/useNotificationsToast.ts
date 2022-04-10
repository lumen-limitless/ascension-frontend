import { useEthers, useNotifications } from '@usedapp/core'
import { useEffect } from 'react'
import useToast from './useToast'

export default function useNotificationsToast() {
  const { chainId } = useEthers()
  const { notifications, removeNotification } = useNotifications()
  const t = useToast()
  useEffect(() => {
    if (notifications.length === 0) return
    notifications.forEach((n) => {
      if (n.type === 'walletConnected') {
        removeNotification({ notificationId: n.id, chainId })
        t('success', 'Wallet connected')
      }
      if (n.type === 'transactionStarted') {
        removeNotification({ notificationId: n.id, chainId })
        t('info', `${n.transactionName} transaction submitted`)
      }
      if (n.type === 'transactionSucceed') {
        removeNotification({ notificationId: n.id, chainId })
        t('success', `${n.transactionName} transaction confirmed`)
      }
      if (n.type === 'transactionFailed') {
        removeNotification({ notificationId: n.id, chainId })
        t('error', `${n.transactionName} transaction failed`)
      }
    })
  })
}
