import React from "react";
import DisconnectButton from "../../DisconnectButton";
import Skeleton from "../Skeleton";
import { formatBalance } from "../../functions";
import { useToggle } from "react-use";
import Modal from "../Modal";
import Avatar from "../Avatar";
import Button from "../Button";
import { shortenIfAddress, useEthers, useLookupAddress } from "@usedapp/core";
import { useStakedASCENDBalance } from "../../hooks/useASCEND";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useAPIASCENDBalance } from "../../hooks/useAPI";

export default function AccountInfo() {
    const { account } = useEthers();
    const ens = useLookupAddress();
    const ascendBalance = useAPIASCENDBalance(account);
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
                        <div className="rounded bg-gray-200 dark:bg-dark-800 m-2 p-2 flex gap-1 justify-center items-center">
                            {ens ?? shortenIfAddress(account)}{" "}
                            <a
                                about="View on block explorer"
                                className="px-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://etherscan.io/address/0x369d1C11b4E520223Eb8694961c9D11dC423Dd45"
                            >
                                <ExternalLinkIcon
                                    width={20}
                                    className="stroke-current text-blue"
                                />
                            </a>
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
                    {/* <div className="w-full flex items-center">
                        Staked:{" "}
                        {sAscendBalance ? (
                            formatBalance(sAscendBalance)
                        ) : (
                            <Skeleton />
                        )}{" "}
                        ASCEND
                    </div> */}
                </Modal>
            )}
        </>
    );
}
