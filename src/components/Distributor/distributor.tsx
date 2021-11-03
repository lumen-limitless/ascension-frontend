import React from "react";
import Card from "../Card";
import { ConnectButton } from "../Connection";
import { useWeb3React } from "@web3-react/core";
import contractsInfo from "../../constants/contractsInfo.json";
import Button from "../Button";

export default function Distributor(): JSX.Element {
    const { account, active, chainId } = useWeb3React();

    return (
        <>
            <Card className=" ">
                {!active ? (
                    <>
                        <ConnectButton />
                    </>
                ) : chainId?.toString() !== contractsInfo.chainId ? (
                    <>Chain not supported: {chainId}</>
                ) : (
                    <div className="flex flex-col h-full w-full">
                        <h1>Token Distributor</h1>
                        <h2>Total Distributions: </h2>
                        <Button color="green" type="submit">
                            Withdraw All
                        </Button>
                    </div>
                )}
            </Card>
        </>
    );
}
