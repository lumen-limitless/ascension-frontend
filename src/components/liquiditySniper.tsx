import React from "react";
import Pill from "./Button/pill";
import Card from "./Card";
import chainData from "../constants/chainData";
import { ConnectButton } from "./connection";
import { useWeb3React } from "@web3-react/core";
import useLiquiditySniper from "../hooks/useLiquiditySniper";
import { useBalance } from "ether-swr";
import { ethers } from "ethers";
import contractsInfo from "../constants/contractsInfo.json";
import useAscend from "../hooks/useAscend";
import Loader from "./Loader";
import Button from "./Button";
import AddressInput from "./Input/Address";
import { useClickAway } from "react-use";
import Input from "./Input";

export default function LiquiditySniper(): JSX.Element {
    const { account, active, chainId } = useWeb3React();
    const {
        SUPPORTED_CHAINS,
        targetInput,
        setTargetInput,
        target,
        resetTarget,
        updateTarget,
        amount,
        setAmount,
        gas,
        setGas,
        slippage,
        setSlippage,
        status,
        toggleStatus,
        settingTarget,
        setSettingTarget,
    } = useLiquiditySniper();
    const { ascendBalance } = useAscend();
    const { data: eth } = useBalance(account as string);

    const STATUS: { [key: number]: string } = {
        0: "Paused",
        1: "Searching",
        2: "Buying",
    };

    return (
        <>
            <Card>
                {!active ? (
                    <>
                        <h1>Connect wallet</h1>
                        <ConnectButton />
                    </>
                ) : !ascendBalance ? (
                    <>
                        <Loader />
                    </>
                ) : parseFloat(ascendBalance) < 1 ? (
                    <>You must have 1 ASCEND to use this tool!</>
                ) : !SUPPORTED_CHAINS.includes(chainId as number) ? (
                    <>Chain not supported: {chainId}</>
                ) : (
                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-col items-center justify-center w-full p-4">
                            <svg
                                width="128"
                                height="128"
                                viewBox="0 0 238 238"
                                className={`fill-current opacity-100 ${
                                    status == 0
                                        ? "text-red"
                                        : status == 1
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
                                <rect x="111" y="200" width="9" height="38" />
                            </svg>
                            <h1>{STATUS[status]}</h1>
                            <Button
                                color={status === 0 ? "green" : "red"}
                                className={`w-2/3`}
                                onClick={() => toggleStatus()}
                            >
                                {status !== 0 ? "Stop Sniper" : "Start Sniper"}
                            </Button>
                        </div>
                        <div className="flex flex-col justify-center m-2 p-2  rounded-xl">
                            <ul className="flex flex-col">
                                <li className="flex items-center">
                                    Target:{" "}
                                    {settingTarget ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <>
                                            {target ? target : "ANY"}
                                            <Pill
                                                className="bg-blue"
                                                onClick={() =>
                                                    setSettingTarget(true)
                                                }
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
                                        max={parseFloat(
                                            ethers.utils.formatEther(eth ?? "1")
                                        )}
                                        step={0.000001}
                                        value={amount}
                                        title="Enter buy amount"
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                        }}
                                    ></input>
                                    {`${amount}
                  ${chainData[chainId ? chainId : 1].symbol}`}
                                </li>
                                <li className="flex items-center">
                                    Gas:{" "}
                                    <input
                                        type="range"
                                        min={0}
                                        max={500}
                                        step={1}
                                        value={gas}
                                        title="Enter gas price"
                                        onChange={(e) => {
                                            setGas(e.target.value);
                                        }}
                                    ></input>
                                    {gas} Gwei
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
