import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { useEagerConnect, useInactiveListener } from "../hooks/web3hooks";
import { injected } from "../utils/connectors";
import chainData from "../utils/chainData";
import Pill from "./base/buttons/pill";
import Modal from "./base/modal";
import Account from "./account";
import { shorter } from "../utils/helpers";

export function ConnectButton(): JSX.Element {
    const { activate } = useWeb3React();
    return (
        <Pill className="bg-blue-600" onClick={() => activate(injected)}>
            Connect
        </Pill>
    );
}

const colorsByChain: { [key: number]: string } = {
    1: "bg-blue-500",
    4: "bg-yellow-500",
    56: "bg-[#A6810C]",
    421611: "bg-[#28A0F0]",
    42161: "bg-[#28A0F0]",
    31337: "bg-black",
    137: "bg-[#915DE8]",
    43114: "bg-[#E84142]",
};

export default function Connection() {
    const { active, account, connector, chainId } = useWeb3React();
    const [viewingAccount, setViewingAccount] = useState(false);
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
                        {chainId ? chainData[chainId].name : "NA"}
                    </Pill>
                    <Pill
                        onClick={() => setViewingAccount(true)}
                        className="bg-gradient-to-r from-indigo-700  to-purple-700 flex"
                    >
                        {account ? shorter(account) : ""}
                    </Pill>
                    {viewingAccount ? (
                        <Modal
                            onExit={() => setViewingAccount(false)}
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
