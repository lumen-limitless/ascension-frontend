import Button from './ui/Button'
import Spinner from './ui/Spinner'
import PermitSVG from 'public/assets/permit.svg'

export default function PermitButton({
  isLoadingSig,
  signTypedData,
  children,
}: {
  isLoadingSig: boolean
  signTypedData: () => void
  children?: React.ReactNode
}) {
  return (
    <>
      <Button
        full
        disabled={isLoadingSig}
        onClick={signTypedData}
        variant="blue"
      >
        {isLoadingSig ? (
          <Spinner />
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
