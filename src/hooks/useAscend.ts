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
    const {
        account,
        active,
        chainId,
        library,
        error,
    } = useWeb3React<Web3Provider>();
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
    const tokenBalance = useMemo(() => {
        if (!ascendBalance) return null;
        return formatUnits(ascendBalance);
    }, [ascendBalance]);

    const stakedBalance = useMemo(() => {
        if (!sAscendBalance) return null;
        return formatUnits(sAscendBalance);
    }, [sAscendBalance]);

    const totalBalance = useMemo(() => {
        if (!tokenBalance || !stakedBalance) return null;
        return parseFloat(tokenBalance) + parseFloat(stakedBalance);
    }, [tokenBalance, stakedBalance]);

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
            toast("error", `${err.data.message}`);
        }
    }

    return { tokenBalance, stakedBalance, totalBalance, approve };
}
