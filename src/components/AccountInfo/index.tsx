import React from "react";
import DisconnectButton from "../Button/disconnectButton";
import { useWeb3React } from "@web3-react/core";
import useAscend from "../../hooks/useAscend";
import Skeleton from "../../Skeleton";
import { commify } from "@ethersproject/units";
import { shortenAddress } from "../../functions";
import useBalance from "../../hooks/useBalance";

export default function AccountInfo() {
    const { account } = useWeb3React();
    const { tokenBalance, stakedTokenBalance } = useAscend();
    return (
        <>
            <DisconnectButton className="absolute top-2 right-2" />

            <div className="w-full flex items-center">
                Account: {shortenAddress(account as string)}
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
                {stakedTokenBalance ? (
                    commify(parseFloat(stakedTokenBalance).toFixed(2))
                ) : (
                    <Skeleton />
                )}{" "}
                ASCEND
            </div>
        </>
    );
}
