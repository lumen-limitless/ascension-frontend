import { Tab } from '@headlessui/react'
import { memo } from 'react'
import Button from '../Button'

export interface TabProps {
  options?: string[]
  selectedIndex?: number
  onTabChange?: (i: number) => any
  onTabSelect?: (o: string) => any
}
const Tabs = ({ options, selectedIndex, onTabChange, onTabSelect }: TabProps) => {
  return (
    <div className="w-full">
      <Tab.Group defaultIndex={selectedIndex} onChange={(i) => onTabChange && onTabChange(i)}>
        <Tab.List className="flex flex-shrink flex-wrap gap-1">
          {options &&
            options.map((o, i) => (
              <Tab key={i} onChange={() => onTabSelect && onTabSelect(o)}>
                {({ selected }) => (
                  <Button color={selected ? 'gradient' : 'transparent'} size="sm">
                    {o}
                  </Button>
                )}
              </Tab>
            ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}

export default memo(Tabs)
