import { useMemo, useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import {
    Multicall,
    ContractCallContext,
    ContractCallResults,
} from "ethereum-multicall";
import { ethers } from "ethers";
import { CallContext } from "ethereum-multicall/dist/esm/models";
import { ChainId, MULTICALL2_ADDRESS, RPC_URL } from "../constants";
import useSWR from "swr";

//WORK IN PROGRESS
//Performs read only contract calls in a multicall and stores the state with SWR
export default function useMulticall(
    contract: ethers.Contract,
    abi: any,
    calls: CallContext[],
    chainId: ChainId
) {
    const { library } = useWeb3React<Web3Provider>();
    const [result, setResult] = useState<ContractCallResults | undefined>();

    const multicall = useMemo(() => {
        return new Multicall({
            nodeUrl: RPC_URL[chainId],
            tryAggregate: true,
            multicallCustomContractAddress: MULTICALL2_ADDRESS[chainId],
        });
    }, [chainId]);

    useEffect(() => {
        const contractCallContext: ContractCallContext[] = [
            {
                reference: contract.address,
                contractAddress: contract.address,
                abi: abi,
                calls: calls,
            },
        ];

        const getResult = async () => {
            const result = await multicall.call(contractCallContext);
            setResult(result);
        };
        getResult().catch((err) => console.error(err));
    }, [multicall, abi, calls, contract]);

    return {
        result: result,
        blockNumber: result ? result.blockNumber : undefined,
    };
}
