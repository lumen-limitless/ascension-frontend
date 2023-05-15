import PermitSVG from 'public/assets/permit.svg'
import { Button, ButtonProps } from './ui/button'
import { Loader2 } from 'lucide-react'

interface PermitButtonProps extends ButtonProps {
  isLoadingSig: boolean
  signTypedData: () => void
  children?: React.ReactNode
}
export default function PermitButton({
  isLoadingSig,
  signTypedData,
  children,
  ...props
}: PermitButtonProps) {
  return (
    <>
      <Button {...props} disabled={isLoadingSig} onClick={signTypedData}>
        {isLoadingSig ? (
          <>
            <Loader2 className="animate-spin" /> Sign Message{' '}
          </>
        ) : (
          <>
            <PermitSVG className="h-4" />
            {children}
          </>
        )}
      </Button>
    </>
  )
}
