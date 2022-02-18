import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { classNames } from '../../functions'

export default function Tabs({ options = ['1d', '7d', '1y'], selected, onSelect }) {
  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-dark-900 p-1">
          {options &&
            options.map((option) => (
              <Tab
                key={option}
                className={({ selected }) =>
                  classNames(
                    'text-blue-700 w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-offset-blue-400 ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                    selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {option}
              </Tab>
            ))}
        </Tab.List>
        {/* <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-offset-blue-400 ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li key={post.id} className="hover:bg-coolGray-100 relative rounded-md p-3">
                    <h3 className="text-sm font-medium leading-5">{post.title}</h3>

                    <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels> */}
      </Tab.Group>
    </div>
  )
}
