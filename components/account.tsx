import React from "react";
import Card from "./base/card";
import DisconnectButton from "./base/buttons/disconnectButton";
import { useWeb3React } from "@web3-react/core";
import { shorter } from "../utils/helpers";
import useAscend from "../hooks/useAscend";
import Skeleton from "./base/skeleton";
import { commify } from "@ethersproject/units";

export default function Account() {
    const { account } = useWeb3React();
    const { ascendBalance } = useAscend();
    return (
        <Card>
            <DisconnectButton className="absolute top-2 right-2" />

            <div className="w-full flex items-center">
                Account: {shorter(account as string)}
            </div>
            <div className="w-full flex items-center">
                Balance: {ascendBalance ? commify(ascendBalance) : <Skeleton />}
            </div>
        </Card>
    );
}
