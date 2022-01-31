import React from "react";
import Skeleton from "../Skeleton";
import Card from "../Card";
import { formatBalance, formatPercent } from "../../functions";
import { BigNumberish } from "ethers";

type Stat = {
    name?: string;
    stat?: string | number | BigNumberish;
    before?: string;
    after?: string;
    isBalance?: boolean;
    isPercent?: boolean;
};
export interface StatProps {
    title?: string;
    stats?: Stat[];
}
export default function Stat({ title, stats }: StatProps) {
    return (
        <div className="my-2 md:my-4">
            <h3 className="text-lg leading-6 font-medium ">{title}</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 ">
                {stats.map((item) => (
                    <Card key={item.name}>
                        <dt className="text-sm font-medium truncate opacity-60">
                            {item.name ?? <Skeleton />}
                        </dt>
                        <dd className="mt-1 text-2xl font-semibold flex items-center">
                            {item.stat ? (
                                <>
                                    {item.before && item.before}
                                    {item.isBalance
                                        ? formatBalance(item.stat)
                                        : item.isPercent
                                        ? formatPercent(item.stat)
                                        : item.stat}
                                    {item.after && item.after}
                                </>
                            ) : (
                                <Skeleton />
                            )}
                        </dd>
                    </Card>
                ))}
            </dl>
        </div>
    );
}
