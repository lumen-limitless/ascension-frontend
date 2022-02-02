import React from "react";
import DisconnectButton from "../Button/disconnectButton";
import Skeleton from "../Skeleton";
import { formatBalance } from "../../functions";
import { useToggle } from "react-use";
import Modal from "../Modal";
import Avatar from "../Avatar";
import Button from "../Button";
import { shortenIfAddress, useEthers, useLookupAddress } from "@usedapp/core";
import {
    useASCENDBalance,
    useStakedASCENDBalance,
} from "../../hooks/useASCEND";

export default function AccountInfo() {
    const { account } = useEthers();
    const ens = useLookupAddress();
    const ascendBalance = useASCENDBalance(account);
    const sAscendBalance = useStakedASCENDBalance(account);

    const [viewing, toggle] = useToggle(false);

    return (
        <>
            <Button
                size="sm"
                color="gray"
                variant="outlined"
                onClick={() => toggle(true)}
            >
                <Avatar size={16} />
                {ens ?? shortenIfAddress(account)}
            </Button>

            {viewing && (
                <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
                    <div className="w-full flex flex-col items-center justify-center">
                        <Avatar />
                        <div className="rounded bg-gray-200 dark:bg-dark-800 m-2 p-2 flex">
                            {ens ?? shortenIfAddress(account)}
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
                </Modal>
            )}
        </>
    );
}
