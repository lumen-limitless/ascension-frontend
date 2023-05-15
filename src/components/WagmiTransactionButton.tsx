import { useWaitForTransaction } from 'wagmi'
import { TransactionReceipt } from 'viem'
import { Loader2 } from 'lucide-react'
import { Button, ButtonProps } from './ui/button'

interface WagmiTransactionButtonProps extends ButtonProps {
  className?: string
  transaction?: any
  onTransactionSuccess?: (data: TransactionReceipt) => void
  onTransactionError?: (data: Error) => void
  onTransactionSettled?: (
    data: TransactionReceipt | undefined,
    error: Error | null
  ) => void
  name?: string
}

export default function WagmiTransactionButton({
  className,
  transaction,
  onTransactionSuccess,
  onTransactionError,
  onTransactionSettled,
  name,
  ...props
}: WagmiTransactionButtonProps) {
  const confirmation = useWaitForTransaction({
    hash: transaction.data?.hash,
    onSuccess: onTransactionSuccess,
    onError: onTransactionError,
    onSettled: onTransactionSettled,
  })

  return (
    <Button
      {...props}
      disabled={!transaction?.write}
      onClick={() => transaction.write()}
    >
      {transaction?.isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          <span>Confirm in wallet</span>
        </>
      ) : confirmation?.isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          <span>Confirming</span>
        </>
      ) : (
        <span>{name}</span>
      )}
    </Button>
  )
}
