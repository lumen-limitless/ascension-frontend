import React, { CSSProperties } from "react";

export default function Pill({
    children,
    className,

    onClick,
}: any): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={`${className} p-1 md:p-2 m-1 rounded-full  flex items-center justify-center text-white hover:opacity-90`}
        >
            {children}
        </button>
    );
}
