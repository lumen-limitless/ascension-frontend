import Card from "../../../components/Card";
import Head from "next/head";
import React, { useState } from "react";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
    getAddress,
    isAddress,
} from "@usedapp/core/node_modules/ethers/lib/utils";
import { useToast } from "../../../hooks/useToast";
import {
    useAPIASCENDBalance,
    useVerifiedContractABI,
} from "../../../hooks/useAPI";
import { ASCENSION, HOME_CHAINID, USD_ADDRESS } from "../../../constants";
import { ChainId, useEthers } from "@usedapp/core";
import Loader from "../../../components/Loader";
import { Connect } from "../../../components/Connection";
import { parseBalance } from "../../../functions";
import BuyAscend from "../../../components/BuyAscend";

function OptionSelector({
    contract,
    chainId,
    setOptions,
}: {
    contract: string;
    chainId: ChainId;
    setOptions: React.Dispatch<React.SetStateAction<ReactorOptions>>;
}) {
    const contractABI = useVerifiedContractABI(contract, chainId);
    const [event, setEvent] = useState<string>("");
    const [func, setFunc] = useState(null);
    const [args, setArgs] = useState<any[] | null>(null);

    console.log(contractABI);
    if (!contractABI) return <Loader />;
    if (contractABI.length === 0)
        return <Loader message={`No valid ABI found for ${contract}`} />;
    return (
        <>
            {!event && (
                <>
                    <h1>Select an event to listen for</h1>
                    <div className="flex gap-3 flex-col  p-4">
                        {contractABI.map((f, i) => {
                            if (f.type == "event") {
                                return (
                                    <Button
                                        key={i}
                                        color="blue"
                                        onClick={() => setEvent(f.name)}
                                    >
                                        {f.name}
                                    </Button>
                                );
                            }
                        })}
                    </div>
                </>
            )}
            {event && !func && !args && (
                <>
                    <h1>Select a function to call</h1>
                    <div className="flex gap-3 flex-col  p-4">
                        {contractABI.map((f, i) => {
                            if (
                                f.type == "function" &&
                                [
                                    f.stateMutability == "payable",
                                    f.stateMutability == "nonpayable",
                                ].includes(true)
                            ) {
                                return (
                                    <Button
                                        key={i}
                                        color="blue"
                                        onClick={() => setFunc(f)}
                                    >
                                        {f.name}
                                    </Button>
                                );
                            }
                        })}
                    </div>
                </>
            )}
            {event && func && (
                <>
                    <h1>Enter arguments for function</h1>
                    <div className="flex gap-3 flex-col  p-4">
                        {func.inputs.map((input, i) => {
                            if (input.type === "address") {
                                return (
                                    <Button key={i} color="blue">
                                        sdsd
                                    </Button>
                                );
                            }
                            if (input.type === "uint256") {
                                return (
                                    <Button key={i} color="blue">
                                        sds
                                    </Button>
                                );
                            }
                        })}
                    </div>
                </>
            )}
        </>
    );
}

export interface ReactorOptions {
    set: boolean;
    event: string;
    function: string;
    args: any[];
}
export default function ReactorPage() {
    const supportedChainId = [1, 137, 56, 42161];
    const { account, chainId } = useEthers();
    const [address, setAddress] = useState<string>("");
    const [options, setOptions] = useState<ReactorOptions>({
        set: false,
        event: "",
        function: "",
        args: [],
    });
    const [input, setInput] = useState<string>("");
    const toast = useToast();
    const ascendBalance = useAPIASCENDBalance(account);

    if (!account) return <Connect />;
    if (!chainId || !ascendBalance)
        return <Loader message="Loading chain data" />;
    if (ascendBalance && parseBalance(ascendBalance) < 100)
        return <BuyAscend />;
    if (!supportedChainId.includes(chainId))
        return <Loader message="Chain ID not supported!" />;
    return (
        <>
            <Head>
                <title>Ascension Reactor | Ascension Protocol</title>
                <meta
                    key="description"
                    name="description"
                    content="Ascension Protocol reactor"
                />
            </Head>
            <Container maxWidth="5xl">
                <Card header={<></>}>
                    {!address && (
                        <div className="flex flex-col gap-3">
                            <h1>Enter an address</h1>
                            <Input.Address
                                value={input}
                                onUserInput={(input) => {
                                    setInput(input);
                                }}
                            ></Input.Address>
                            <Button
                                color="blue"
                                disabled={isAddress(input) ? false : true}
                                onClick={() => {
                                    if (!isAddress(input)) {
                                        toast(
                                            "error",
                                            "Input is not a valid address!"
                                        );
                                        return;
                                    }
                                    setAddress(getAddress(input));
                                    setInput("");
                                }}
                            >
                                Test
                            </Button>
                        </div>
                    )}

                    {address && !options.set && (
                        <OptionSelector
                            contract={address}
                            chainId={chainId}
                            setOptions={setOptions}
                        />
                    )}
                </Card>
            </Container>
        </>
    );
}
