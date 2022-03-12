/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { classNames } from '../../functions'

interface DropdownProps {
  options: any
  selected: any
  onSelect?: any
}
export default function DropdownButton({ options, selected, onSelect }: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-800 ">
          {selected}
          <ChevronDownIcon className={classNames('-mr-1 ml-2 h-5 w-5')} aria-hidden="true" />
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
        <Menu.Items
          onChange={(e) => console.log(e)}
          className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {options.map((o) => {
              return (
                <Menu.Item key={o} onClick={() => onSelect(o)}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-900 text-gray-500' : 'text-gray-600',
                        ' block px-4 py-2 text-sm'
                      )}
                    >
                      {o}
                    </a>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
