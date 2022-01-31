import { ChainId } from "@usedapp/core";

export const RPC: { [chainId in ChainId]?: string } = {
    [ChainId.Hardhat]: "http://localhost:8545",
    [ChainId.ArbitrumRinkeby]:
        "https://arb-rinkeby.g.alchemy.com/v2/fVMS0IOOy-uC_2w1sCooihRBSbxD57NN",
    [ChainId.Arbitrum]:
        "https://arb-mainnet.g.alchemy.com/v2/RU9HDzHNgDzOZceQTwS_XqB75obxlrNf",
    [ChainId.Mainnet]:
        "https://eth-mainnet.alchemyapi.io/v2/UdQPMrxaFxiuNVt1SgCtPiE5sopkDOnP",
    [ChainId.Ropsten]:
        "https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW",
    [ChainId.Rinkeby]:
        "https://eth-rinkeby.alchemyapi.io/v2/iF972RTEF1QUpvKqswWivu4DmvUVYNSr",
    [ChainId.Goerli]:
        "https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im",
    [ChainId.Kovan]:
        "https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER",
    [ChainId.Fantom]: "https://rpcapi.fantom.network",
    [ChainId.Polygon]:
        "https://polygon-mainnet.g.alchemy.com/v2/UYsLwfM1od6soaCTh28mO8PTg-pcKKSn",
    [ChainId.xDai]: "https://rpc.xdaichain.com",
    [ChainId.BSC]: "https://bsc-dataseed.binance.org/",
    [ChainId.BSCTestnet]: "https://data-seed-prebsc-2-s3.binance.org:8545",
    [ChainId.Avalanche]: "https://api.avax.network/ext/bc/C/rpc",
    [ChainId.Harmony]: "https://api.harmony.one",
    [ChainId.Palm]:
        "https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
};

export const CHAIN_NAME: { [chainId in ChainId]?: string } = {
    [ChainId.Hardhat]: "Hardhat",
    [ChainId.ArbitrumRinkeby]: "Arbtest",
    [ChainId.Arbitrum]: "Arbitrum",
    [ChainId.Mainnet]: "Ethereum",
    [ChainId.Ropsten]: "Ropsten",
    [ChainId.Rinkeby]: "Rinkeby",
    [ChainId.Goerli]: "Gorli",
    [ChainId.Kovan]: "Kovan",
    [ChainId.Fantom]: "Fantom",
    [ChainId.Polygon]: "Polygon",
    [ChainId.xDai]: "XDAI",
    [ChainId.BSC]: "BSC",
    [ChainId.BSCTestnet]: "BSCtest",
    [ChainId.Avalanche]: "Avalanche",
    [ChainId.Harmony]: "Harmony",
    [ChainId.Palm]: "PALM",
};

export const CHAIN_SYMBOL: { [chainId in ChainId]?: string } = {
    [ChainId.Hardhat]: "ETH",
    [ChainId.ArbitrumRinkeby]: "aETH",
    [ChainId.Arbitrum]: "aETH",
    [ChainId.Mainnet]: "ETH",
    [ChainId.Ropsten]: "rETH",
    [ChainId.Rinkeby]: "rETH",
    [ChainId.Goerli]: "rETH",
    [ChainId.Kovan]: "ETH",
    [ChainId.Fantom]: "FTM",
    [ChainId.Polygon]: "MATIC",
    [ChainId.xDai]: "XDAI",
    [ChainId.BSC]: "BSC",
    [ChainId.BSCTestnet]: "BSC",
    [ChainId.Avalanche]: "AVAX",
    [ChainId.Harmony]: "HARM",
    [ChainId.Palm]: "PALM",
};
