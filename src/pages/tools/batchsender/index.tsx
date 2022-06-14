import Head from 'next/head'
import { useState } from 'react'
import { useBoolean } from 'react-use'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import Container from '../../../components/Container'
import Input from '../../../components/Input'
import Modal from '../../../components/Modal'
import TextArea from '../../../components/TextArea'

export default function BatchSenderPage() {
  const [isReviewing, toggleReviewing] = useBoolean(false)
  const [addressInput, setAddressInput] = useState('')
  const [listInput, setListInput] = useState('')
  const [valueInput, setValueInput] = useState('0')
  const [options, setOptions] = useState({
    address: '',
    list: '',
    value: '',
  })
  return (
    <>
      <Head>
        <title>ERC20 Batch Sender | Ascension Protocol</title>
        <meta
          key="description"
          name="description"
          content="Ascension Protocol ERC20 batch sender"
        />
      </Head>

      <Container maxWidth="5xl">
        <Card title="ERC20 Batch Sender">
          <div className="flex flex-col gap-3">
            {' '}
            <h2>Enter token contract address:</h2>
            <Input.Address
              value={addressInput}
              onUserInput={(input) => {
                setAddressInput(input)
              }}
            ></Input.Address>
            <TextArea heading="Enter address list:" />
            <h2>Enter amount to send per address:</h2>
            <Input.Numeric
              value={valueInput}
              onUserInput={(input) => {
                setValueInput(input)
              }}
            ></Input.Numeric>
            <Button
              color="blue"
              onClick={() => {
                toggleReviewing()
              }}
            >
              Review Transaction
            </Button>
          </div>
        </Card>

        <Modal isOpen={isReviewing} onDismiss={() => toggleReviewing(false)}></Modal>
      </Container>
    </>
  )
}
