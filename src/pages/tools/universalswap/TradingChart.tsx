import { useEthers } from "@usedapp/core";
import { Area, AreaChart, Legend, Tooltip } from "recharts";
import Card from "../../../components/Card";
import Loader from "../../../components/Loader";

export interface TradingChartProps {
    dex: string;
    buyToken: string;
    sellToken: string;
}
export default function TradingChart({ dex, buyToken, sellToken }) {
    const { chainId } = useEthers();

    const swapData = [
        { price: 1, time: "jan" },
        { price: 2, time: "feb" },
        { price: 1.5, time: "mar" },
        { price: 2.7, time: "apr" },
    ];
    console.log(swapData);

    if (!chainId) return <Loader />;
    if (!swapData) return <Loader message="Loading graph..." />;

    if (swapData.length === 0)
        return <Loader message="No Data to show."></Loader>;

    return (
        <Card>
            <AreaChart
                width={600}
                height={500}
                data={swapData}
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
        </Card>
    );
}
