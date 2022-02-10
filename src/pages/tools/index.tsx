import React from "react";
import Head from "next/head";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Link from "next/link";
import Logo from "../../components/Logo";

const ToolTile = ({ path, name }: { path?: string; name?: string }) => {
    return (
        <Card>
            <div className="flex flex-col gap-4">
                <Logo />
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
                <ToolTile path="/tools/universalswap" name="Universal Swap" />
                <ToolTile path="/tools/reactor" name="Ascension Reactor" />
            </div>
        </Container>
    );
}
