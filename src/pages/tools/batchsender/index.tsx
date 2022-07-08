import Head from 'next/head'
import { useState } from 'react'
import { useBoolean } from 'react-use'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Container from '../../../components/ui/Container'
import Input from '../../../components/ui/Input'
import Modal from '../../../components/ui/Modal'
import Section from '../../../components/ui/Section'

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
        <title> Batch Sender | Ascension Protocol</title>
        <meta
          key="description"
          name="description"
          content="Ascension Protocol token batch sender"
        />
      </Head>
      <Section fullscreen layout="start" padding="md">
        {' '}
        <Container maxWidth="7xl">
          <Card title="Batch Sender">
            <div className="flex flex-col gap-3">
              {' '}
              <h2>Enter token contract address:</h2>
              <Input.Address
                value={addressInput}
                onUserInput={(input) => {
                  setAddressInput(input)
                }}
              ></Input.Address>
              <h2>Enter receiver address list:</h2>
              <Input.TextArea
                value={listInput}
                placeholder="Receiver address list"
                onUserInput={(input) => setListInput(input)}
              />
              <Button>Upload CSV</Button>
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
      </Section>
    </>
  )
}
