import Button, { ButtonProps } from '../Button'
import Loader from '../Loader'

type Requirement = {
  requirement: boolean
  message: string
}
export interface TransactionButtonProps extends Omit<ButtonProps, 'disabled'> {
  method: any
  args?: any[]
  name?: string
  requirements?: Requirement
}
export default function TransactionButton({
  method,
  args = [],
  name,
  requirements,
  ...rest
}: TransactionButtonProps) {
  return (
    <Button
      disabled={
        (typeof requirements !== 'undefined' && requirements.requirement === false) ||
        method.state.status !== 'None'
      }
      onClick={() => {
        method.send(...args).then(() => {
          method.state.status === 'None' && method.resetState()
        })
      }}
      {...rest}
    >
      {typeof requirements !== 'undefined' && requirements.requirement === false ? (
        requirements.message
      ) : method.state.status === 'None' ? (
        name
      ) : (
        <Loader />
      )}
    </Button>
  )
}
