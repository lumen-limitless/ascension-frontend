import { useCallback } from "react";
import useSWR from "swr";

export default function useCoingecko(url: string) {
    const fetcher = useCallback(
        (url: string) => fetch(url).then((r) => r.json()),
        []
    );

    const { data, error } = useSWR(url, fetcher);
    console.log(data);
    return { data, error };
}

export function useCoingeckoAscensionStats() {
    const { data, error } = useCoingecko(
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
