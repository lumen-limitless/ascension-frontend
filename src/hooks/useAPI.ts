import { ChainId } from "@usedapp/core";
import { BigNumber, ethers } from "@usedapp/core/node_modules/ethers";
import { getAddress, parseUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { ASCENSION, SCAN_INFO } from "../constants";
import { formatBalance } from "../functions";

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
        price: data
            ? parseFloat(data.market_data.current_price.usd).toPrecision(2)
            : undefined,
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

export function useAPIASCENDBalance(account: string) {
    const { data, error } = useAPI(
        `https://api.arbiscan.io/api?module=account&action=tokenbalance&contractaddress=0x9e724698051DA34994F281bD81C3E7372d1960AE&address=${account}&tag=latest&apikey=${
            SCAN_INFO[ChainId.Arbitrum].apiKey
        }`
    );
    const balance = useMemo(() => {
        if (!data || data.message != "OK") return null;
        return parseUnits(data.result, 0);
    }, [data]);

    if (error) return null;

    return balance;
}
export function useAPIStakedASCENDBalance(account: string) {
    const { data, error } = useAPI(
        `https://api.arbiscan.io/api?module=account&action=tokenbalance&contractaddress=0x40eafec3c261f7e706289d3b3afef812a6ca10cd&address=${account}&tag=latest&apikey=${
            SCAN_INFO[ChainId.Arbitrum].apiKey
        }`
    );
    const balance = useMemo(() => {
        if (!data || data.message != "OK") return null;
        return parseUnits(data.result, 0);
    }, [data]);

    if (error) return null;

    return balance;
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

export function useVerifiedContractABI(
    contract: string,
    chainId: ChainId
): any[] {
    const { data, error } = useAPI(
        `https://api.${SCAN_INFO[chainId].name}.io/api?module=contract&action=getabi&address=${contract}&apikey=${SCAN_INFO[chainId].apiKey}`
    );

    const contractABI = useMemo(() => {
        if (!data) return null;
        try {
            const abi = JSON.parse(data.result);
            return abi;
        } catch {
            return [];
        }
    }, [data]);

    if (error) return null;

    return contractABI;
}
