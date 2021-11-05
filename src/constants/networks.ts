import { ChainId } from "./enums";

export const RPC: { [chainId in ChainId]?: string } = {
    [ChainId.HARDHAT]: "http://localhost:8545",
    [ChainId.ARBITRUM_TESTNET]:
        "https://arb-rinkeby.g.alchemy.com/v2/fVMS0IOOy-uC_2w1sCooihRBSbxD57NN",
    [ChainId.ARBITRUM]:
        "https://arb-mainnet.g.alchemy.com/v2/RU9HDzHNgDzOZceQTwS_XqB75obxlrNf",
    [ChainId.MAINNET]:
        "https://eth-mainnet.alchemyapi.io/v2/UdQPMrxaFxiuNVt1SgCtPiE5sopkDOnP",
    [ChainId.ROPSTEN]:
        "https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW",
    [ChainId.RINKEBY]:
        "https://eth-rinkeby.alchemyapi.io/v2/iF972RTEF1QUpvKqswWivu4DmvUVYNSr",
    [ChainId.GÖRLI]:
        "https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im",
    [ChainId.KOVAN]:
        "https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER",
    [ChainId.FANTOM]: "https://rpcapi.fantom.network",
    [ChainId.FANTOM_TESTNET]: "https://rpc.testnet.fantom.network",
    [ChainId.MATIC]:
        "https://polygon-mainnet.g.alchemy.com/v2/UYsLwfM1od6soaCTh28mO8PTg-pcKKSn",
    [ChainId.MATIC_TESTNET]: "https://rpc-mumbai.matic.today",
    [ChainId.XDAI]: "https://rpc.xdaichain.com",
    [ChainId.BSC]: "https://bsc-dataseed.binance.org/",
    [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-2-s3.binance.org:8545",
    [ChainId.MOONBEAM_TESTNET]: "https://rpc.testnet.moonbeam.network",
    [ChainId.AVALANCHE]: "https://api.avax.network/ext/bc/C/rpc",
    [ChainId.AVALANCHE_TESTNET]: "https://api.avax-test.network/ext/bc/C/rpc",
    [ChainId.HECO]: "https://http-mainnet.hecochain.com",
    [ChainId.HECO_TESTNET]: "https://http-testnet.hecochain.com",
    [ChainId.HARMONY]: "https://api.harmony.one",
    [ChainId.HARMONY_TESTNET]: "https://api.s0.b.hmny.io",
    [ChainId.OKEX]: "https://exchainrpc.okex.org",
    [ChainId.OKEX_TESTNET]: "https://exchaintestrpc.okex.org",
    [ChainId.PALM]:
        "https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
    [ChainId.CELO]: "https://forno.celo.org",
};

export const CHAIN_NAME: { [chainId in ChainId]?: string } = {
    [ChainId.HARDHAT]: "Hardhat",
    [ChainId.ARBITRUM_TESTNET]: "Arbtest",
    [ChainId.ARBITRUM]: "Arbitrum",
    [ChainId.MAINNET]: "Ethereum",
    [ChainId.ROPSTEN]: "Ropsten",
    [ChainId.RINKEBY]: "Rinkeby",
    [ChainId.GÖRLI]: "Gorli",
    [ChainId.KOVAN]: "Kovan",
    [ChainId.FANTOM]: "Fantom",
    [ChainId.FANTOM_TESTNET]: "Fantest",
    [ChainId.MATIC]: "Polygon",
    [ChainId.MATIC_TESTNET]: "Mumbai",
    [ChainId.XDAI]: "XDAI",
    [ChainId.BSC]: "BSC",
    [ChainId.BSC_TESTNET]: "BSCtest",
    [ChainId.MOONBEAM_TESTNET]: "MOONtest",
    [ChainId.AVALANCHE]: "Avalanche",
    [ChainId.AVALANCHE_TESTNET]: "AVAXtest",
    [ChainId.HECO]: "Heco",
    [ChainId.HECO_TESTNET]: "Hecotest",
    [ChainId.HARMONY]: "Harmony",
    [ChainId.HARMONY_TESTNET]: "Harmonytest",
    [ChainId.OKEX]: "OKEX",
    [ChainId.OKEX_TESTNET]: "OKEXTEST",
    [ChainId.PALM]: "PALM",
    [ChainId.CELO]: "CELO",
};

export const CHAIN_SYMBOL: { [chainId in ChainId]?: string } = {
    [ChainId.HARDHAT]: "ETH",
    [ChainId.ARBITRUM_TESTNET]: "AETH",
    [ChainId.ARBITRUM]: "AETH",
    [ChainId.MAINNET]: "ETH",
    [ChainId.ROPSTEN]: "rETH",
    [ChainId.RINKEBY]: "rETH",
    [ChainId.GÖRLI]: "gETH",
    [ChainId.KOVAN]: "kETH",
    [ChainId.FANTOM]: "Fantom",
    [ChainId.FANTOM_TESTNET]: "Fantest",
    [ChainId.MATIC]: "MATIC",
    [ChainId.MATIC_TESTNET]: "ATIC",
    [ChainId.XDAI]: "DAI",
    [ChainId.BSC]: "BNB",
    [ChainId.BSC_TESTNET]: "BNB",
    [ChainId.MOONBEAM_TESTNET]: "MOON",
    [ChainId.AVALANCHE]: "AVAX",
    [ChainId.AVALANCHE_TESTNET]: "AVAX",
    [ChainId.HECO]: "HECO",
    [ChainId.HECO_TESTNET]: "HECO",
    [ChainId.HARMONY]: "HARM",
    [ChainId.HARMONY_TESTNET]: "HARM",
    [ChainId.OKEX]: "OKEX",
    [ChainId.OKEX_TESTNET]: "OKEX",
    [ChainId.PALM]: "PALM",
    [ChainId.CELO]: "CELO",
};
