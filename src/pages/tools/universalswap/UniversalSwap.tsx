import { useEthers } from "@usedapp/core";
import { useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Loader from "../../../components/Loader";
import {
    ASCENSION,
    USD_ADDRESS,
    WNATIVE_ADDRESS,
    ZERO_ADDRESS,
} from "../../../constants";

import TradingChart from "./TradingChart";

export default function UniversalSwap() {
    const { chainId } = useEthers();
    const [tokens, setTokens] = useState<{
        buyToken: string;
        sellToken: string;
    }>({
        buyToken: WNATIVE_ADDRESS[chainId],
        sellToken: ASCENSION.AscensionToken.address,
    });
    const [amount, setAmount] = useState();

    const [dex, setDex] = useState("sushiswap");

    const swapTokens = () => {
        setTokens({
            buyToken: tokens.sellToken,
            sellToken: tokens.buyToken,
        });
    };

    if (!chainId) return <Loader />;

    return (
        <div className="flex flex-col md:flex-row w-full gap-10 min-h-[500px] ">
            <Card className="flex-basis-16 flex-shrink-0 md:w-80">
                <div className="flex flex-col h-full gap-1 justify-evenly items-center">
                    <div className="flex flex-col gap-1 w-full">
                        <Button variant="outlined" color="gray">
                            ETH
                        </Button>
                    </div>

                    <Button onClick={swapTokens}>
                        <svg
                            width="32px"
                            height="32px"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current text-ascend-magenta rotate-90"
                        >
                            <path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
                        </svg>
                    </Button>

                    <div className="flex flex-col gap-1 w-full">
                        <Button variant="outlined" color="gray">
                            USD
                        </Button>
                    </div>

                    <Button color="gradient">Swap</Button>
                </div>
            </Card>
            <TradingChart
                dex={dex}
                buyToken={tokens.buyToken}
                sellToken={tokens.sellToken}
            />
        </div>
    );
}
