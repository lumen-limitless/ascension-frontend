import React from "react";
import Header from "../components/Header";

export default function Layout({ children }: any) {
    return (
        <>
            <Header />
            <main
                className="flex flex-col items-center justify-start flex-grow w-full "
                style={{ height: "max-content" }}
            >
                {children}
            </main>
        </>
    );
}
