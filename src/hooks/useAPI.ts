import { useWeb3React } from "@web3-react/core";
import { getAddress } from "ethers/lib/utils";
import { Web3Provider } from "ethers/node_modules/@ethersproject/providers";
import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { ChainId, HOME_CHAINID, SCAN_INFO } from "../constants";
import { isAddress } from "../functions";

export default function useAPI(url: string) {
    const fetcher = useCallback(
        (url: string) => fetch(url).then((r) => r.json()),
        []
    );

    const { data, error } = useSWR(url, fetcher);

    if (error) console.error(error);
    return { data, error };
}

export function useCoingeckoAscensionStats() {
    const { data, error } = useAPI(
        "https://api.coingecko.com/api/v3/coins/ascension-protocol?localization=false"
    );

    return {
        price: data ? data.market_data.current_price.usd : undefined,
        marketCap: data
            ? parseFloat(data.market_data.current_price.usd) * 14400000
            : undefined,
        error: error,
    };
}
export function useEthUsdPrice() {
    const { data, error } = useAPI(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=VN4KZ196ME3XE9WB1WZ25E8HCBKE3B2GZM`
    );

    return {
        price: data ? parseFloat(data.result.ethusd) : undefined,
        error,
    };
}

export function useTransferData(
    tokenContract: string,
    address: string,
    chainId: ChainId
) {
    const { data, error } = useAPI(
        `https://api.${
            SCAN_INFO[chainId ?? HOME_CHAINID].name
        }.io/api?module=account&action=tokentx&contractaddress=${getAddress(
            tokenContract
        )}&address=${getAddress(
            address
        )}&startblock=0&endblock=latest&page=1&offset=100&sort=asc&apikey=${
            SCAN_INFO[chainId ?? HOME_CHAINID].apiKey
        }`
    );

    return {
        data,
        error,
    };
}
