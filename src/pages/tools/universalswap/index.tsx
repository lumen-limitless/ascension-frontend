import React, { useState } from "react";
import Head from "next/head";
import { BackspaceIcon } from "@heroicons/react/outline";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import TradingChart from "./TradingChart";
import UniversalSwap from "./UniversalSwap";
import { useWeb3React } from "@web3-react/core";
import useLoading from "../../../hooks/useLoading";
import Loader from "../../../components/Loader";

export default function UniversalSwapPage() {
    const { chainId } = useWeb3React();

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
                {/* {!chainId ? <Loader /> : <UniversalSwap chainId={chainId} />} */}
            </Container>
        </>
    );
}
