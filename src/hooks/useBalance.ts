import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "ethers/node_modules/@ethersproject/providers";
import React, { useCallback } from "react";
import useSWR from "swr";

export default function useBalance() {
    const { library, account } = useWeb3React<Web3Provider>();

    const balanceFetcher = useCallback(
        async (address) => {
            const balance = await library.getBalance(address);
            return parseFloat(formatEther(balance));
        },
        [library]
    );

    const { data, error } = useSWR(account, balanceFetcher);

    if (error) console.error(error);

    return { balance: data, error };
}
