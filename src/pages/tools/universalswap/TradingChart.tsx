import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useMemo } from "react";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Loader from "../../../components/Loader";
import { ChainId, DEX_BY_CHAIN } from "../../../constants";
import { parseBalance } from "../../../functions";
import { useTransferData } from "../../../hooks/useAPI";
import useCREATE2PairAddress from "../../../hooks/useCREATE2Address";
import useLoading from "../../../hooks/useLoading";

export interface TradingChartProps {
    dex: string;
    chainId: ChainId;
    buyToken: string;
    sellToken: string;
}
export default function TradingChart({ dex, chainId, buyToken, sellToken }) {
    const pair = useCREATE2PairAddress(
        DEX_BY_CHAIN[chainId][dex].factory,
        DEX_BY_CHAIN[chainId][dex].initHash,
        buyToken,
        sellToken
    );

    const { data: buyTokenData } = useTransferData(buyToken, pair, chainId);

    const { data: sellTokenData } = useTransferData(sellToken, pair, chainId);
    console.log(buyTokenData);
    console.log(sellTokenData);

    const graphData = useMemo(() => {
        let parsed: [{ time: string; price: number }?] | undefined;
        if (buyTokenData && sellTokenData) {
            parsed = [];
            for (let i = 0; i < buyTokenData.result.length; i++) {
                parsed.push({
                    time: buyTokenData.result[i].timestamp,
                    price: parseBalance(
                        BigNumber.from(buyTokenData.result[i].value).div(
                            BigNumber.from(sellTokenData.result[i].value)
                        )
                    ),
                });
            }
        }
        return parsed;
    }, [buyTokenData, sellTokenData]);

    if (!graphData) return <Loader message="Loading graph..." />;

    if (graphData.length === 0)
        return <Loader message="No Data to show."></Loader>;

    return (
        <div className="flex w-full h-full justify-center items-center">
            <AreaChart
                width={600}
                height={500}
                data={graphData}
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                        />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-black dark:stroke-white"
                />

                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </div>
    );
}
