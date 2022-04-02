import { useEthers } from '@usedapp/core'
import { useToggle } from 'react-use'
import Button from '.'
import Modal from '../Modal'

export default function ConnectButton() {
  const { activateBrowserWallet } = useEthers()
  const [viewing, toggle] = useToggle(false)

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
              activateBrowserWallet()
            }}
          >
            MetaMask
          </Button>

          <Button color="gray" onClick={() => activateBrowserWallet()}>
            Browser Wallet
          </Button>
        </div>
      </Modal>
    </>
  )
}
