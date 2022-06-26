import { startsWith } from 'lodash'
import { FC } from 'react'
import Input from '../ui/Input'
import Toggle from '../ui/Toggle'
import Typography from '../ui/Typography'

interface FlexibleInputProps {
  inputType: string
  inputIndex: number
  inputValue: any
  onUserInput: (input: string) => void
  onToggle: () => void
}
const FlexibleInput: FC<FlexibleInputProps> = ({
  inputType,
  inputIndex,
  inputValue,
  onUserInput,
  onToggle,
}) => {
  return (
    <>
      {' '}
      {inputType === 'address' ? (
        <Input.Address value={inputValue} onUserInput={onUserInput} />
      ) : startsWith(inputType, 'uint', 0) ? (
        <Input.Numeric placeholder={inputType} value={inputValue} onUserInput={onUserInput} />
      ) : inputType === 'bool' ? (
        <Toggle isActive={inputValue ?? false} onToggle={onToggle} />
      ) : inputType === 'string' || startsWith(inputType, 'bytes', 0) ? (
        <Input.String placeholder={inputType} value={inputValue} onUserInput={onUserInput} />
      ) : (
        <Typography as="span">Input of type {inputType} is not supported</Typography>
      )}
    </>
  )
}

export default FlexibleInput
