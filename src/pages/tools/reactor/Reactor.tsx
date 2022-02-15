import { ChainId, useContractFunction } from '@usedapp/core'
import { useEffect } from 'react'
import { useToggle } from 'react-use'
import { ReactorOptions } from '.'
import Button from '../../../components/Button'
import { useContract } from '../../../hooks/useContract'
import { useToast } from '../../../hooks/useToast'

export default function Reactor({
  address,
  options,
  chainId,
}: {
  address: string
  options: ReactorOptions
  chainId: ChainId
}) {
  const contract = useContract(address, options?.abi, chainId)
  const functionCall = useContractFunction(contract, options?.function, {
    transactionName: 'Reactor Call',
  })
  useEffect(() => {
    if (!contract) return
    if (functionCall.state.status !== 'None') return

    contract.once(options.event, () => {
      functionCall.send(options.args).catch((err) => console.error(err))
    })

    return () => {
      contract.removeAllListeners()
    }
  }, [options, chainId, contract, functionCall])

  return (
    <>
      {' '}
      <h1 className="text-center text-xl">
        {functionCall.state.status == 'None'
          ? 'Listening for event...'
          : functionCall.state.status == 'PendingSignature'
          ? 'Confirm Transaction'
          : functionCall.state.status == 'Exception'
          ? 'Exception during function call'
          : undefined}
      </h1>
    </>
  )
}
