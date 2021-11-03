import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "ethers/node_modules/@ethersproject/providers";
import React, { useCallback, useState, useEffect } from "react";
import useSWR from "swr";
import { ZERO_ADDRESS } from "../constants";

export default function useBalance(address?: string) {
    const { library, account, active } = useWeb3React<Web3Provider>();

    const balanceFetcher = useCallback(
        async (address) => {
            if (!active) return null;
            const balance = await library.getBalance(
                address ?? account ?? ZERO_ADDRESS
            );
            return parseFloat(formatEther(balance));
        },
        [account, library, active]
    );

    const { data, error } = useSWR(account, balanceFetcher);

    if (error) return null;
    return { balance: data };
}
