import React, { CSSProperties } from "react";
import { ButtonProps } from "./button";

export default function Pill({
    children,
    className,
    style,
    onClick,
}: ButtonProps): JSX.Element {
    return (
        <button
            style={style}
            onClick={onClick}
            className={`${className} p-1 md:p-2 m-1 rounded-full text-white hover:opacity-90`}
        >
            {children}
        </button>
    );
}
