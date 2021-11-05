import React from "react";
import DisconnectButton from "../Button/disconnectButton";
import { useWeb3React } from "@web3-react/core";
import { useAscendBalance } from "../../hooks/useAscend";
import Skeleton from "../Skeleton";
import { commify } from "@ethersproject/units";
import { shortenAddress } from "../../functions";
import Pill from "../Button/pill";
import { useToggle } from "react-use";
import { UserIcon, XIcon } from "@heroicons/react/outline";
import Modal from "../Modal";
import { Web3Provider } from "@ethersproject/providers";

export default function AccountInfo() {
    const { account } = useWeb3React<Web3Provider>();
    const { tokenBalance, stakedBalance } = useAscendBalance();
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
                    <div className="w-full flex items-center">
                        Account: {shortenAddress(account as string)}
                        <DisconnectButton />
                    </div>
                    <div className="w-full flex items-center">
                        Balance:{" "}
                        {tokenBalance ? (
                            commify(parseFloat(tokenBalance).toFixed(2))
                        ) : (
                            <Skeleton />
                        )}{" "}
                        ASCEND
                    </div>
                    <div className="w-full flex items-center">
                        Staked:{" "}
                        {stakedBalance ? (
                            commify(parseFloat(stakedBalance).toFixed(2))
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
