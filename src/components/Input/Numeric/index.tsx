import { classNames, escapeRegExp } from '../../../functions'

import React from 'react'
import Button from '../../Button'

export const Input = React.memo(
  ({
    max,
    value,
    onUserInput,
    placeholder,
    className,
    ...rest
  }: {
    max?: string
    value: string | number
    onUserInput: (input: string) => void
    error?: boolean
    fontSize?: string
    align?: 'right' | 'left'
  } & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const amount = e.target.value
      if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
        onUserInput(amount)
      }
    }
    return (
      <div className="relative flex w-full items-center justify-center">
        <input
          {...rest}
          value={value}
          onChange={(e) => {
            handleChange(e)
          }}
          // universal input options
          inputMode="numeric"
          title="Token Amount"
          autoComplete="off"
          autoCorrect="off"
          // text-specific options
          pattern="[0,9]"
          placeholder={placeholder ?? '0.0'}
          min={0}
          minLength={1}
          maxLength={79}
          spellCheck="false"
          className={classNames(
            ' relative block w-full rounded-md border-gray-300 bg-transparent shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            className
          )}
          type="text"
          onPaste={(e) => {
            e.preventDefault()
            return false
          }}
        />
        {max && (
          <Button className="absolute right-0" onClick={() => onUserInput(max)}>
            MAX
          </Button>
        )}
      </div>
    )
  }
)

Input.displayName = 'Numeric'

export default Input
