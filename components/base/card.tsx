import React from "react";

interface AppProps {
    children?: any;
    className?: string;
}

export default function Card({ children, className }: AppProps): JSX.Element {
    return (
        <div
            className={`${className} relative bg-gray-100 dark:bg-gray-700 rounded-xl p-4 w-full max-w-xl shadow-xl flex flex-col items-center `}
        >
            {children}
        </div>
    );
}
