import { useCallback, useMemo } from "react";
import {
    Multicall,
    ContractCallContext,
    ContractCallResults,
} from "ethereum-multicall";
import { MULTICALL2_ADDRESS, RPC_URL } from "../constants";
import useSWR from "swr";
import contractsInfo from "../constants/contractsInfo.json";

export default function useMulticall(calls: ContractCallContext[]) {
    const fetcher = useCallback(async (calls: ContractCallContext[]) => {
        const multicall = new Multicall({
            nodeUrl: RPC_URL[parseInt(contractsInfo.chainId)],
            tryAggregate: true,
            multicallCustomContractAddress:
                MULTICALL2_ADDRESS[parseInt(contractsInfo.chainId)],
        });

        const result = await multicall.call(calls);
        return result;
    }, []);

    const { data, error } = useSWR(calls, fetcher);

    if (error) console.error(error);
    return {
        result: data,
        error: error,
    };
}
