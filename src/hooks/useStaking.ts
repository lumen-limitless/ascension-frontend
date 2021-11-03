import { useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useContract } from "./useContract";
import contractsInfo from "../constants/contractsInfo.json";
import { useToast } from "./useToast";
import { commify, formatUnits, parseUnits } from "@ethersproject/units";
import useMulticall from "./useMulticall";
import { ContractCallContext } from "ethereum-multicall";
import { ASCENSION, RPC_URL, ZERO_ADDRESS } from "../constants";

export default function useStaking() {
    const { account, active, chainId, library } = useWeb3React();
    const toast = useToast(4000);

    const staking = useContract(
        ASCENSION.AscensionStaking.address,
        ASCENSION.AscensionStaking.abi
    );

    const calls: ContractCallContext[] = useMemo(() => {
        return [
            {
                reference: "AscensionStaking",
                contractAddress: ASCENSION.AscensionStaking.address,
                abi: ASCENSION.AscensionStaking.abi,
                calls: [
                    {
                        reference: "",
                        methodName: "totalStaked",
                        methodParameters: [],
                    },
                    {
                        reference: "",
                        methodName: "periodFinish",
                        methodParameters: [],
                    },
                    {
                        reference: "",
                        methodName: "balanceOf",
                        methodParameters: [account ?? ZERO_ADDRESS],
                    },
                    {
                        reference: "",
                        methodName: "earned",
                        methodParameters: [account ?? ZERO_ADDRESS],
                    },
                    {
                        reference: "",
                        methodName: "rewardRate",
                        methodParameters: [],
                    },
                ],
            },
        ];
    }, [account]);

    const { result } = useMulticall(calls);

    const rewardsEndAt = useMemo(() => {
        return result
            ? ethers.BigNumber.from(
                  result.results["AscensionStaking"].callsReturnContext[1]
                      .returnValues[0]
              ).toNumber()
            : undefined;
    }, [result]);

    const apy = useMemo(() => {
        if (!result) return null;

        const rewardRate = parseFloat(
            formatUnits(
                result.results["AscensionStaking"].callsReturnContext[4]
                    .returnValues[0].hex,
                "18"
            )
        );

        const totalStaked = parseFloat(
            formatUnits(
                result.results["AscensionStaking"].callsReturnContext[0]
                    .returnValues[0]
            )
        );

        const i = (rewardRate * 31557600) / totalStaked;

        return ((Math.pow(1 + i / 31557600, 31557600) - 1) * 100).toPrecision(
            4
        );
    }, [result]);

    async function stake(amount: string) {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR");
            return;
        }
        if (amount) {
            try {
                const tx = await staking
                    .connect(library.getSigner())
                    .stake(parseUnits(amount));
                const receipt = await tx.wait();
                console.log(receipt);
                toast("success", "Tokens staked successfully");
            } catch (err) {
                console.error(err);
                toast("error", "Error staking tokens");
            }
        }
    }
    async function withdraw(amount: string) {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR");
            return;
        }
        if (amount) {
            try {
                const tx = await staking
                    .connect(library.getSigner())
                    .withdraw(parseUnits(amount));
                const receipt = await tx.wait();
                console.log(receipt);
                toast("success", "Tokens withdrawn succesfully");
            } catch (err) {
                console.error(err);
                toast("error", "Error withdrawing tokens");
            }
        }
    }
    async function exit() {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR");
            return;
        }
        try {
            const tx = await staking.connect(library.getSigner()).exit();
            const receipt = await tx.wait();
            console.log(receipt);
            toast("success", "Exited staking successfully");
        } catch (err) {
            console.error(err);
            toast("error", "Error exiting staking");
        }
    }

    async function getReward() {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR");
            return;
        }
        try {
            const tx = await staking.connect(library.getSigner()).getReward();
            const receipt = await tx.wait();
            console.log(receipt);
            toast("success", "Claimed reward successfully");
        } catch (err) {
            console.error(err);
            toast("error", "Error claiming reward");
        }
    }

    return {
        staking,

        totalStaked: result
            ? formatUnits(
                  result.results["AscensionStaking"].callsReturnContext[0]
                      .returnValues[0]
              )
            : undefined,

        rewardsEndAt: result
            ? new Date(rewardsEndAt * 1000).toLocaleDateString()
            : undefined,

        apy: apy,

        userStake: result
            ? formatUnits(
                  result.results["AscensionStaking"].callsReturnContext[2]
                      .returnValues[0]
              )
            : undefined,

        earnings: result
            ? formatUnits(
                  result.results["AscensionStaking"].callsReturnContext[3]
                      .returnValues[0]
              )
            : undefined,

        stake,
        withdraw,
        exit,
        getReward,
    };
}
