import React from "react";
import { walletconnect } from "../../constants/connectors";
import { LinkIcon } from "@heroicons/react/outline";
import Button from "../Button";
import AccountInfo from "../AccountInfo";
import { CHAIN_NAME } from "../../constants";
import { useToggle } from "react-use";
import Modal from "../Modal";
import { classNames } from "../../functions";
import { useEthers } from "@usedapp/core";
import useNotificationsToast from "../../hooks/useNotificationsToast";
import { useToast } from "../../hooks/useToast";

export function Connect() {
    const { activateBrowserWallet, activate } = useEthers();
    const [viewing, toggle] = useToggle(false);
    const toast = useToast(4000);

    return (
        <>
            <Button color="blue" onClick={() => toggle(true)}>
                Connect Wallet
            </Button>

            <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
                <h1>Select a Wallet</h1>

                <div className="flex flex-col h-full">
                    <Button
                        color="gray"
                        onClick={() => activateBrowserWallet()}
                        className="my-2"
                    >
                        MetaMask
                    </Button>

                    <Button
                        color="gray"
                        onClick={() =>
                            activate(walletconnect).catch((err) => {
                                console.error(
                                    `error while attempting to connect: ${err}`
                                );
                                toast("error", "Unable to connect to wallet");
                            })
                        }
                        className="my-2"
                    >
                        WalletConnect
                    </Button>
                </div>
            </Modal>
        </>
    );
}

const colorsByChain: { [key: number]: string } = {
    1: "bg-blue",
    4: "bg-yellow",
    56: "bg-[#A6810C]",
    421611: "bg-[#28A0F0]",
    42161: "bg-[#28A0F0]",
    31337: "bg-black",
    137: "bg-[#915DE8]",
    43114: "bg-[#E84142]",
};

export default function Connection() {
    const { account, chainId } = useEthers();
    useNotificationsToast();

    return (
        <>
            {!account ? (
                <Connect />
            ) : (
                <>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outlined"
                            className={classNames(colorsByChain[chainId ?? 1])}
                        >
                            <LinkIcon height="16px" />
                            {chainId && CHAIN_NAME[chainId]}
                        </Button>
                        <AccountInfo />
                    </div>
                </>
            )}
        </>
    );
}
