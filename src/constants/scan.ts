import { ChainId } from "@usedapp/core";

export const SCAN_INFO = {
    [ChainId.Mainnet]: {
        name: "etherscan",
        apiKey: "VN4KZ196ME3XE9WB1WZ25E8HCBKE3B2GZM",
    },
    [ChainId.Arbitrum]: {
        name: "arbiscan",
        apiKey: "53GED146Z1HAVXMAGGGKYEDPQRBVZPNUXW",
    },
    [ChainId.BSC]: {
        name: "bscscan",
        apiKey: "EJENUSIGFRF2HX5UQV4JNQUIFU2N2W2VFD",
    },
};
