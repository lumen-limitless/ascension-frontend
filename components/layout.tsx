import React from "react";
import Header from "./header";

export default function Layout({ children }: any) {
    return (
        <main
            className={`dark:bg-gray-800 dark:text-white text-black bg-gray-200 flex flex-col h-screen w-screen `}
        >
            <Header />
            <div className="h-full overflow-x-auto">{children}</div>
        </main>
    );
}
