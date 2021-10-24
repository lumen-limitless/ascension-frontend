import Section from "../components/base/section";
import Card from "../components/base/card";
import {
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
} from "recharts";
import Stat from "../components/base/stat";

const data = [
    {
        uv: 0,
    },
    {
        uv: 300,
    },
    {
        uv: 1000,
    },
    {
        uv: 2780,
    },
    {
        uv: 1890,
    },
    {
        uv: 3490,
    },
    {
        uv: 2390,
    },
];

export default function Home() {
    return (
        <Section>
            <Card className="my-4 md:m-0">
                <div className="flex w-full justify-evenly">
                    <Stat title="ASCEND Price" value="0.032" before="$"></Stat>
                    <Stat
                        title="Market Cap"
                        value="100000"
                        commify={true}
                        before="$"
                    ></Stat>
                </div>
            </Card>
            <div className="flex flex-wrap -mx-px sm:-mx-1 md:-mx-2 lg:-mx-3 w-full ">
                <div className="my-px px-px w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/2 xl:my-4 xl:px-4 xl:w-1/2 flex justify-center">
                    <Card className="bg-gray-800">
                        <h1>Total Staked</h1>
                        <ResponsiveContainer width="90%" height={250}>
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
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
                                    <linearGradient
                                        id="colorPv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
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
                                <XAxis dataKey="name"></XAxis>
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pv"
                                    stroke="#82ca9d"
                                    fillOpacity={1}
                                    fill="url(#colorPv)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
                <div className="my-px px-px w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/2 xl:my-4 xl:px-4 xl:w-1/2 flex justify-center">
                    <Card className="bg-gray-800">
                        <h1>Total Staked</h1>
                        <ResponsiveContainer width="90%" height={250}>
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
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
                                    <linearGradient
                                        id="colorPv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
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
                                <XAxis dataKey="name"></XAxis>
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pv"
                                    stroke="#82ca9d"
                                    fillOpacity={1}
                                    fill="url(#colorPv)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
