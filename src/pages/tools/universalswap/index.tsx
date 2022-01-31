import React from "react";
import Head from "next/head";
import Container from "../../../components/Container";
import UniversalSwap from "./UniversalSwap";
import Loader from "../../../components/Loader";
import { useEthers } from "@usedapp/core";

export default function UniversalSwapPage() {
    const { chainId, account } = useEthers();
    const supportedChainId = [1, 42161];

    if (!chainId || !account) return <Loader />;

    if (!supportedChainId.includes(chainId))
        return <Loader message="Network not supported!" />;

    return (
        <>
            <Head>
                <title>Universal Swap Tool | Ascension Protocol</title>
                <meta
                    key="description"
                    name="description"
                    content="Ascension Protocol tools"
                />
            </Head>

            <Container maxWidth="5xl">
                <UniversalSwap />
            </Container>
        </>
    );
}
