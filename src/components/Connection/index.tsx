import React from "react";
import { walletconnect } from "../../constants/connectors";
import { LinkIcon } from "@heroicons/react/outline";
import Button from "../Button";
import AccountInfo from "../AccountInfo";
import { CHAIN_IMG, CHAIN_NAME } from "../../constants";
import { useToggle } from "react-use";
import Modal from "../Modal";
import { classNames } from "../../functions";
import { useEthers } from "@usedapp/core";
import useNotificationsToast from "../../hooks/useNotificationsToast";
import { useToast } from "../../hooks/useToast";
import Image from "next/image";
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

                <div className="flex flex-col gap-3 my-3 h-full">
                    <Button
                        color="gray"
                        onClick={() => activateBrowserWallet()}
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
                            {chainId && (
                                <Image
                                    placeholder="empty"
                                    width={24}
                                    height={24}
                                    src={CHAIN_IMG[chainId ?? 1]}
                                    alt={CHAIN_NAME[chainId ?? 1]}
                                ></Image>
                            )}
                        </Button>
                        <AccountInfo />
                    </div>
                </>
            )}
        </>
    );
}
