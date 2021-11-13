import React from "react";

export default function Skeleton(): JSX.Element {
    return (
        <div className="w-24 h-4 rounded-sm bg-gradient-to-r from-gray-400 to-gray-300 animate-pulse "></div>
    );
}
