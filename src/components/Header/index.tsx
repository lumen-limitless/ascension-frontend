import React, { useRef } from 'react'
import Connection from '../Connection'
import Nav from '../Nav'
import Logo from '../Logo'
import { useClickAway, useEffectOnce, useToggle } from 'react-use'
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import Button from '../Button'
import Popover from '../Popover'
import { useTheme } from 'next-themes'
export default function Header() {
  const [viewing, toggleViewing] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => toggleViewing(false))

  return (
    <>
      <header
        ref={ref}
        className="fixed z-20 flex min-h-[60px]  w-full flex-col items-center justify-center border-b    border-dark-600 bg-dark-1000   px-3 py-1"
      >
        <div className="flex h-full w-full  items-center">
          <Logo />

          <Nav className="hidden md:flex" />
          <div className="ml-auto flex ">
            <Connection />
          </div>

          <Button key="navbutton" id="navbutton" size="default" onClick={toggleViewing} className={`md:hidden`}>
            {viewing ? <XIcon height="24px" /> : <MenuAlt2Icon height="24px" />}
          </Button>
        </div>
        {viewing && (
          <>
            <Popover show={viewing} content>
              <div className="flex h-2/3 w-full">
                <Nav />
              </div>
            </Popover>
          </>
        )}
      </header>
    </>
  )
}
