import { Tab } from '@headlessui/react'
import { classNames } from '../../functions'

export default function Tabs({
  options,
  onTabChange,
  onTabSelect,
}: {
  options: any
  onTabChange?: any
  onTabSelect?: any
}) {
  return (
    <div className="max-w-xs flex-grow">
      <Tab.Group onChange={(e) => onTabChange && onTabChange(e)}>
        <Tab.List className="flex space-x-1 rounded-sm bg-dark-1000  p-1">
          {options &&
            options.map((o) => (
              <Tab
                key={o}
                onChange={() => onTabSelect && onTabSelect(o)}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-sm  text-sm font-medium leading-5',
                    '  focus:outline-none ',
                    selected ? 'bg-ascend-purple shadow' : ' opacity-80 hover:bg-ascend-purple'
                  )
                }
              >
                {o}
              </Tab>
            ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
