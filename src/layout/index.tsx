import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Layout({ children }: any) {
    return (
        <>
            <Header />
            <main
                className={`flex flex-col items-center justify-start flex-grow w-full h-full`}
                style={{ height: "max-content" }}
            >
                {children}
            </main>
            <Footer />
        </>
    );
}
