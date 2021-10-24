import { useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useContract } from "./useContract";
import useEtherSWR from "ether-swr";
import contractsInfo from "../utils/contractsInfo.json";
import { useToast } from "./useToast";
import { parseUnits } from "@ethersproject/units";

export default function useStaking() {
    const { account, active, chainId, library } = useWeb3React();
    const toast = useToast(4000);
    const [amount, setAmount] = useState<string>("");
    const staking = useContract(
        contractsInfo.contracts.AscensionStaking.address,
        contractsInfo.contracts.AscensionStaking.abi
    );

    const { data: totalStaked } = useEtherSWR([
        contractsInfo.contracts.AscensionStaking.address,
        "totalStaked",
    ]);
    const { data: periodFinish } = useEtherSWR([
        contractsInfo.contracts.AscensionStaking.address,
        "periodFinish",
    ]);
    const { data: userStake } = useEtherSWR([
        contractsInfo.contracts.AscensionStaking.address,
        "balanceOf",
        account,
    ]);
    const { data: earnings } = useEtherSWR([
        contractsInfo.contracts.AscensionStaking.address,
        "earned",
        account,
    ]);
    const { data: allowance } = useEtherSWR([
        contractsInfo.contracts.AscensionToken.address,
        "allowance",
        account,
        contractsInfo.contracts.AscensionStaking.address,
    ]);

    const ROI = useMemo(() => {
        try {
            if (totalStaked) {
                const ROI =
                    parseFloat(totalStaked) > 0
                        ? (1000000 /
                              parseInt(ethers.utils.formatUnits(totalStaked))) *
                          100
                        : 1000000;
                return ROI.toFixed();
            }
        } catch (err) {
            console.error(err);
        }
    }, [totalStaked]);

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
        totalStaked,
        ROI,
        isEnabled:
            allowance && parseFloat(ethers.utils.formatUnits(allowance)) > 0
                ? true
                : false,
        userStake,
        earnings,
        periodFinish,
        amount,
        setAmount,
        stake,
        withdraw,
        exit,
        getReward,
    };
}
