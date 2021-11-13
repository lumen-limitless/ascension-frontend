import React from "react";
import DisconnectButton from "../Button/disconnectButton";
import { useWeb3React } from "@web3-react/core";
import { useAscendBalance, useAscendVoting } from "../../hooks/useAscend";
import Skeleton from "../Skeleton";
import { commify } from "@ethersproject/units";
import { formatBalance, shortenAddress } from "../../functions";
import Pill from "../Button/pill";
import { useToggle } from "react-use";
import { FingerPrintIcon, UserIcon, XIcon } from "@heroicons/react/outline";
import Modal from "../Modal";
import { Web3Provider } from "@ethersproject/providers";
import Avatar from "../Avatar";
import Button from "../Button";

export default function AccountInfo() {
    const { account } = useWeb3React<Web3Provider>();
    const { ascendBalance, sAscendBalance } = useAscendBalance();
    const { totalVotes } = useAscendVoting();
    const [viewing, toggle] = useToggle(false);

    return (
        <>
            <Pill
                onClick={() => toggle(true)}
                className="bg-gradient-to-r from-ascend-purple  to-ascend-magenta flex"
            >
                <UserIcon height="20px" />
                {account ? shortenAddress(account) : ""}
            </Pill>

            {viewing && (
                <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
                    <div className="w-full flex flex-col items-center justify-center">
                        <Avatar />
                        <div className="rounded bg-gray-200 dark:bg-dark-800 m-2 p-2 flex">
                            {shortenAddress(account as string)}
                            <DisconnectButton />
                        </div>
                    </div>

                    <div className="w-full flex items-center">
                        Balance:{" "}
                        {ascendBalance ? (
                            formatBalance(ascendBalance)
                        ) : (
                            <Skeleton />
                        )}{" "}
                        ASCEND
                    </div>
                    <div className="w-full flex items-center">
                        Staked:{" "}
                        {sAscendBalance ? (
                            formatBalance(sAscendBalance)
                        ) : (
                            <Skeleton />
                        )}{" "}
                        ASCEND
                    </div>
                    <div className="w-full flex items-center">
                        Voting Power:{" "}
                        {typeof totalVotes === "number" ? (
                            formatBalance(totalVotes)
                        ) : (
                            <Skeleton />
                        )}{" "}
                        ASCEND
                    </div>
                </Modal>
            )}
        </>
    );
}
