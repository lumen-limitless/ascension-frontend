import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import contractsInfo from "../constants/contractsInfo.json";
import { useAscensionStakedToken, useAscensionToken } from "./useContract";
import { formatUnits } from "@ethersproject/units";
import { useToast } from "./useToast";
import { Web3Provider } from "@ethersproject/providers";
import useContractCall from "./useContractCall";

export function useAscendBalance() {
    const { account, active, chainId, library, error } =
        useWeb3React<Web3Provider>();
    const toast = useToast(4000);
    const ascend = useAscensionToken();
    const sAscend = useAscensionStakedToken();

    const { data: ascendBalance } = useContractCall([
        ascend,
        "balanceOf",
        account,
    ]);
    const { data: sAscendBalance } = useContractCall([
        sAscend,
        "balanceOf",
        account,
    ]);

    //returns as number
    const totalBalance = useMemo(() => {
        if (!ascendBalance || !sAscendBalance) return null;
        return parseFloat(formatUnits(ascendBalance.add(sAscendBalance)));
    }, [ascendBalance, sAscendBalance]);

    async function approve(address: string, amount: ethers.BigNumberish) {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR", error);
            return;
        }
        try {
            if (library) {
                const tx = await ascend
                    .connect(library.getSigner())
                    .approve(address, amount);
                let receipt = await tx.wait();
                console.log(receipt);
                toast("success", "Approval successful");
            }
        } catch (err: any) {
            console.error(err);
            toast("error", `Error during approval`);
        }
    }

    return { ascendBalance, sAscendBalance, totalBalance, approve };
}

export function useAscendVoting() {
    const { account, active, chainId, library, error } =
        useWeb3React<Web3Provider>();
    const toast = useToast(4000);
    const ascend = useAscensionToken();
    const sAscend = useAscensionStakedToken();

    const { data: votes } = useContractCall([ascend, "getVotes", account]);
    const { data: stakedVotes } = useContractCall([
        sAscend,
        "getVotes",
        account,
    ]);

    //returns as number
    const totalVotes = useMemo(() => {
        if (!votes || !stakedVotes) return null;
        return (
            parseFloat(formatUnits(votes)) +
            parseFloat(formatUnits(stakedVotes))
        );
    }, [stakedVotes, votes]);

    async function delegate(address: string) {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR", error);
            return;
        }
        try {
            if (library) {
                const tx = await ascend
                    .connect(library.getSigner())
                    .delegate(address);
                let receipt = await tx.wait();
                console.log(receipt);
                toast("success", "Delegation successful");
            }
        } catch (err: any) {
            console.error(err);
            toast("error", `Error during delegation`);
        }
    }

    return {
        votes,
        stakedVotes,
        totalVotes,
        delegate,
    };
}
