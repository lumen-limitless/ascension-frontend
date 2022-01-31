import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import contractsInfo from "../constants/contractsInfo.json";
import { useAscensionStakedToken, useAscensionToken } from "./useContract";
import { formatUnits } from "@ethersproject/units";
import { useToast } from "./useToast";
import { useContractCalls, useEthers } from "@usedapp/core";
import { ASCENSION } from "../constants";

export function useAscend() {
    const { account, active, chainId, library, error } = useEthers();
    const toast = useToast(4000);
    const ascend = useAscensionToken();
    const sAscend = useAscensionStakedToken();

    const [votes, stakedVotes] = useContractCalls([
        {
            abi: ASCENSION.AscensionToken.abi,
            address: ASCENSION.AscensionToken.address,
            method: "getVotes",
            args: [account],
        },
        {
            abi: ASCENSION.AscensionStakedToken.abi,
            address: ASCENSION.AscensionStakedToken.address,
            method: "getVotes",
            args: [account],
        },
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
                const receipt = await tx.wait();
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
