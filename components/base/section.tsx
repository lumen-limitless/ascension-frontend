import React from "react";

interface AppProps {
    children: any;
}

export default function Section({ children }: AppProps): JSX.Element {
    return (
        <section className="flex flex-col items-center  h-full w-full p-4  md:justify-center  overflow-x-auto">
            {children}
        </section>
    );
}
