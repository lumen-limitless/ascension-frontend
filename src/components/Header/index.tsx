<<<<<<< HEAD
import React, { useRef, useEffect } from "react";
import Connection from "../Connection";
import Nav from "../Nav";
import Logo from "../Logo";
import { useClickAway, useToggle } from "react-use";
import useAddTokenToMetaMask from "../../hooks/useAddTokenToMetamask";
import DarkModeButton from "../Button/themeButton";
import contractsInfo from "../../constants/contractsInfo.json";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import Button from "../Button";
import Popover from "../Popover";
import { useTheme } from "next-themes";
export default function Header() {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("dark");
    });

    const [viewing, toggleViewing] = useToggle(false);
    const ref = useRef(null);
    useClickAway(ref, () => toggleViewing(false));
    const { addToken } = useAddTokenToMetaMask(
        contractsInfo.contracts.AscensionToken.address
    );
    return (
        <>
            <header
                ref={ref}
                className="flex flex-col w-full px-4 py-1 justify-between items-center  border-b border-gray-400 dark:border-dark-600   bg-white dark:bg-dark-1000"
            >
                <div className="w-full h-full flex  items-center">
                    <button onClick={addToken}>
                        <Logo />
                    </button>
                    <Nav className="hidden md:flex" />
                    <div className="flex ml-auto ">
                        <Connection />
                    </div>

                    <Button
                        key="navbutton"
                        id="navbutton"
                        size="xs"
                        onClick={toggleViewing}
                        className={`md:hidden`}
                    >
                        {viewing ? (
                            <XIcon height="20px" />
                        ) : (
                            <MenuAlt2Icon height="20px" />
                        )}
                    </Button>
                </div>{" "}
                {viewing && (
                    <>
                        <Popover show={viewing} content>
                            <div className="h-2/3 w-full flex">
                                <Nav />
                            </div>
                        </Popover>
                    </>
                )}
            </header>
        </>
    );
=======
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
  const { setTheme } = useTheme()

  //temporarily set theme dark until we sort out terrible looking light mode
  useEffectOnce(() => {
    setTheme('dark')
  })

  const [viewing, toggleViewing] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => toggleViewing(false))

  return (
    <>
      <header
        ref={ref}
        className="flex w-full flex-col items-center justify-between border-b border-gray-400  bg-white px-4 py-1   dark:border-dark-600 dark:bg-dark-1000"
      >
        <div className="flex h-full w-full  items-center">
          <Logo />

          <Nav className="hidden md:flex" />
          <div className="ml-auto flex ">
            <Connection />
          </div>

          <Button key="navbutton" id="navbutton" size="default" onClick={toggleViewing} className={`md:hidden`}>
            {viewing ? <XIcon height="20px" /> : <MenuAlt2Icon height="20px" />}
          </Button>
        </div>{' '}
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
>>>>>>> canary
}
