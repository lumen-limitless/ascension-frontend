import { Popover, Transition } from '@headlessui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Avatar from './Avatar'
import Account from './Account'
import { Fragment } from 'react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { AlertTriangleIcon, WalletIcon } from 'lucide-react'
import { useEnsAvatar } from 'wagmi'

export default function CustomConnectButton() {
  const { data: avatar } = useEnsAvatar()
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
                    <WalletIcon />
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant={'destructive'}
                    size="sm"
                    onClick={openChainModal}
                    type="button"
                  >
                    <AlertTriangleIcon />
                    Wrong network
                  </Button>
                )
              }

              return (
                <div className="flex gap-3">
                  <Button size="sm" type="button" variant="gray">
                    {chain.hasIcon && (
                      <div
                        className="mr-1 h-6 w-6 overflow-hidden rounded-full"
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
                    <Popover.Button as={Fragment}>
                      <Button variant="gray" size="sm">
                        <div className="hidden rounded-l px-2 py-2 md:inline-flex">
                          {account.displayBalance || (
                            <Skeleton className="h-5 w-8" />
                          )}
                        </div>{' '}
                        <div className="inline-flex items-center gap-1 rounded p-2 md:mr-1 lg:bg-gray-900 lg:p-1">
                          <Avatar
                            ensImage={avatar}
                            address={account.address}
                            size={24}
                          />
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
                      </Button>
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
