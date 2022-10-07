import { Tab } from '@headlessui/react'
import cn from 'clsx'

export interface TabsProps {
  options?: string[]
  selectedIndex?: number
  onTabChange?: (i: number) => any
  onTabSelect?: (o: string) => any
}
export default function Tabs({
  options,
  selectedIndex,
  onTabChange,
  onTabSelect,
}: TabsProps) {
  return (
    <Tab.Group
      defaultIndex={selectedIndex}
      onChange={(i) => onTabChange && onTabChange(i)}
    >
      <Tab.List className="flex flex-wrap ">
        {options &&
          options.map((o, i) => (
            <Tab key={i} onChange={() => onTabSelect && onTabSelect(o)}>
              {({ selected }) => (
                <div
                  className={cn(
                    selected && 'bg-purple',
                    'bg-dark-1000 p-2 hover:brightness-125'
                  )}
                >
                  {o}
                </div>
              )}
            </Tab>
          ))}
      </Tab.List>
    </Tab.Group>
  )
}
