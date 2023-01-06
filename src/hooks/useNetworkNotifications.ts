import { useEthers, useNotifications } from '@usedapp/core'
import { useEffect } from 'react'
import useToast from './useToast'

export const useNetworkNotifications = () => {
  const { chainId } = useEthers()
  const { notifications, removeNotification } = useNotifications()
  const t = useToast()

  useEffect(() => {
    if (notifications.length > 0 && chainId) {
      notifications.forEach((n) => {
        if (n.type === 'transactionStarted') {
          removeNotification({ notificationId: n.id, chainId })
          t('info', `Transaction submitted`)
        }
        if (n.type === 'transactionSucceed') {
          removeNotification({ notificationId: n.id, chainId })
          t('success', `Transaction confirmed`)
        }
        if (n.type === 'transactionFailed') {
          removeNotification({ notificationId: n.id, chainId })
          t('error', `Transaction failed`)
        }
      })
    }
  })
}
