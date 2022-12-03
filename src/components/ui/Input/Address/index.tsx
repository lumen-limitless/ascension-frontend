import cn from 'clsx'
import React from 'react'

export const Input = React.memo(
  ({
    value,
    onUserInput,
    placeholder = '0x...',
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
              'focus:ring-ascend-purple relative block w-full rounded-md border-gray-500 bg-transparent shadow-sm hover:border-gray-400 focus:border-purple sm:text-sm',
              className
            )}
            {...rest}
          />
          {value !== '' && (
            <button
              onClick={() => onUserInput('')}
              className="absolute right-3 "
            >
              {' '}
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </>
    )
  }
)

Input.displayName = 'Address'

export default Input
