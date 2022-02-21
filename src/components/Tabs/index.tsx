import { Tab } from '@headlessui/react'
import { classNames } from '../../functions'

export default function Tabs({ options, onChange }) {
  return (
    <div className="w-full max-w-md ">
      <Tab.Group onChange={onChange}>
        <Tab.List className="flex space-x-1 rounded-xl bg-dark-900 p-1">
          {options &&
            options.map((option) => (
              <Tab
                key={option}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg  text-sm font-medium leading-5',
                    'ring-ascend-orange ring-opacity-60 ring-offset-2 ring-offset-ascend-orange focus:outline-none focus:ring-2',
                    selected ? 'bg-ascend-orange shadow' : ' hover:bg-ascend-orange '
                  )
                }
              >
                {option}
              </Tab>
            ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
