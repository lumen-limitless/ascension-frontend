import { useEffect, useState, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import contractsInfo from "../constants/contractsInfo.json";
import { useContract, useTokenContract } from "./useContract";
import { formatUnits } from "@ethersproject/units";
import { useToast } from "./useToast";
import { usePromise } from "react-use";
import { ASCENSION, ChainId, RPC_URL, ZERO_ADDRESS } from "../constants";

import {
    JsonRpcSigner,
    Web3Provider,
    JsonRpcProvider,
} from "@ethersproject/providers";
import useMulticall from "./useMulticall";
import { ContractCallContext } from "ethereum-multicall";

export default function useAscend() {
    const { account, active, chainId, library } = useWeb3React<Web3Provider>();
    const mounted = usePromise();
    const toast = useToast(4000);

    const ascend = useContract(
        contractsInfo.contracts.AscensionToken.address,
        contractsInfo.contracts.AscensionToken.abi
    );

    const tokenCalls: ContractCallContext[] = useMemo(() => {
        return [
            {
                reference: "AscensionToken",
                contractAddress: ASCENSION.AscensionToken.address,
                abi: ASCENSION.AscensionToken.abi,
                calls: [
                    {
                        reference: "",
                        methodName: "balanceOf",
                        methodParameters: [account ?? ZERO_ADDRESS],
                    },
                ],
            },
        ];
    }, [account]);
    const stakedTokenCalls: ContractCallContext[] = useMemo(() => {
        return [
            {
                reference: "AscensionStakedToken",
                contractAddress: ASCENSION.AscensionStakedToken.address,
                abi: ASCENSION.AscensionStakedToken.abi,
                calls: [
                    {
                        reference: "",
                        methodName: "balanceOf",
                        methodParameters: [account ?? ZERO_ADDRESS],
                    },
                ],
            },
        ];
    }, [account]);

    const { result: tokenResults } = useMulticall(tokenCalls);
    const { result: stakedTokenResults } = useMulticall(stakedTokenCalls);

    const tokenBalance = useMemo(() => {
        if (!tokenResults) return null;
        return formatUnits(
            tokenResults.results["AscensionToken"].callsReturnContext[0]
                .returnValues[0]
        );
    }, [tokenResults]);

    const stakedTokenBalance = useMemo(() => {
        if (!stakedTokenResults) return null;
        return formatUnits(
            stakedTokenResults.results["AscensionStakedToken"]
                .callsReturnContext[0].returnValues[0]
        );
    }, [stakedTokenResults]);

    const totalBalance = useMemo(() => {
        return tokenBalance && stakedTokenBalance
            ? parseFloat(tokenBalance) + parseFloat(stakedTokenBalance)
            : 0;
    }, [tokenBalance, stakedTokenBalance]);

    async function approve(address: string, amount: ethers.BigNumberish) {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR");
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

    return { ascend, tokenBalance, stakedTokenBalance, totalBalance, approve };
}
