import React, { useRef } from "react";
import Connection from "../Connection";
import Nav from "../Nav";
import Logo from "../logo";
import { useToggle } from "react-use";
import useAddTokenToMetaMask from "../../hooks/useAddTokenToMetamask";
import DarkModeButton from "../Button/themeButton";
import Modal from "../Modal";
import contractsInfo from "../../constants/contractsInfo.json";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import Button from "../Button";
export default function Header() {
    const [viewing, toggleViewing] = useToggle(false);

    const { addToken } = useAddTokenToMetaMask(
        contractsInfo.contracts.AscensionToken.address
    );
    return (
        <>
            <header className="flex flex-col w-full px-4 py-1 justify-between items-center md:text-xl border-b border-gray-400 dark:border-dark-600">
                <div className="w-full h-full flex  items-center">
                    <button onClick={addToken}>
                        <Logo />
                    </button>
                    <Nav />
                    <div className="flex ml-auto ">
                        <Connection />
                    </div>

                    <DarkModeButton />

                    <Button
                        key="navbutton"
                        id="navbutton"
                        size="xs"
                        onClick={toggleViewing}
                        className={`md:hidden`}
                    >
                        <MenuAlt2Icon height="20px" />
                    </Button>
                </div>
            </header>
            {viewing && (
                <>
                    <Modal
                        isOpen={viewing}
                        onDismiss={() => toggleViewing(false)}
                    >
                        <div className="h-2/3 flex">
                            <Nav isMobile={true} />
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}
