import React, { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { Menu, Transition } from '@headlessui/react'
import cn from 'clsx'
import Button, { ButtonProps } from './Button'

export interface DropdownProps extends ButtonProps {
  options: string[]
  title: string
  onSelect: Dispatch<SetStateAction<any>>
}

export default function Dropdown({
  options,
  title,
  onSelect,
  color,
  size,
  ...rest
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as={Fragment}>
          <button className="inline-flex rounded p-3 ring-2 ring-purple-500/50">
            {title}
            <svg
              className="-mr-1 ml-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-purple-800 shadow-lg ring-2 ring-purple-500/50  focus:outline-none">
          {options &&
            options.map((option, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <a
                    onClick={() => onSelect(option)}
                    className={cn(
                      active
                        ? 'bg-dark-700 bg-opacity-40 text-primary'
                        : 'bg-opacity-20 text-secondary',
                      'block cursor-pointer rounded-md px-6 py-3 text-sm'
                    )}
                  >
                    {option}
                  </a>
                )}
              </Menu.Item>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
