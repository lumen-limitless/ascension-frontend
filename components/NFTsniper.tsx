import React from "react";
import Pill from "../components/base/pill";
import Card from "../components/base/card";
import chainData from "../utils/chainData";
import { ConnectButton } from "./connection";
import { useWeb3React } from "@web3-react/core";
import useNFTSniper from "../hooks/useNFTSniper";
import { ethers } from "ethers";
import useAscend from "../hooks/useAscend";

export default function NFTSniper(): JSX.Element {
  const { account, active, chainId } = useWeb3React();
  const {
    SUPPORTED_CHAINS,
    target,
    updateTarget,
    targetInput,
    setTargetInput,
    status,
    toggleStatus,
    settingTarget,
    setSettingTarget,
  } = useNFTSniper();
  const { ascendBalance } = useAscend();

  const STATUS: { [key: number]: string } = {
    0: "Paused",
    1: "Searching",
    2: "Buying",
  };

  return (
    <>
      <Card className="bg-gray-800 w-full ">
        {!active ? (
          <>
            <h1>Connect wallet</h1>
            <ConnectButton />
          </>
        ) : !ascendBalance ? (
          <>Loading...</>
        ) : parseFloat(ascendBalance) < 1 ? (
          <h1>You must have 1 ASCEND to use this tool!</h1>
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
                    ? "text-red-600"
                    : status == 1
                    ? "text-yellow-600 animate-pulse"
                    : "text-green-600 animate-bounce"
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M119 219C174.228 219 219 174.228 219 119C219 63.7715 174.228 19 119 19C63.7715 19 19 63.7715 19 119C19 174.228 63.7715 219 119 219ZM119 210.795C168.706 210.795 209 169.467 209 118.487C209 67.507 168.706 26.1795 119 26.1795C69.2944 26.1795 29 67.507 29 118.487C29 169.467 69.2944 210.795 119 210.795Z"
                />
                <rect x="115" width="9" height="38" />
                <rect x="38" y="115" width="9" height="38" transform="rotate(90 38 115)" />
                <rect x="238" y="115" width="9" height="38" transform="rotate(90 238 115)" />
                <rect x="111" y="200" width="9" height="38" />
              </svg>
              <h1>{STATUS[status]}</h1>
              <Pill className={status !== 0 ? "bg-red-600" : "bg-green-600"} onClick={toggleStatus}>
                {status !== 0 ? "Stop Sniper" : "Start Sniper"}
              </Pill>
            </div>
            <div className="flex flex-col justify-center m-2 p-2 border-2  border-gray-400 rounded-xl">
              <ul className="flex flex-col">
                <li className="flex items-center">
                  Target:{" "}
                  {settingTarget ? (
                    <>
                      <input
                        type="text"
                        value={targetInput}
                        className="text-black rounded w-48"
                        onChange={(e) => {
                          setTargetInput(e.target.value);
                        }}
                      />{" "}
                      <Pill className="bg-green-600" onClick={() => updateTarget()}>
                        +
                      </Pill>
                      <Pill className="bg-red-600" onClick={() => setSettingTarget(false)}>
                        x
                      </Pill>
                    </>
                  ) : (
                    <>
                      {target ?? "ANY"}
                      <Pill className="bg-blue-600" onClick={() => setSettingTarget(true)}>
                        Set Target
                      </Pill>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
