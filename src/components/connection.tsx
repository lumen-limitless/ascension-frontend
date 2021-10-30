import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { useEagerConnect, useInactiveListener } from "../hooks/web3hooks";
import { injected } from "../constants/connectors";
import chainData from "../constants/chainData";
import Pill from "./Button/pill";
import Account from "./AccountInfo";
import { LinkIcon, UserIcon } from "@heroicons/react/outline";
import Modal from "./Modal";
import Button from "./Button";
import { shortenAddress } from "../functions";
import { useToggle } from "react-use";

export function ConnectButton(): JSX.Element {
    const { activate } = useWeb3React();

    return (
        <Button color="blue" onClick={() => activate(injected)}>
            Connect to wallet
        </Button>
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
    const [viewingAccount, setViewingAccount] = useToggle(false);
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
                <ConnectButton />
            ) : (
                <>
                    <Pill className={colorsByChain[chainId ?? 1]}>
                        <LinkIcon height="20px" />
                        {chainId ? chainData[chainId].name : "NA"}
                    </Pill>
                    <Pill
                        onClick={() => setViewingAccount(true)}
                        className="bg-gradient-to-r from-ascend-purple  to-ascend-magenta flex"
                    >
                        <UserIcon height="20px" />
                        {account ? shortenAddress(account) : ""}
                    </Pill>
                    {viewingAccount ? (
                        <Modal
                            isOpen={viewingAccount}
                            onDismiss={() => setViewingAccount(false)}
                            className="bg-transparent"
                        >
                            <Account />
                        </Modal>
                    ) : null}
                </>
            )}
        </>
    );
}
