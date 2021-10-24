import { ethers } from "ethers";
import React from "react";
import Skeleton from "./skeleton";

interface StatProps {
    title: string;
    value: string | undefined;
    before?: string;
    after?: string;
    commify?: boolean;
}
export default function Stat({
    title,
    value,
    before,
    after,
    commify,
}: StatProps) {
    return (
        <div className="flex flex-col text-center h-full">
            <h3 className="opacity-60">{title}</h3>
            <span>
                {value ? (
                    `${before ? before : ""}${
                        commify ? ethers.utils.commify(value) : value
                    }${after ? after : ""}`
                ) : (
                    <Skeleton />
                )}
            </span>
        </div>
    );
}
