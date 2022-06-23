import { startsWith } from 'lodash'
import { FC } from 'react'
import Input from '../ui/Input'
import Toggle from '../ui/Toggle'
import Typography from '../ui/Typography'

interface FlexibleInputProps {
  inputType: string
  inputIndex: number
  inputValue: any
  updateAt: (i: number, item: any) => void
}
const FlexibleInput: FC<FlexibleInputProps> = ({ inputType, inputIndex, inputValue, updateAt }) => {
  return (
    <>
      {' '}
      {inputType === 'address' ? (
        <Input.Address value={inputValue} onUserInput={(input) => updateAt(inputIndex, input)} />
      ) : startsWith(inputType, 'uint', 0) ? (
        <Input.Numeric
          placeholder={inputType}
          value={inputValue}
          onUserInput={(input) => updateAt(inputIndex, input)}
        />
      ) : inputType === 'bool' ? (
        <Toggle
          isActive={inputValue ?? false}
          toggle={() => updateAt(inputIndex, inputValue ? !inputValue : true)}
        />
      ) : inputType === 'string' || startsWith(inputType, 'bytes', 0) ? (
        <Input.String
          placeholder={inputType}
          value={inputValue}
          onUserInput={(input) => updateAt(inputIndex, input)}
        />
      ) : (
        <Typography as="span">Input of type {inputType} is not supported</Typography>
      )}
    </>
  )
}

export default FlexibleInput
