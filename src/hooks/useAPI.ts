import { ChainId } from "@usedapp/core";
import { getAddress } from "ethers/lib/utils";
import useSWR from "swr";
import { SCAN_INFO } from "../constants";

export default function useAPI(url: string) {
    const { data, error } = useSWR(url, async (url: string) => {
        return await fetch(url).then((r) => r.json());
    });

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
            SCAN_INFO[chainId].name
        }.io/api?module=account&action=tokentx&contractaddress=${getAddress(
            tokenContract
        )}&address=${getAddress(
            address
        )}&startblock=0&endblock=latest&page=1&offset=100&sort=asc&apikey=${
            SCAN_INFO[chainId].apiKey
        }`
    );

    if (error) return error;
    return data;
}
