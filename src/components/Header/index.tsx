import React, { useRef } from "react";
import Connection from "../Connection";
import Nav from "../Nav";
import Logo from "../Logo";
import { useClickAway, useEffectOnce, useToggle } from "react-use";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import Button from "../Button";
import Popover from "../Popover";
import { useTheme } from "next-themes";
export default function Header() {
    const { setTheme } = useTheme();

    //temporarily set theme dark until we sort out terrible looking light mode
    useEffectOnce(() => {
        setTheme("dark");
    });

    const [viewing, toggleViewing] = useToggle(false);
    const ref = useRef(null);
    useClickAway(ref, () => toggleViewing(false));

    return (
        <>
            <header
                ref={ref}
                className="flex flex-col w-full px-4 py-1 justify-between items-center  border-b border-gray-400 dark:border-dark-600   bg-white dark:bg-dark-1000"
            >
                <div className="w-full h-full flex  items-center">
                    <Logo />

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
}
