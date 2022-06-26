import { useEthers, useNotifications } from '@usedapp/core'
import { useEffect } from 'react'
import useToast from './useToast'

export const useNetworkNotifications = () => {
  const { chainId } = useEthers()
  const { notifications, removeNotification } = useNotifications()
  const t = useToast()

  return useEffect(() => {
    if (!chainId) return
    if (notifications.length === 0) return

    notifications.forEach((n) => {
      removeNotification({ notificationId: n.id, chainId: chainId })
      if (n.type === 'walletConnected') {
        t('success', 'Wallet connected')
      } else if (n.type === 'transactionStarted') {
        t('info', `${n.transactionName} transaction submitted`)
      } else if (n.type === 'transactionSucceed') {
        t('success', `${n.transactionName} transaction confirmed`)
      } else if (n.type === 'transactionFailed') {
        t('error', `${n.transactionName} transaction failed`)
      } else {
        t('info', `${n}`)
      }
    })
  })
}
