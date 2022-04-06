import React, { Fragment } from 'react'
import Connection from '../Connection'
import Logo from '../Logo'
import { ChevronDownIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { Popover, Transition } from '@headlessui/react'
import { classNames } from '../../functions'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Divider from '../Divider'

export default function Header() {
  const { pathname } = useRouter()
  return (
    <>
      <Popover className={classNames(pathname === '/' ? 'absolute' : 'sticky', 'z-20 w-full')}>
        <div className="flex h-24 items-center justify-between px-6 py-6 sm:px-12 md:justify-start md:space-x-10">
          <div>
            <a href="#" className="flex">
              <span className="sr-only">Ascension Protocol</span>
              <Logo />
            </a>
          </div>
          <div className="-my-2 -mr-2 flex gap-1 md:hidden">
            <Connection />
            <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-100 transition hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <Link href="/">
                <a className=" text-base font-medium text-gray-100 transition hover:text-gray-500">Home</a>
              </Link>
              <Link href="/dashboard">
                <a className="text-base font-medium text-gray-100 transition hover:text-gray-500">Dashboard</a>
              </Link>

              <Link href="/stake">
                <a className="text-base font-medium text-gray-100 transition hover:text-gray-500">Stake</a>
              </Link>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-gray-500' : 'text-gray-100',
                        'group inline-flex items-center rounded-md  text-base font-medium transition hover:text-gray-500'
                      )}
                    >
                      <span>Tools</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'text-gray-600' : 'text-gray-400',
                          'ml-2 h-5 w-5 group-hover:text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 min-w-max max-w-md transform lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="bg-dark-800 p-6 sm:p-9">
                            <Link href={'/tools/universalswap'}>
                              <a className="-m-3 flow-root rounded-md p-3 hover:bg-dark-900">
                                <div className="flex items-center">
                                  <div className="text-base font-medium text-white">Universal Swap Tool</div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  Perform swaps on any chain at the best rates
                                </p>
                              </a>
                            </Link>
                            <Link href={'/tools/batchsender'}>
                              <a className="-m-3 flow-root rounded-md p-3 hover:bg-dark-900">
                                <div className="flex items-center">
                                  <div className="text-base font-medium text-white">Batch Sender</div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Easily create & send bulk ERC-20 transfers</p>
                              </a>
                            </Link>
                            <Link href={'/tools/mempoolsniper'}>
                              <a className="-m-3 flow-root rounded-md p-3 hover:bg-dark-900">
                                <div className="flex items-center">
                                  <div className="text-base font-medium text-white">Mempool Sniper</div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  Snipe newly listed tokens on decentralized exchanges
                                </p>
                              </a>
                            </Link>
                            <Link href={'/tools'}>
                              <a className="-m-3 flow-root rounded-md p-3 hover:bg-dark-900">
                                <div className="flex items-center">
                                  <div className="text-base font-medium text-white">All Tools</div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">View all Ascension tools</p>
                              </a>
                            </Link>
                            {/* <a href="#" className="-m-3 flow-root rounded-md p-3 hover:bg-dark-900">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-white">Event Reactor</div>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Automate contract interactions</p>
                            </a> */}
                            {/* <a href="#" className="-m-3 flow-root rounded-md p-3 hover:bg-dark-900">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-white">Uni-V3 LP Manager</div>
                                <Badge text="New" />
                              </div>

                              <p className="mt-1 text-sm text-gray-500">
                                Set-and-forget pool for maximizing yield on Uniswap-V3 liquidity positions
                              </p>
                            </a> */}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <Connection />
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out transition"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="duration-200 ease-in transition"
          leaveFrom="opacity-100  translate-x-0"
          leaveTo="opacity-0  translate-x-full"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-0 top-0 h-screen origin-top-right transform overflow-hidden bg-dark-1000 transition md:hidden"
          >
            <div className="divide-y-2 divide-dark-600 rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Logo />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-100 transition hover:text-gray-500 ">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="flex flex-col gap-6 text-center">
                  <Link href="/">
                    <a className=" text-base font-medium text-gray-100 transition hover:text-gray-500 ">
                      <Popover.Button className={'w-full'}>Home</Popover.Button>
                    </a>
                  </Link>

                  <Divider />

                  <Link href="/dashboard">
                    <a className=" text-base font-medium text-gray-100 transition hover:text-gray-500">
                      <Popover.Button className={'w-full'}>Dashboard</Popover.Button>
                    </a>
                  </Link>

                  <Divider />
                  <Link href="/stake">
                    <a className="text-base font-medium text-gray-100 transition hover:text-gray-500">
                      <Popover.Button className={'w-full'}>Stake</Popover.Button>
                    </a>
                  </Link>
                  <Divider />
                  <Link href="/tools">
                    <a className="text-base font-medium text-gray-100 transition hover:text-gray-500">
                      <Popover.Button className={'w-full'}>Tools</Popover.Button>
                    </a>
                  </Link>
                  <Divider />
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  )
}
