import { ethers } from "ethers";
import useSWR from "swr";
import { contractCallFetcher } from "../functions";

export default function useContractCall<Data = any, Error = any>(
    key: [ethers.Contract, string, ...any]
) {
    return useSWR(key, contractCallFetcher);
}
