import { ChainId } from "./enums";
export * from "./enums";
export * from "./addresses";

export const RPC_URL: { [chainId in ChainId]?: string } = {
    [ChainId.MAINNET]:
        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    [ChainId.HARDHAT]: "http://localhost:8545",
    [ChainId.ARBITRUM]: "",
    [ChainId.ARBITRUM_TESTNET]: "https://rinkeby.arbitrum.io/rpc",
};

export const CHAIN_DATA: { [chainId in ChainId]?: string } = {
    [ChainId.ARBITRUM]: "",
};
