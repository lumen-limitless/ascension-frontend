import React from "react";
import Head from "next/head";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Link from "next/link";
import { ReactorLogo } from "../../components/Logo";

const ToolTile = ({ path, name }: { path: string; name: string }) => {
    return (
        <Card
            header={
                <div className="flex justify-center items-center p-3">
                    <ReactorLogo />
                </div>
            }
        >
            <div className="flex flex-col gap-4">
                <h1 className="text-xl text-center">{name}</h1>
                <Link href={path} passHref={true}>
                    <a>
                        <Button color="blue">Launch</Button>
                    </a>
                </Link>
            </div>
        </Card>
    );
};
export default function ToolsPage() {
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
            <div className="grid grid-cols-1 justify-between gap-12">
                {/* <ToolTile path="/tools/universalswap" name="Universal Swap" /> */}
                {/* <ToolTile path="/tools/reactor" name="Ascension Reactor" /> */}
                <ToolTile path="/tools/batchsender" name="ERC20 Batch Sender" />
            </div>
        </Container>
    );
}
