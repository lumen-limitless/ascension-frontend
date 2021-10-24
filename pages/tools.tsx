import React, { useState } from "react";
import Section from "../components/base/section";
import LiquiditySniper from "../components/liquiditySniper";
import Card from "../components/base/card";
import Pill from "../components/base/buttons/pill";
import Distributor from "../components/distributor";
import Back from "../components/svg/arrow";

export default function Tools() {
    const [option, setOption] = useState<number>();
    const TOOLS: { [key: number]: JSX.Element } = {
        1: <LiquiditySniper />,
        2: <Distributor />,
    };

    return (
        <Section>
            {!option ? null : (
                <Pill
                    className="flex text-red-500"
                    onClick={() => setOption(undefined)}
                >
                    <Back className="text-red-500" />
                    Back
                </Pill>
            )}

            {!option ? (
                <>
                    <Card className="">
                        {" "}
                        <h1>Tools</h1>
                        <Pill
                            className="bg-purple-600 w-36"
                            onClick={() => setOption(1)}
                        >
                            Liquidity Sniper
                        </Pill>
                        <Pill
                            className="bg-purple-600 w-36"
                            onClick={() => setOption(2)}
                        >
                            Token Distributor
                        </Pill>
                    </Card>
                </>
            ) : (
                TOOLS[option]
            )}
        </Section>
    );
}
