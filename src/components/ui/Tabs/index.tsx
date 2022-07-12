import { Tab } from '@headlessui/react'
import cn from 'clsx'

export interface TabsProps {
  options?: string[]
  selectedIndex?: number
  onTabChange?: (i: number) => any
  onTabSelect?: (o: string) => any
}
export default function Tabs({ options, selectedIndex, onTabChange, onTabSelect }: TabsProps) {
  return (
    <Tab.Group defaultIndex={selectedIndex} onChange={(i) => onTabChange && onTabChange(i)}>
      <Tab.List className="flex flex-shrink flex-wrap gap-3">
        {options &&
          options.map((o, i) => (
            <Tab key={i} onChange={() => onTabSelect && onTabSelect(o)}>
              {({ selected }) => (
                <div className={cn(selected && 'bg-purple', 'rounded p-1')}>{o}</div>
              )}
            </Tab>
          ))}
      </Tab.List>
    </Tab.Group>
  )
}
