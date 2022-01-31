import { useMemo } from "react";
import { formatUnits } from "@ethersproject/units";
import { ASCENSION } from "../constants";
import { useContractCalls, useEthers } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";
import { BigNumber } from "ethers";

export default function useStaking() {
    const { account } = useEthers();

    const [balanceOf, totalStaked, rewardRate, periodFinish, earned, paused] =
        useContractCalls([
            {
                abi: new Interface(ASCENSION.AscensionStaking.abi),
                address: ASCENSION.AscensionStaking.address,
                method: "balanceOf",
                args: [account],
            },
            {
                abi: new Interface(ASCENSION.AscensionStaking.abi),
                address: ASCENSION.AscensionStaking.address,
                method: "totalStaked",
                args: [],
            },
            {
                abi: new Interface(ASCENSION.AscensionStaking.abi),
                address: ASCENSION.AscensionStaking.address,
                method: "rewardRate",
                args: [],
            },
            {
                abi: new Interface(ASCENSION.AscensionStaking.abi),
                address: ASCENSION.AscensionStaking.address,
                method: "periodFinish",
                args: [],
            },
            {
                abi: new Interface(ASCENSION.AscensionStaking.abi),
                address: ASCENSION.AscensionStaking.address,
                method: "earned",
                args: [account],
            },
            {
                abi: new Interface(ASCENSION.AscensionStaking.abi),
                address: ASCENSION.AscensionStaking.address,
                method: "paused",
                args: [],
            },
        ]);

    const rewardsEndAt = useMemo(() => {
        if (!periodFinish) return null;
        const timestamp = parseInt(periodFinish[0]);
        return new Date(timestamp * 1000).toLocaleDateString();
    }, [periodFinish]);

    const apy = useMemo(() => {
        if (!rewardRate || !totalStaked) return null;

        const r = parseFloat(formatUnits(rewardRate[0]));
        const t = parseFloat(formatUnits(totalStaked[0]));
        const i = r * 31557600 * (1 / t);
        return (Math.pow(1 + i / 365, 365) - 1) * 100;
    }, [rewardRate, totalStaked]);

    return {
        totalStaked: totalStaked && (totalStaked[0] as BigNumber),
        balanceOf: balanceOf && (balanceOf[0] as BigNumber),
        earned: earned && (earned[0] as BigNumber),
        paused: paused && (paused[0] as boolean),
        rewardsEndAt,
        apy,
    };
}
