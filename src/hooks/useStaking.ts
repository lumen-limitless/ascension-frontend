import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useAscensionStaking, useContract } from "./useContract";
import { useToast } from "./useToast";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { HOME_CHAINID } from "../constants";
import useContractCall from "./useContractCall";

export default function useStaking() {
    const { account, active, chainId, library } = useWeb3React();
    const toast = useToast(4000);

    const staking = useAscensionStaking();

    const { data: userStake } = useContractCall([
        staking,
        "balanceOf",
        account,
    ]);

    const { data: totalStaked } = useContractCall([staking, "totalStaked"]);
    const { data: periodFinish } = useContractCall([staking, "periodFinish"]);
    const { data: rewardRate } = useContractCall([staking, "rewardRate"]);
    const { data: earnings } = useContractCall([staking, "earned", account]);
    const { data: paused } = useContractCall([staking, "paused"]);

    const rewardsEndAt = useMemo(() => {
        if (!periodFinish) return null;
        const timestamp = ethers.BigNumber.from(periodFinish).toNumber();
        return new Date(timestamp * 1000).toLocaleDateString();
    }, [periodFinish]);

    const apy = useMemo(() => {
        if (!rewardRate || !totalStaked) return null;

        const r = parseFloat(formatUnits(rewardRate));
        const t = parseFloat(formatUnits(totalStaked));
        const i = r * 31557600 * (1 / t);
        return (Math.pow(1 + i / 365, 365) - 1) * 100;
    }, [rewardRate, totalStaked]);

    async function stake(amount: string) {
        if (!active || chainId != HOME_CHAINID) {
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
        if (!active || chainId != HOME_CHAINID) {
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
        if (!active || chainId != HOME_CHAINID) {
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
        if (!active || chainId != HOME_CHAINID) {
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

        totalStaked,

        rewardsEndAt,

        apy: apy,

        userStake,

        earnings,

        paused,

        stake,
        withdraw,
        exit,
        getReward,
    };
}
