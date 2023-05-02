import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import Badge from './ui/Badge'
import { clsx } from 'clsx'
import { useBoolean, useLockBodyScroll } from 'react-use'
import CustomConnectButton from './CustomConnectButton'
import LogoSVG from 'public/assets/logo.svg'

const links = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Earn', href: '/earn' },
]
const tools = [
  {
    title: 'Join DAO',
    href: 'https://discord.com/channels/954952786041258004/1094139169619591258',
    description: 'Verify your balance in discord and join the DAO',
    badges: [],
  },
  {
    title: 'Governance',
    href: 'https://vote.ascensionprotocol.io',
    description:
      'Vote on proposals and help shape the future of Ascension Protocol',
    badges: [],
  },
  // {
  //   title: 'Listing Sniper',
  //   href: 'https://discord.com/channels/954952786041258004/1067288166601588927',
  //   description: "Get notified when a new token is listed on DEX's",
  //   badges: ['New'],
  // },
  // {
  //   title: 'Supernova',
  //   href: '',
  //   description:
  //     'Suite of DeFi tools that supercharges your wallet with automation and AI.',
  //   badges: ['New', 'Alpha'],
  // },
]

export default function Nav() {
  const [viewing, toggleViewing] = useBoolean(false)
  const [open, toggleOpen] = useBoolean(false)
  useLockBodyScroll(open)
  return (
    <Popover as="nav">
      {({ open, close }) => (
        <>
          <div className=" flex h-20 items-center justify-between px-3 md:space-x-10  md:px-12 lg:justify-start  lg:px-24 xl:px-32">
            <Link href="/" className="z-30 p-3">
              <>
                <span className="sr-only">Ascension Protocol</span>
                <LogoSVG className="h-8" />
              </>
            </Link>
            <div className=" ml-auto flex items-center gap-3 lg:hidden">
              <CustomConnectButton />
              <Popover.Button
                onClick={toggleOpen}
                className={
                  'z-30 inline-flex rounded border border-purple-500/60 p-2 text-sm hover:brightness-125'
                }
              >
                {!open ? (
                  <>
                    <span className="sr-only">Open menu</span>

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
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Popover.Button>
            </div>
            <div className="hidden md:flex-1 md:items-center md:justify-between lg:flex">
              <Popover.Group as="div" className="flex space-x-10">
                {links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="  text-base font-medium text-secondary transition hover:text-primary"
                  >
                    {link.title}
                  </Link>
                ))}

                <Popover>
                  <Popover.Button
                    onClick={toggleViewing}
                    onMouseEnter={() => toggleViewing(true)}
                    onMouseLeave={() => toggleViewing(false)}
                    className={clsx(
                      viewing ? 'text-primary' : 'text-secondary',
                      'group inline-flex items-center rounded-md  text-base font-medium transition hover:text-primary'
                    )}
                  >
                    <p>Explore</p>
                    <svg
                      className={clsx(
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
                    onMouseEnter={() => toggleViewing(true)}
                    onMouseLeave={() => toggleViewing(false)}
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
                      className="absolute z-20 -ml-4 min-w-max  max-w-md transform rounded border-2 border-purple-500/60 bg-purple-900 lg:max-w-3xl "
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="bg-purple-1000 p-5">
                          {tools.map((tool) => (
                            <a
                              key={tool.title}
                              href={tool.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="-m-3 flow-root rounded-md p-3 hover:bg-purple-700"
                            >
                              <>
                                <div className="flex items-center">
                                  <div className="after:content-['_↗']">
                                    {tool.title}
                                  </div>
                                  {tool.badges &&
                                    tool.badges.map((badge, i) => (
                                      <Badge key={i} text={badge} />
                                    ))}
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {tool.description}
                                </p>
                              </>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </Popover.Group>
              <div className="flex items-center gap-3">
                <CustomConnectButton />
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out transition-all"
            enterFrom="opacity-0 h-0"
            enterTo="opacity-100 h-[calc(100svh-80px)]"
            leave="duration-200 ease-in transition-all"
            leaveFrom="opacity-100  h-[calc(100svh-80px)]"
            leaveTo="opacity-0 h-0"
          >
            <Popover.Panel
              focus
              className="fixed inset-x-0 top-20 flex origin-top-right transform flex-col items-center justify-evenly divide-y divide-purple-500 overflow-hidden border-b border-t-2 border-purple-500 border-purple-500/60 bg-purple-900 transition lg:hidden"
            >
              <div className="flex h-full w-full items-center justify-center text-center">
                <Link
                  href="/"
                  onClick={() => {
                    close()
                    toggleViewing(false)
                  }}
                >
                  Home
                </Link>
              </div>

              <div className="flex h-full w-full items-center justify-center text-center">
                <Link
                  href="/dashboard"
                  onClick={() => {
                    close()
                    toggleOpen(false)
                  }}
                >
                  Dashboard
                </Link>
              </div>

              <div className="flex h-full w-full items-center justify-center text-center">
                <Link
                  href="/earn"
                  onClick={() => {
                    close()
                    toggleOpen(false)
                  }}
                >
                  Earn
                </Link>
              </div>

              {/* <Link
                    href="/tools"
                    onClick={() => {
                      close()
                      toggleOpen(false)
                    }}

                  >
                    Tools
                  </Link> */}
              {tools.map((tool) => (
                <div
                  className="flex h-full w-full items-center justify-center text-center"
                  key={tool.title}
                >
                  <a href={tool.href} target="_blank" rel="noopener noreferrer">
                    <div className="after:content-['_↗']">{tool.title}</div>
                  </a>
                </div>
              ))}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
