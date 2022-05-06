import Button, { ButtonProps } from '../Button'
import Loader from '../Loader'

interface TransactionButtonProps extends ButtonProps {
  method?: any
  args?: any[]
  name?: string
}
export default function TransactionButton({ method, args, name, ...rest }: TransactionButtonProps) {
  return (
    <Button
      disabled={method.state.status == 'None' ? false : true}
      onClick={() => {
        method.send(...args).then(() => {
          method.state.status == 'None' && method.resetState()
        })
      }}
      {...rest}
    >
      {method.state.status === 'None' ? name : <Loader />}
    </Button>
  )
}
