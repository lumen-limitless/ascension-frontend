'use client'
import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useBoolean, useLockBodyScroll } from 'react-use'
import CustomConnectButton from './CustomConnectButton'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib'
import LogoSVG from 'public/assets/logo.svg'

const links = [
  { title: 'Dashboard', href: '/dashboard' },
  // { title: 'Stake', href: '/stake' },
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
    <>
      <Popover as="nav">
        <>
          <div className=" flex h-20 items-center justify-between px-3 md:space-x-10  md:px-12 lg:justify-start  lg:px-24 xl:px-32">
            <Link href="/" className="z-30 p-3">
              <span className="sr-only">Ascension Protocol</span>
              <LogoSVG className="h-8" />
            </Link>
            <div className=" ml-auto flex items-center gap-3 lg:hidden">
              <CustomConnectButton />

              <Button
                onClick={toggleOpen}
                variant={'outline'}
                size="sm"
                className="z-30"
              >
                {!open ? (
                  <>
                    <span className="sr-only">Open menu</span>

                    <MenuIcon />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Close menu</span>
                    <XIcon />
                  </>
                )}
              </Button>
            </div>
            <div className="hidden md:flex-1 md:items-center md:justify-between lg:flex">
              <Popover.Group as="div" className="flex space-x-10">
                {links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-base font-medium transition hover:text-muted-foreground"
                  >
                    {link.title}
                  </Link>
                ))}

                <Popover>
                  <Popover.Button
                    onClick={toggleViewing}
                    onMouseEnter={() => toggleViewing(true)}
                    onMouseLeave={() => toggleViewing(false)}
                    className={cn(
                      'group inline-flex items-center rounded-md  text-base font-medium transition hover:text-muted-foreground'
                    )}
                  >
                    <p>Explore</p>
                    <svg
                      className={cn(
                        viewing ? 'rotate-180 text-foreground' : '',
                        'group- ml-2 h-5 w-5 transition'
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
                                      <Badge key={i}>{badge}</Badge>
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
        </>
      </Popover>
      <nav
        className={cn(
          'fixed inset-0 bg-background',
          open ? 'flex flex-col' : 'hidden'
        )}
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

        {/* <div className="flex h-full w-full items-center justify-center text-center">
      <Link
        href="/stake"
        onClick={() => {
          close()
          toggleOpen(false)
        }}
      >
        Stake
      </Link>
    </div> */}

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
      </nav>
    </>
  )
}
