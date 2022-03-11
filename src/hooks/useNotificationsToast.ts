import { useEthers, useNotifications } from '@usedapp/core'
import { useEffect } from 'react'
import { useToast } from './useToast'

export default function useNotificationsToast() {
  const { chainId } = useEthers()
  const toast = useToast()
  const { notifications, removeNotification } = useNotifications()
  useEffect(() => {
    notifications.forEach((n) => {
      if (n.type === 'walletConnected') {
        removeNotification({ notificationId: n.id, chainId })
        toast('info', 'Wallet Connected')
      }
      if (n.type === 'transactionStarted') {
        removeNotification({ notificationId: n.id, chainId })
        toast('info', `${n.transactionName} transaction submitted`)
      }
      if (n.type === 'transactionSucceed') {
        removeNotification({ notificationId: n.id, chainId })
        toast('success', `${n.transactionName} transaction confirmed`)
      }
      if (n.type === 'transactionFailed') {
        removeNotification({ notificationId: n.id, chainId })
        toast('error', `${n.transactionName} transaction failed`)
      }
    })
  }, [notifications, chainId, removeNotification, toast])
}
