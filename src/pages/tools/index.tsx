import React from "react";
import Head from "next/head";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Link from "next/link";
import Logo from "../../components/Logo";
import { useWeb3React } from "@web3-react/core";

const ToolTile = ({ path, name }: { path?: string; name?: string }) => {
    return (
        <Card>
            <div className="flex flex-col gap-4">
                <Logo />
                <Link href={path} passHref={true}>
                    <a>
                        <Button color="blue">{name}</Button>
                    </a>
                </Link>
            </div>
        </Card>
    );
};
export default function Tools() {
    return (
        <Container maxWidth="4xl">
            <Head>
                {" "}
                <title>Tools | Ascension Protocol</title>
                <meta
                    key="description"
                    name="description"
                    content="Ascension Protocol tools"
                />
            </Head>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-12">
                <ToolTile
                    path="tools/liquiditysniper"
                    name="Liquidity Sniper"
                />
                <ToolTile
                    path="tools/universalswap"
                    name="Universal Swap Tool"
                />
                <ToolTile
                    path="tools/universalswap"
                    name="Universal Swap Tool"
                />
            </div>
        </Container>
    );
}
