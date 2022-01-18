import React, { useState, useRef } from "react";
import Head from "next/head";
import { BackspaceIcon, ExclamationIcon } from "@heroicons/react/outline";
import Container from "../../../components/Container";
import Button from "../../../components/Button";

import { useWeb3React } from "@web3-react/core";

import Loader from "../../../components/Loader";
import { useToast } from "../../../hooks/useToast";
import useLiquiditySniper from "../../../hooks/useLiquiditySniper";
import { useAscendBalance } from "../../../hooks/useAscend";
import useBalance from "../../../hooks/useBalance";
import { useClickAway, useToggle } from "react-use";
import { capitalize, isAddress } from "../../../functions";
import { getAddress } from "ethers/lib/utils";
import Card from "../../../components/Card";
import { Connect } from "../../../components/Connection";
import BuyAscend from "../../../components/BuyAscend";
import Input from "../../../components/Input";
import Pill from "../../../components/Button/pill";
import { CHAIN_SYMBOL } from "../../../constants";

function LiquiditySniper() {
    const { active, chainId } = useWeb3React();
    const toast = useToast(4000);
    const {
        targetInput,
        setTargetInput,
        setTarget,
        target,
        amount,
        setAmount,
        slippage,
        setSlippage,
        status,
        toggleStatus,
    } = useLiquiditySniper();
    const { totalBalance } = useAscendBalance();
    const { balance } = useBalance();
    const [settingTarget, toggle] = useToggle(false);
    const ref = useRef();
    useClickAway(ref, () => toggle(false));

    const updateTarget = () => {
        if (targetInput === null) {
            return;
        }
        if (!isAddress(targetInput)) {
            toast("error", "Invalid target address");
            setTargetInput("");
            return;
        }
        setTarget(getAddress(targetInput));
        toggle(false);
    };

    const resetTarget = () => {
        setTarget("");
        toggle(false);
    };
    return (
        <>
            <Card>
                {!active ? (
                    <>
                        <h1>Connect wallet</h1>
                        <Connect />
                    </>
                ) : !totalBalance && typeof totalBalance !== "number" ? (
                    <>
                        <Loader />
                    </>
                ) : totalBalance < 1 ? (
                    <>
                        <BuyAscend />
                    </>
                ) : (
                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-col items-center justify-center w-full p-4">
                            {status === "error" ? (
                                <>
                                    <ExclamationIcon
                                        width="128"
                                        height="128"
                                        color="yellow"
                                    />
                                </>
                            ) : (
                                <svg
                                    width="128"
                                    height="128"
                                    viewBox="0 0 238 238"
                                    className={`fill-current opacity-100 ${
                                        status == "paused"
                                            ? "text-red"
                                            : status == "searching"
                                            ? "text-yellow animate-pulse"
                                            : "text-green animate-bounce"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M119 219C174.228 219 219 174.228 219 119C219 63.7715 174.228 19 119 19C63.7715 19 19 63.7715 19 119C19 174.228 63.7715 219 119 219ZM119 210.795C168.706 210.795 209 169.467 209 118.487C209 67.507 168.706 26.1795 119 26.1795C69.2944 26.1795 29 67.507 29 118.487C29 169.467 69.2944 210.795 119 210.795Z"
                                    />
                                    <rect x="115" width="9" height="38" />
                                    <rect
                                        x="38"
                                        y="115"
                                        width="9"
                                        height="38"
                                        transform="rotate(90 38 115)"
                                    />
                                    <rect
                                        x="238"
                                        y="115"
                                        width="9"
                                        height="38"
                                        transform="rotate(90 238 115)"
                                    />
                                    <rect
                                        x="111"
                                        y="200"
                                        width="9"
                                        height="38"
                                    />
                                </svg>
                            )}

                            <h1>{capitalize(status)}</h1>
                            <Button
                                color={status === "paused" ? "green" : "red"}
                                className={`w-2/3`}
                                onClick={() => toggleStatus()}
                                disabled={status === "error" ? true : false}
                            >
                                {status == "paused"
                                    ? "Start Sniper"
                                    : status == "error"
                                    ? "Error"
                                    : "Stop Sniper"}
                            </Button>
                        </div>
                        <div className="flex flex-col justify-center m-2 p-2  rounded-xl">
                            <ul className="flex flex-col">
                                <li className="flex items-center">
                                    Target:{" "}
                                    {settingTarget ? (
                                        <div ref={ref}>
                                            <Input.Address
                                                value={targetInput}
                                                onUserInput={setTargetInput}
                                            />

                                            <Pill
                                                className="bg-green"
                                                onClick={() => updateTarget()}
                                            >
                                                update
                                            </Pill>
                                            <Pill
                                                className="bg-red"
                                                onClick={() => resetTarget()}
                                            >
                                                reset
                                            </Pill>
                                        </div>
                                    ) : (
                                        <>
                                            {target ? target : "ANY"}
                                            <Pill
                                                className="bg-blue"
                                                onClick={() => toggle(true)}
                                            >
                                                Set Target
                                            </Pill>
                                        </>
                                    )}
                                </li>
                                <li className="flex items-center">
                                    Buy Amount:{" "}
                                    <input
                                        type="range"
                                        min={0}
                                        max={balance ?? 0}
                                        step={0.000001}
                                        value={amount}
                                        title="Enter buy amount"
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                        }}
                                    ></input>
                                    {`${amount}
                  ${chainId && CHAIN_SYMBOL[chainId]}`}
                                </li>
                                <li className="flex items-center">
                                    Slippage:{" "}
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={slippage}
                                        title="Enter slippage"
                                        onChange={(e) => {
                                            setSlippage(
                                                parseFloat(e.target.value)
                                            );
                                        }}
                                    ></input>
                                    {slippage}%
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </Card>
        </>
    );
}

export default function LiquiditySniperPage() {
    return (
        <>
            <Head>
                <title>Liquidity Sniper | Ascension Protocol</title>
                <meta
                    key="description"
                    name="description"
                    content="Ascension Protocol tools"
                />
            </Head>
            <Container maxWidth="2xl">
                <LiquiditySniper />
            </Container>
        </>
    );
}
