import { XIcon } from '@heroicons/react/outline'
import cn from 'clsx'
import React from 'react'

export const Input = React.memo(
  ({
    value,
    onUserInput,
    placeholder = 'Address',
    className,
    ...rest
  }: {
    value: string
    onUserInput: (input: string) => void
    error?: boolean
    fontSize?: string
  } & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
    return (
      <>
        <div className="relative flex w-full items-center justify-center">
          <input
            value={value}
            onChange={(event) => {
              onUserInput(event.target.value)
            }}
            // universal input options
            inputMode="text"
            title="Address"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder={placeholder}
            pattern="^(0x[a-fA-F0-9]{40})$"
            // text-specific options
            type="text"
            className={cn(
              'relative block w-full rounded-md border-gray-500 bg-transparent shadow-sm hover:border-gray-400 focus:border-ascend-purple focus:ring-ascend-purple sm:text-sm',
              className
            )}
            {...rest}
          />
          {value !== '' && (
            <button onClick={() => onUserInput('')} className="absolute right-3 ">
              {' '}
              <XIcon height={24} />{' '}
            </button>
          )}
        </div>
      </>
    )
  }
)

Input.displayName = 'Address'

export default Input
