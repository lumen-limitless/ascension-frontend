import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { useToast } from "./useToast";
import { Web3Provider } from "@ethersproject/providers";
import {
    SUSHI_FACTORY_ADDRESS,
    SUSHI_ROUTER_ADDRESS,
    WNATIVE_ADDRESS,
} from "../constants";
import { useContract } from "./useContract";
import { getContract } from "../functions";
import { getAddress } from "@ethersproject/address";

export default function useLiquiditySniper() {
    const { library, account, active, chainId, error } =
        useWeb3React<Web3Provider>();
    const toast = useToast(4000);
    const [targetInput, setTargetInput] = useState<string>("");
    const [target, setTarget] = useState<string>();
    const [amount, setAmount] = useState<string>(".00001");
    const [slippage, setSlippage] = useState<number>(50);
    const [status, setStatus] = useState<
        "buying" | "searching" | "paused" | "error"
    >("paused");
    const [settingTarget, setSettingTarget] = useState(false);

    const factory = useContract(
        SUSHI_FACTORY_ADDRESS[chainId],
        [
            "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
        ],
        chainId
    );

    const router = useContract(
        SUSHI_ROUTER_ADDRESS[chainId],
        IUniswapV2Router02.abi,
        chainId
    );

    useEffect(() => {
        if (!active) {
            toast("error", `${error}`);
            setStatus("error");
            return;
        }

        if (!factory) {
            console.error("Factory is null");
            setStatus("error");
            return;
        }
        if (!router) {
            console.error("router is null");
            setStatus("error");
            return;
        }

        const weth = WNATIVE_ADDRESS[chainId];

        if (status === "searching") {
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

                let buyToken: string | undefined, sellToken: string | undefined;
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

                if (target && sellToken != target) {
                    return;
                }

                const pool = getContract(
                    pair,
                    [
                        "function totalSupply() external view returns (uint256)",
                        "event Mint(address indexed sender, uint amount0, uint amount1) ",
                    ],
                    library
                );

                const totalSupply: BigNumber = await pool
                    .totalSupply()
                    .catch((err) => {
                        toast("error", "Error fetching liquidity info!");
                        console.error(err);
                    });

                if (totalSupply === undefined) {
                    toast("error", "Could not fetch total supply...");
                    if (!target) {
                        return;
                    }
                    setStatus("paused");
                }

                if (parseInt(formatUnits(totalSupply)) === 0) {
                    toast("info", "No liquidity found yet, waiting...");
                    pool.once("Mint", () => {
                        setTarget(getAddress(sellToken));
                        toast(
                            "info",
                            `Liquidity detected for target ${target}, sniping...`
                        );
                        setStatus("buying");
                    });
                } else {
                    setTarget(getAddress(sellToken));
                    toast(
                        "info",
                        `Liquidity detected for target ${target}, sniping...`
                    );
                    setStatus("buying");
                }
            });
        } else if (status === "buying") {
            factory.removeAllListeners();
            const swap = async () => {
                const amountIn = parseUnits(amount);
                const amounts: BigNumber[] = await router.getAmountsOut(
                    amountIn,
                    [weth, target]
                );
                const amountOutMin = amounts[1].sub(
                    amounts[1].mul(slippage).div(100)
                );

                console.log(`
            ~~~~~~~~~~~~~~~~~~~~
            Attempting token swap
            ~~~~~~~~~~~~~~~~~~~~
            buyToken: ${amountIn.toString()} ${weth} (WBNB)
            sellToken: ${amountOutMin.toString()} ${target}
            `);
                toast("info", "Attempting token swap");

                const overrides = {
                    value: ethers.utils.parseUnits(amount, "ether"),
                };
                router.connect(library.getSigner());
                const tx =
                    await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
                        amountOutMin,
                        [weth, target],
                        account,
                        Date.now() + 1000 * 60 * 10,
                        overrides
                    );

                const receipt: TransactionReceipt = await tx.wait();
                console.log(receipt);
                if (receipt.status == 1) {
                    toast(
                        "success",
                        `Token swap successful! 
                  TX: ${receipt.transactionHash}
                  Block: ${receipt.blockNumber}
                  Gas used: ${receipt.gasUsed}
                  `
                    );
                    setStatus("paused");
                    return;
                } else {
                    toast(
                        "error",
                        `Token swap unsuccessful!
                   `
                    );
                    setStatus("paused");
                    return;
                }
            };

            swap().catch((err) => {
                toast("error", `Error during token swap`);
                console.error(err);
                setStatus("paused");
            });
        } else if (status === "paused") {
            factory.removeAllListeners();
            console.log(status);
        }
        return function cleanup() {
            factory.removeAllListeners();
        };
    }, [
        factory,
        router,
        account,
        active,
        amount,
        chainId,
        error,
        library,
        slippage,
        status,
        target,
        toast,
    ]);

    const toggleStatus = () => {
        if (status === "paused") {
            toast("info", "Searching...");
            setStatus("searching");
        } else {
            toast("info", "Paused...");
            setStatus("paused");
        }
    };

    return {
        targetInput,
        setTargetInput,
        target,
        setTarget,

        amount,
        setAmount,

        slippage,
        setSlippage,

        status,
        toggleStatus,
        settingTarget,
        setSettingTarget,
    };
}
