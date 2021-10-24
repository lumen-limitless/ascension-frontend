import React, { CSSProperties } from "react";

export interface ButtonProps {
    children?: any;
    style?: CSSProperties;
    className?: string;
    onClick?: () => void;
}
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
            className={`${className} focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg`}
        >
            {children}
        </button>
    );
}
