import { startsWith } from 'lodash'
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
export default function FlexibleInput({
  inputType,
  inputIndex,
  inputValue,
  onUserInput,
  onToggle,
}: FlexibleInputProps) {
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
