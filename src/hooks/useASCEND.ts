import { useContractCalls, useTokenBalance } from "@usedapp/core";
import { ASCENSION } from "../constants";

export function useASCENDBalance(address: string) {
    return useTokenBalance(ASCENSION.AscensionToken.address, address);
}

export function useStakedASCENDBalance(address: string) {
    return useTokenBalance(ASCENSION.AscensionStakedToken.address, address);
}

export function useASCENDVotes(address: string) {
    return useContractCalls([]) ?? [];
}
