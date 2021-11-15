import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { useEagerConnect, useInactiveListener } from "../../hooks/web3hooks";
import { injected, walletconnect } from "../../constants/connectors";
import Pill from "../Button/pill";
import { LinkIcon } from "@heroicons/react/outline";
import Button from "../Button";
import AccountInfo from "../AccountInfo";
import { CHAIN_NAME } from "../../constants";
import { useToggle } from "react-use";
import Modal from "../Modal";
import { useToast } from "../../hooks/useToast";
import { classNames } from "../../functions";

export function Connect() {
    const { activate, error } = useWeb3React();
    const [viewing, toggle] = useToggle(false);
    const toast = useToast(4000);

    const onConnect = async (connector: any) => {
        await activate(connector);
        if (error) toast("error", `${error}`);
    };
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
                        onClick={() => onConnect(injected)}
                        className="my-2"
                    >
                        MetaMask
                    </Button>

                    <Button
                        color="gray"
                        onClick={() => onConnect(walletconnect)}
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
    const { active, account, connector, chainId } = useWeb3React();
    const [activatingConnector, setActivatingConnector] = useState();
    const triedEager = useEagerConnect();

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    useInactiveListener(!triedEager || !activatingConnector);

    return (
        <>
            {!active ? (
                <Connect />
            ) : (
                <>
                    <Pill className={classNames(colorsByChain[chainId ?? 1])}>
                        <div className="flex">
                            <LinkIcon height="20px" />
                            {chainId && CHAIN_NAME[chainId]}
                        </div>
                    </Pill>
                    <AccountInfo />
                </>
            )}
        </>
    );
}
