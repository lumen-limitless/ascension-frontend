import React, { useState } from "react";
import LiquiditySniper from "../../components/LiquiditySniper";
import Card from "../../components/Card";
import { BackspaceIcon } from "@heroicons/react/outline";
import Container from "../../components/Container";
import Button from "../../components/Button";

export default function Tools() {
    const [option, setOption] = useState<number>();
    const TOOLS: { [key: number]: JSX.Element } = {
        1: <LiquiditySniper />,
    };

    return (
        <Container maxWidth="2xl">
            {!option ? null : (
                <Button
                    className="flex text-red-500"
                    onClick={() => setOption(undefined)}
                >
                    <BackspaceIcon width="20px" fill="red" />
                    Back
                </Button>
            )}

            {!option ? (
                <>
                    <Card title="Tools">
                        <Button
                            color="blue"
                            size="lg"
                            className="my-2"
                            onClick={() => setOption(1)}
                        >
                            Liquidity Sniper
                        </Button>
                    </Card>
                </>
            ) : (
                TOOLS[option]
            )}
        </Container>
    );
}
