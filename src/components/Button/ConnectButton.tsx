import { useEthers } from '@usedapp/core'
import { useToggle } from 'react-use'
import Button from '.'
import { useToast } from '../../hooks/useToast'
import Modal from '../Modal'

export default function ConnectButton() {
  const { activateBrowserWallet } = useEthers()
  const [viewing, toggle] = useToggle(false)
  const toast = useToast(4000)

  return (
    <>
      <Button color="blue" onClick={() => toggle(true)}>
        Connect Wallet
      </Button>

      <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
        <h1>Select a Wallet</h1>

        <div className="my-3 flex h-full flex-col gap-3">
          <Button
            color="gray"
            onClick={() => {
              try {
                activateBrowserWallet()
              } catch (err) {
                console.error(`error while attempting to connect: ${err}`)
                toast('error', 'Unable to connect to wallet')
              }
            }}
          >
            MetaMask
          </Button>

          {/* <Button
              color="gray"
              onClick={() =>
                activate(walletconnect).catch((err) => {
                  console.error(`error while attempting to connect: ${err}`)
                  toast('error', 'Unable to connect to wallet')
                })
              }
            >
              WalletConnect
            </Button> */}
        </div>
      </Modal>
    </>
  )
}
