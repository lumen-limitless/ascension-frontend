import React, { Fragment } from 'react'
import Logo from './ui/Logo'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import Divider from './ui/Divider'
import Badge from './ui/Badge'
import cn from 'clsx'
import Button from './ui/Button'
import { useEthers } from '@usedapp/core'
import { useBoolean } from 'react-use'
import Avatar from './Avatar'
import { useUI } from '../hooks'
import ChainIcon from './icons/ChainIcon'
import Account from './views/Account'
import Network from './views/Network'
import { ethers } from 'ethers'
import { HOME_CHAINID } from '../constants'
import { VIEW } from '../constants/enums'

const Connection = ({
  chainId,
  account,
  setModalView,
  error,
  deactivate,
  switchNetwork,
}) => {
  return (
    <div className="flex gap-1">
      {!account ? (
        <Button color="blue" onClick={() => setModalView(VIEW.CONNECT)}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          Connect Wallet
        </Button>
      ) : error ? (
        <>
          {error.name === 'ChainIdError' ? (
            <Button color="yellow" onClick={() => switchNetwork(HOME_CHAINID)}>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Switch Network
            </Button>
          ) : (
            <Button color="red" onClick={deactivate}>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Error
            </Button>
          )}
        </>
      ) : (
        <>
          <Popover>
            <Popover.Button as="div">
              <span className="sr-only">change network</span>
              <Button className="border border-purple-500/30">
                {chainId && <ChainIcon chainId={chainId} />}
              </Button>
            </Popover.Button>
            <Popover.Panel
              className={
                'absolute z-20  mt-3 -ml-12  min-w-max   transform rounded border-2 border-purple-500/30 bg-purple-900 p-3 lg:max-w-3xl'
              }
            >
              <Network />
            </Popover.Panel>
          </Popover>

          <Popover>
            <Popover.Button as="div">
              <span className="sr-only">view account</span>
              <Button className="border border-purple-500/30">
                <Avatar
                  size={24}
                  address={account ?? ethers.constants.AddressZero}
                />
              </Button>
            </Popover.Button>
            <Popover.Panel
              className={
                'absolute left-0 z-20 w-screen transform rounded border-2 border-purple-500/30 bg-purple-900 p-3 md:left-auto md:mt-3 md:-ml-64 md:w-auto'
              }
            >
              <Account />
            </Popover.Panel>
          </Popover>
        </>
      )}
    </div>
  )
}

export default function Nav() {
  const { account, chainId, error, deactivate, switchNetwork } = useEthers()
  const [viewing, toggle] = useBoolean(false)
  const { setModalView } = useUI()
  return (
    <Popover as="nav">
      <div className=" flex h-16 items-center justify-between px-6  sm:px-12 md:justify-start md:space-x-10 lg:px-24 xl:px-36">
        <Link href="/" className="p-3">
          <>
            <span className="sr-only">Ascension Protocol</span>
            <Logo size={24} />
          </>
        </Link>
        <div className="-my-2 -mr-2 flex gap-1 md:hidden">
          <Connection
            account={account}
            chainId={chainId}
            setModalView={setModalView}
            error={error}
            deactivate={deactivate}
            switchNetwork={switchNetwork}
          />

          <Popover.Button as="div">
            <span className="sr-only">Open menu</span>
            <Button color="transparent">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden={true}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </Button>
          </Popover.Button>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <Popover.Group as="div" className="flex space-x-10">
            <Link
              href="/"
              className=" text-base font-medium text-secondary transition hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-base font-medium text-secondary transition hover:text-primary"
            >
              Dashboard
            </Link>

            <Link
              href="/stake"
              className="text-base font-medium text-secondary transition hover:text-primary"
            >
              Stake
            </Link>

            <Popover>
              <Popover.Button
                onClick={toggle}
                onMouseEnter={() => toggle(true)}
                onMouseLeave={() => toggle(false)}
                className={cn(
                  viewing ? 'text-primary' : 'text-secondary',
                  'group inline-flex items-center rounded-md  text-base font-medium transition hover:text-primary'
                )}
              >
                <span>Tools</span>
                <svg
                  className={cn(
                    viewing ? 'rotate-180 text-primary' : 'text-secondary',
                    'ml-2 h-5 w-5 transition group-hover:text-primary'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
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
                  className="absolute z-20 -ml-4 min-w-max  max-w-md transform rounded border-2 border-purple-500/30 bg-purple-900 lg:max-w-3xl "
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="bg-purple-1000 p-5">
                      <Link
                        href={'/tools/reactor'}
                        className="-m-3 flow-root rounded-md p-3 hover:bg-purple-700"
                      >
                        <>
                          <div className="flex items-center">
                            <div className="text-base font-medium text-primary">
                              Ascension Reactor
                            </div>
                            <Badge text="beta" />
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Watch and react instantly to blockchain events
                          </p>
                        </>
                      </Link>

                      {/* <Link href={'/tools/batchsender'} legacyBehavior>
                        <a className="-m-3 flow-root rounded-md p-3 hover:bg-purple-700">
                          <div className="flex items-center">
                            <div className="text-base font-medium text-primary">
                              Ascension BatchSender
                            </div>
                            <Badge text="new" />
                            <Badge text="beta" />
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Batch asset transfers into one transaction
                          </p>
                        </a>
                      </Link> */}

                      <Link href={'/tools'} legacyBehavior>
                        <a className="-m-3 flow-root rounded-md p-3 hover:bg-purple-700">
                          <div className="flex items-center">
                            <div className="text-base font-medium text-primary">
                              All Tools
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            View all Ascension tools
                          </p>
                        </a>
                      </Link>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>

          <Connection
            account={account}
            chainId={chainId}
            setModalView={setModalView}
            error={error}
            deactivate={deactivate}
            switchNetwork={switchNetwork}
          />
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
          className="fixed inset-x-0 top-0 z-30 h-screen origin-top-right transform overflow-hidden bg-purple-900 transition md:hidden"
        >
          <div className="divide-y-2 divide-purple-900 rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Logo size={32} />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-primary transition  ">
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6">
              <div className="flex flex-col gap-6 text-center">
                <Link
                  href="/"
                  className=" text-base font-medium text-primary   "
                >
                  <Popover.Button className={'w-full'}>Home</Popover.Button>
                </Link>

                <Divider />

                <Link
                  href="/dashboard"
                  className="text-base font-medium text-primary  "
                >
                  <Popover.Button className={'w-full '}>
                    Dashboard
                  </Popover.Button>
                </Link>

                <Divider />
                <Link
                  href="/stake"
                  className="text-base font-medium text-primary  "
                >
                  <Popover.Button className={'w-full'}>Stake</Popover.Button>
                </Link>
                <Divider />
                <Link
                  href="/tools"
                  className="text-base font-medium text-primary"
                >
                  <Popover.Button className={'w-full'}>Tools</Popover.Button>
                </Link>
                <Divider />
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
