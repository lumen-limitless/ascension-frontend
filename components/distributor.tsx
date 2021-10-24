import React from "react";
import Pill from "./base/buttons/pill";
import Card from "./base/card";
import { ConnectButton } from "./connection";
import { useWeb3React } from "@web3-react/core";
import contractsInfo from "../utils/contractsInfo.json";
import { useDistributor } from "../hooks/useDistributor";
import Skeleton from "./base/skeleton";

export default function Distributor(): JSX.Element {
    const { account, active, chainId } = useWeb3React();
    const { distributionCount } = useDistributor();
    return (
        <>
            <Card className=" ">
                {!active ? (
                    <>
                        <h1>Connect wallet</h1>
                        <ConnectButton />
                    </>
                ) : chainId?.toString() !== contractsInfo.chainId ? (
                    <>Chain not supported: {chainId}</>
                ) : (
                    <div className="flex flex-col h-full w-full">
                        <h1>Token Distributor</h1>
                        <h2>
                            Total Distributions:{" "}
                            {distributionCount ? (
                                parseInt(distributionCount)
                            ) : (
                                <Skeleton />
                            )}
                        </h2>
                        <Pill className="bg-green-600">Withdraw All</Pill>
                    </div>
                )}
            </Card>
        </>
    );
}
