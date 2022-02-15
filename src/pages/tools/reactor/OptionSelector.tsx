import { ChainId } from '@usedapp/core'
import { useState } from 'react'
import { ReactorOptions } from '.'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Loader from '../../../components/Loader'
import Toggle from '../../../components/Toggle'
import { useVerifiedContractABI } from '../../../hooks/useAPI'

export default function OptionSelector({
  contract,
  chainId,
  setOptions,
}: {
  contract: string
  chainId: ChainId
  setOptions: React.Dispatch<React.SetStateAction<ReactorOptions>>
}) {
  const contractABI = useVerifiedContractABI(contract, chainId)
  const [event, setEvent] = useState<string>('')
  const [func, setFunc] = useState<any>(false)
  const [args, setArgs] = useState([])
  const [argInput, setArgInput] = useState<string>('')

  if (!contractABI) return <Loader message={`Loading ABI ${contract}`} />
  if (contractABI.length === 0) return <Loader message={`No valid ABI found for ${contract}`} />
  return (
    <>
      {!event && (
        <>
          <h1>Select an event to listen for</h1>
          <div className="flex flex-col gap-3  p-3">
            {contractABI.map((f, i) => {
              if (f.type == 'event') {
                return (
                  <Button key={i} color="blue" onClick={() => setEvent(f.name)}>
                    {f.name}
                  </Button>
                )
              }
            })}
          </div>
        </>
      )}
      {event && !func && (
        <>
          <h1>Select a function to call</h1>
          <div className="flex flex-col gap-3  p-3">
            {contractABI.map((f, i) => {
              if (
                f.type == 'function' &&
                [f.stateMutability == 'payable', f.stateMutability == 'nonpayable'].includes(true)
              ) {
                return (
                  <Button key={i} color="blue" onClick={() => setFunc(f)}>
                    {f.name}
                  </Button>
                )
              }
            })}
          </div>
        </>
      )}
      {event && func && func?.inputs.length > 0 && args.length < func?.inputs.length && (
        <>
          <h1>
            Enter argument for {func.inputs[args.length].name} ({func.inputs[args.length].type})
          </h1>
          <div className="flex flex-col gap-3  p-3">
            {func.inputs[args.length].type === 'address' && (
              <>
                <Input.Address
                  placeholder={func.inputs[args.length].name}
                  value={argInput}
                  onUserInput={(input) => setArgInput(input)}
                />
              </>
            )}
            {func.inputs[args.length].type === 'uint256' && (
              <>
                <Input.Numeric value={argInput} onUserInput={(input) => setArgInput(input)} />
              </>
            )}
            {func.inputs[args.length].type === 'bool' && (
              <>{/* <Toggle value={argInput} onUserInput={(input) => setArgInput(input)} /> */}</>
            )}
            <Button
              color="green"
              onClick={() => {
                setArgs([...args, argInput])
                setArgInput('')
              }}
            >
              Submit
            </Button>
          </div>
        </>
      )}
      {event && func && args.length === func.inputs.length && (
        <>
          <p>On {event} event:</p>
          {func.name}
          {func.inputs.map((a, i) => {
            return (
              <h1 key={i}>
                {a.name}: {args[i]}
              </h1>
            )
          })}
          <Button
            color="green"
            onClick={() =>
              setOptions({
                set: true,
                abi: contractABI,
                event: event,
                function: func.name,
                args: args,
              })
            }
          >
            Submit
          </Button>
        </>
      )}
    </>
  )
}
