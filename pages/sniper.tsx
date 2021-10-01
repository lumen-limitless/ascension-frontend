import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import Button from "../components/button";
import Section from "../components/section";
import Card from "../components/card";
import chainData from "../utils/chainData";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { useAscendBalance } from "../hooks/useAscendBalance";
import { useBalance } from "../hooks/useBalance";

const SUPPORTED_CHAINS = [1, 4, 56, 42161];
const STATUS: { [key: number]: string } = {
  0: "Paused",
  1: "Searching",
  2: "Buying",
};

export default function Sniper() {
  const { library, account, active, chainId } = useWeb3React();
  const tokenBalance = useAscendBalance();
  const balance = useBalance();
  const [targetInput, setTargetInput] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [amount, setAmount] = useState<string>(".0001");
  const [gas, setGas] = useState<string>("5");
  const [slippage, setSlippage] = useState<number>(50);
  const [listening, setListening] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);
  const [settingTarget, setSettingTarget] = useState(false);

  useEffect(() => {
    if (!active || !SUPPORTED_CHAINS.includes(chainId as number)) {
      return;
    }

    const id = chainId as number;
    const weth = ethers.utils.getAddress(chainData[id].weth.address);
    const factory: ethers.Contract = chainData[id].factory.connect(library.getSigner());
    const router: ethers.Contract = chainData[id].router.connect(library.getSigner());

    if (listening) {
      setStatus(1);
      console.log(`Searching for target(s)
      targets: ${target}
      `);

      factory.on("PairCreated", async (token0, token1, pair) => {
        console.log(`
        ~~~~~~~~~~~~~~~~~~~~
        New Pair Detected
        ~~~~~~~~~~~~~~~~~~~~
        token0: ${token0}
        token1: ${token1}
        pair: ${pair}
        `);

        let buyToken, sellToken;
        if (token0 === weth) {
          buyToken = token0;
          sellToken = token1;
        }
        if (token1 === weth) {
          buyToken = token1;
          sellToken = token0;
        }

        if (typeof buyToken === "undefined") {
          return;
        }

        if (target != "" && sellToken != target) {
          return;
        }

        console.log("Target pair detected, sniping...");

        function timer(ms: number) {
          return new Promise((res) => setTimeout(res, ms));
        }

        for (let i = 0; i <= 3; i++) {
          try {
            const amountIn = ethers.utils.parseUnits(amount);
            const amounts: ethers.BigNumber[] = await router.getAmountsOut(amountIn, [
              buyToken,
              sellToken,
            ]);
            const amountOutMin = amounts[1].sub(amounts[1].mul(slippage).div(100));

            console.log(`
        ~~~~~~~~~~~~~~~~~~~~
        Attempting token swap
        ~~~~~~~~~~~~~~~~~~~~
        buyToken: ${amountIn.toString()} ${buyToken} (WBNB)
        sellToken: ${amountOutMin.toString()} ${sellToken}
        `);

            const overrides = {
              gasPrice: ethers.utils.parseUnits(gas, "gwei"),
              value: ethers.utils.parseUnits(amount, "ether"),
            };
            let tx = await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
              amountOutMin,
              [buyToken, sellToken],
              account,
              Date.now() + 1000 * 60 * 10,
              overrides
            );

            const receipt: TransactionReceipt = await tx.wait();

            if (receipt.status == 1) {
              console.log(`Token swap successful! 
              TX: ${receipt.transactionHash}
              Block: ${receipt.blockNumber}
              Confirmations: ${receipt.confirmations}
              Index: ${receipt.transactionIndex}
              Gas used: ${receipt.gasUsed}
              `);
              setListening(false);
              break;
            } else {
              console.log(`Token swap unsuccessful!
               ${3 - i} tries remaining. Retrying in 30s...`);
              await timer(30000);
              continue;
            }
          } catch (err: any) {
            console.error(err);
            if (err.code && err.code == "4001") {
              console.log("user denied tx, break...");
              break;
            }
            console.log(`
             ${3 - i} tries remaining. Retrying in 30s...
             `);
            await timer(30000);
            continue;
          }
        }
      });
    } else {
      factory.removeAllListeners();

      console.log(`Sniper paused `);
      setStatus(0);
    }
    return function cleanup() {
      factory.removeAllListeners();
    };
  }, [listening, library, chainId, target, account, amount, gas, active, slippage, status]);

  const toggleListener = () => {
    setListening(!listening);
  };

  const updateTarget = () => {
    if (targetInput === null) {
      return;
    }
    if (!ethers.utils.isAddress(targetInput)) {
      alert("invalid target address");
      setTargetInput("");
      return;
    }
    setTarget(ethers.utils.getAddress(targetInput));
    setSettingTarget(false);
  };

  while (!active) {
    return <Section>Connect to web3 first!</Section>;
  }

  while (parseInt(tokenBalance) < 1) {
    return <Section>You must have 1 ASCEND to use this tool!</Section>;
  }

  while (!SUPPORTED_CHAINS.includes(chainId as number)) {
    return <Section>Sniping not yet supported on this chain {chainId}!</Section>;
  }

  return (
    <>
      <Section>
        <Card color="bg-gray-800" w="full" h="2/3">
          <div className="flex  h-full w-full">
            {" "}
            <div className="text-center">
              <svg
                width="128"
                height="128"
                viewBox="0 0 238 238"
                fill={!listening ? "red" : "green"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M119 219C174.228 219 219 174.228 219 119C219 63.7715 174.228 19 119 19C63.7715 19 19 63.7715 19 119C19 174.228 63.7715 219 119 219ZM119 210.795C168.706 210.795 209 169.467 209 118.487C209 67.507 168.706 26.1795 119 26.1795C69.2944 26.1795 29 67.507 29 118.487C29 169.467 69.2944 210.795 119 210.795Z"
                  fill={!listening ? "red" : "green"}
                />
                <rect x="100" width="8" height="25" fill={!listening ? "red" : "green"} />
                <rect
                  x="25"
                  y="100"
                  width="8"
                  height="25"
                  transform="rotate(90 38 115)"
                  fill={!listening ? "red" : "green"}
                />
                <rect
                  x="238"
                  y="115"
                  width="9"
                  height="38"
                  transform="rotate(90 238 115)"
                  fill={!listening ? "red" : "green"}
                />
                <rect x="111" y="200" width="9" height="38" fill={!listening ? "red" : "green"} />
              </svg>
              <h1>{STATUS[status]}</h1>
            </div>
            <div className="flex flex-col m-1">
              <ul className="flex flex-col">
                <li className="flex items-center">
                  Target:{" "}
                  {settingTarget ? (
                    <>
                      <input
                        type="text"
                        value={targetInput}
                        className="text-black"
                        onChange={(e) => {
                          setTargetInput(e.target.value);
                        }}
                      />{" "}
                      <Button color="bg-green-600" onClick={() => updateTarget()}>
                        +
                      </Button>
                      <Button color="bg-red-600" onClick={() => setSettingTarget(false)}>
                        x
                      </Button>
                    </>
                  ) : (
                    <>
                      {target ? target : "ANY"}
                      <Button color="bg-blue-600" onClick={() => setSettingTarget(true)}>
                        Set Target
                      </Button>
                    </>
                  )}
                </li>
                <li className="flex items-center">
                  Buy Amount:{" "}
                  <input
                    type="range"
                    min={0}
                    max={parseFloat(balance)}
                    step={0.0001}
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
                      setSlippage(parseFloat(e.target.value));
                    }}
                  ></input>
                  {slippage}%
                </li>
              </ul>
              <div className="flex">
                <Button color={listening ? "bg-red-600" : "bg-green-600"} onClick={toggleListener}>
                  {listening ? "Stop Sniper" : "Start Sniper"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
