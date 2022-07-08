import React, { Fragment } from 'react'
import Logo from '../ui/Logo'
import { ChevronDownIcon, LoginIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import Divider from '../ui/Divider'
import Badge from '../ui/Badge'
import cn from 'clsx'
import Button from '../ui/Button'
import { useEthers } from '@usedapp/core'
import { useBoolean } from 'react-use'
import Avatar from '../Avatar'
import useStore from '../../store/useStore'
import { CHAIN_ICON } from '../Network'

const Header: React.FC = () => {
  const { account, chainId } = useEthers()
  const [viewing, toggle] = useBoolean(false)
  const setModalView = useStore((state) => state.setModalView)
  return (
    <>
      <header
        className={
          'fixed z-20 w-full border-b-2 border-dark-700/30 bg-dark-1000/60 backdrop-blur-md'
        }
      >
        <Popover as="nav">
          <div className="flex h-16 items-center justify-between px-6 py-6 sm:px-12 md:justify-start md:space-x-10 lg:px-24 xl:px-36">
            <Link href="/">
              <a className="p-3">
                <span className="sr-only">Ascension Protocol</span>
                <Logo size={24} />
              </a>
            </Link>
            <div className="-my-2 -mr-2 flex gap-1 md:hidden">
              {!account ? (
                <Button color="blue" onClick={() => setModalView('connect')}>
                  <LoginIcon height={24} /> Connect Wallet
                </Button>
              ) : (
                <>
                  <Button
                    className="border border-dark-900"
                    onClick={() => setModalView('network')}
                  >
                    {chainId && CHAIN_ICON[chainId]}
                  </Button>
                  <Button
                    className="border border-dark-900"
                    onClick={() => setModalView('account')}
                  >
                    <Avatar size={24} />
                  </Button>
                </>
              )}

              <Popover.Button as="div">
                <span className="sr-only">Open menu</span>
                <Button color="transparent">
                  <MenuAlt2Icon height={24} width={24} aria-hidden="true" />
                </Button>
              </Popover.Button>
            </div>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
              <Popover.Group as="nav" className="flex space-x-10">
                <Link href="/">
                  <a className=" text-base font-medium text-gray-300 transition hover:text-white">
                    Home
                  </a>
                </Link>
                <Link href="/dashboard">
                  <a className="text-base font-medium text-gray-300 transition hover:text-white">
                    Dashboard
                  </a>
                </Link>

                <Link href="/stake">
                  <a className="text-base font-medium text-gray-300 transition hover:text-white">
                    Stake
                  </a>
                </Link>

                <Popover className="relative">
                  <Popover.Button
                    onClick={() => toggle()}
                    onMouseEnter={() => toggle(true)}
                    onMouseLeave={() => toggle(false)}
                    className={cn(
                      viewing ? 'text-white' : 'text-gray-300',
                      'group inline-flex items-center rounded-md  text-base font-medium transition hover:text-white'
                    )}
                  >
                    <span>Tools</span>
                    <ChevronDownIcon
                      className={cn(
                        viewing ? 'rotate-180 text-white' : 'text-gray-300',
                        'ml-2 h-5 w-5 transition group-hover:text-white'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    show={viewing}
                    onMouseEnter={() => toggle(true)}
                    onMouseLeave={() => toggle(false)}
                    as={'div'}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute z-20 -ml-4  min-w-max max-w-md transform rounded border-2 border-dark-700/30 lg:max-w-3xl "
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="bg-dark-1000 p-5">
                          <Link href={'/tools/reactor'}>
                            <a className="-m-3 flow-root rounded-md p-3 hover:bg-dark-900">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-white">
                                  Ascension Reactor
                                </div>
                                <Badge text="new" />
                                <Badge text="beta" />
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                Watch and react instantly to blockchain events
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
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </Popover.Group>
              <div className="flex items-center gap-1 md:ml-12">
                {!account ? (
                  <Button color="blue" onClick={() => setModalView('connect')}>
                    <LoginIcon height={24} /> Connect Wallet
                  </Button>
                ) : (
                  <>
                    <Button
                      className="border border-dark-900"
                      onClick={() => setModalView('network')}
                    >
                      {chainId && CHAIN_ICON[chainId]}
                    </Button>
                    <Button
                      className="border border-dark-900"
                      onClick={() => setModalView('account')}
                    >
                      <Avatar size={24} />
                    </Button>
                  </>
                )}
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
              className="fixed inset-x-0 top-0 z-30 h-screen origin-top-right transform overflow-hidden bg-dark-1000 transition md:hidden"
            >
              <div className="divide-y-2 divide-dark-900 rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Logo size={32} />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-100 transition hover:text-gray-500 ">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-6 text-center">
                    <Link href="/">
                      <a className=" text-base font-medium text-gray-100 transition hover:text-gray-500 ">
                        <Popover.Button className={'w-full'}>Home</Popover.Button>
                      </a>
                    </Link>

                    <Divider />

                    <Link href="/dashboard" passHref>
                      <Popover.Button
                        className={
                          'w-full text-base font-medium text-gray-100 transition hover:text-gray-500'
                        }
                      >
                        Dashboard
                      </Popover.Button>
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
      </header>
    </>
  )
}

export default Header
