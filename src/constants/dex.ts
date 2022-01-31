import {
    SUSHI_FACTORY_ADDRESS,
    SUSHI_ROUTER_ADDRESS,
    UNI_FACTORY_ADDRESS,
    UNI_ROUTER_ADDRESS,
} from ".";
import { ChainId } from "@usedapp/core";

export const SUSHI_INIT_HASH =
    "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303";

export const UNI_INIT_HASH =
    "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f";

export const DEX_BY_CHAIN = {
    [ChainId.Mainnet]: {
        sushiswap: {
            name: "SushiSwap",
            initHash: SUSHI_INIT_HASH,
            router: SUSHI_ROUTER_ADDRESS[ChainId.Mainnet],
            factory: SUSHI_FACTORY_ADDRESS[ChainId.Mainnet],
        },
        uniswap: {
            name: "UniSwap",
            initHash: UNI_INIT_HASH,
            router: UNI_ROUTER_ADDRESS[ChainId.Mainnet],
            factory: UNI_FACTORY_ADDRESS[ChainId.Mainnet],
        },
    },
    [ChainId.Arbitrum]: {
        sushiswap: {
            name: "SushiSwap",
            initHash: SUSHI_INIT_HASH,
            router: SUSHI_ROUTER_ADDRESS[ChainId.Arbitrum],
            factory: SUSHI_FACTORY_ADDRESS[ChainId.Arbitrum],
        },
        uniswap: {
            name: "UniSwap",
            initHash: UNI_INIT_HASH,
            router: SUSHI_ROUTER_ADDRESS[ChainId.Mainnet],
            factory: SUSHI_FACTORY_ADDRESS[ChainId.Mainnet],
        },
    },
};
