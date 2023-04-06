import { Popover, Transition } from '@headlessui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Avatar from './Avatar'
import Button from './ui/Button'
import Account from './Account'
import Skeleton from './ui/Skeleton'
import { Fragment } from 'react'

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="blue"
                    size="sm"
                    onClick={openConnectModal}
                    type="button"
                    id="connect-wallet-button"
                  >
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
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="red"
                    size="sm"
                    onClick={openChainModal}
                    type="button"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    Wrong network
                  </Button>
                )
              }

              return (
                <div className="flex gap-3">
                  <Button variant="gray" size="sm" type="button">
                    {chain.hasIcon && (
                      <div
                        className="h-6 w-6 overflow-hidden rounded-full"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden lg:inline-block">{chain.name}</span>
                    {/* <svg
                      className=" h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg> */}
                  </Button>

                  <Popover>
                    <Popover.Button
                      className={
                        'z-20 inline-flex items-center rounded bg-gray-800  drop-shadow transition-all hover:brightness-125'
                      }
                    >
                      {' '}
                      <div className="hidden rounded-l px-2 py-2 md:inline-flex">
                        {account.displayBalance ? (
                          ` ${account.displayBalance}`
                        ) : (
                          <Skeleton />
                        )}
                      </div>{' '}
                      <div className="inline-flex items-center gap-1 rounded p-2 md:mr-1 lg:bg-gray-900 lg:p-1">
                        <Avatar address={account.address} size={24} />
                        <span className="hidden lg:inline-block">
                          {account.displayName}
                        </span>{' '}
                        <svg
                          className="h-6 w-6  "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
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
                      <Popover.Panel className="absolute left-0  z-20 mt-3 w-full min-w-max transform rounded border-2 border-purple-500/50 bg-purple-900 lg:left-auto lg:-ml-12 lg:w-auto">
                        <Account />
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
