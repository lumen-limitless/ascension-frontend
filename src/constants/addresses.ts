import { AddressMap } from "../types";
import contractsInfo from "../constants/contractsInfo.json";
import { ChainId } from "@usedapp/core";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const BURN_ADDRESS = "0x000000000000000000000000000000000000dEaD";

export const ASCENSION: {
    [key: string]: { address: string; abi: any };
} = {
    AscensionToken: {
        address: contractsInfo.contracts.AscensionToken.address,
        abi: contractsInfo.contracts.AscensionToken.abi,
    },
    AscensionStakedToken: {
        address: contractsInfo.contracts.AscensionStakedToken.address,
        abi: contractsInfo.contracts.AscensionStakedToken.abi,
    },
    AscensionStaking: {
        address: contractsInfo.contracts.AscensionStaking.address,
        abi: contractsInfo.contracts.AscensionStaking.abi,
    },
};

export const USDC_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    [ChainId.Ropsten]: "0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C",
    [ChainId.Kovan]: "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede",
    [ChainId.Polygon]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    [ChainId.Fantom]: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    [ChainId.BSC]: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    [ChainId.Harmony]: "0x985458E523dB3d53125813eD68c274899e9DfAb4",

    [ChainId.xDai]: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    [ChainId.Arbitrum]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    [ChainId.Avalanche]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    [ChainId.Moonriver]: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
};

export const USD_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: USDC_ADDRESS[ChainId.Mainnet],
    [ChainId.Ropsten]: USDC_ADDRESS[ChainId.Ropsten],
    [ChainId.Kovan]: USDC_ADDRESS[ChainId.Kovan],
    [ChainId.Polygon]: USDC_ADDRESS[ChainId.Polygon],
    [ChainId.Fantom]: USDC_ADDRESS[ChainId.Fantom],
    [ChainId.BSC]: USDC_ADDRESS[ChainId.BSC],
    [ChainId.Harmony]: USDC_ADDRESS[ChainId.Harmony],

    [ChainId.xDai]: USDC_ADDRESS[ChainId.xDai],
    [ChainId.Arbitrum]: USDC_ADDRESS[ChainId.Arbitrum],
    [ChainId.Avalanche]: USDC_ADDRESS[ChainId.Avalanche],
    [ChainId.Moonriver]: USDC_ADDRESS[ChainId.Moonriver],
};

export const SUSHI_FACTORY_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
    [ChainId.Ropsten]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    [ChainId.Rinkeby]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    [ChainId.Goerli]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    [ChainId.Kovan]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    [ChainId.Fantom]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",

    [ChainId.Polygon]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",

    [ChainId.xDai]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    [ChainId.BSC]: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",

    [ChainId.Arbitrum]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",

    [ChainId.Avalanche]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",

    [ChainId.Harmony]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",

    [ChainId.Palm]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",

    [ChainId.Moonriver]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
};

export const SUSHI_ROUTER_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    [ChainId.Rinkeby]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    [ChainId.Ropsten]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    [ChainId.Goerli]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    [ChainId.Kovan]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    [ChainId.Fantom]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",

    [ChainId.Polygon]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",

    [ChainId.xDai]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    [ChainId.BSC]: "0x10ED43C718714eb63d5aA57B78B54704E256024E",

    [ChainId.Arbitrum]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",

    [ChainId.Avalanche]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    [ChainId.Harmony]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",

    [ChainId.Palm]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",

    [ChainId.Moonriver]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
};

export const UNI_FACTORY_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    [ChainId.Ropsten]: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    [ChainId.Rinkeby]: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    [ChainId.Goerli]: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    [ChainId.Kovan]: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
};

export const UNI_ROUTER_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    [ChainId.Rinkeby]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    [ChainId.Ropsten]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    [ChainId.Goerli]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    [ChainId.Kovan]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
};

export const WETH9_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    [ChainId.Ropsten]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainId.Rinkeby]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainId.Goerli]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [ChainId.Kovan]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
    [ChainId.Arbitrum]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    [ChainId.ArbitrumRinkeby]: "0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b",
    [ChainId.BSC]: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    [ChainId.Fantom]: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
    [ChainId.Polygon]: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    [ChainId.Harmony]: "0x6983D1E6DEf3690C4d616b13597A09e6193EA013",
    [ChainId.xDai]: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    [ChainId.Avalanche]: "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15",
};

export const WNATIVE_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    [ChainId.Ropsten]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainId.Rinkeby]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainId.Goerli]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [ChainId.Kovan]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
    [ChainId.Arbitrum]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    [ChainId.ArbitrumRinkeby]: "0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b",
    [ChainId.BSC]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    [ChainId.Fantom]: "",
    [ChainId.Polygon]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    [ChainId.Harmony]: "",
    [ChainId.xDai]: "",
    [ChainId.Avalanche]: "",
};

export const ENS_REGISTRAR_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    [ChainId.Goerli]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    [ChainId.Ropsten]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    [ChainId.Rinkeby]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
};

export const MULTICALL2_ADDRESS: AddressMap = {
    [ChainId.Mainnet]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [ChainId.Ropsten]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [ChainId.Rinkeby]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [ChainId.Goerli]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [ChainId.Kovan]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [ChainId.Arbitrum]: "0x80C7DD17B01855a6D2347444a0FCC36136a314de",
    [ChainId.ArbitrumRinkeby]: "0x82790d6D25cF220646a2a10cAfBD607294aA9546",

    [ChainId.Fantom]: "0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5",
    [ChainId.Polygon]: "0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD",

    [ChainId.xDai]: "0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287",
    [ChainId.BSC]: "0xa9193376D09C7f31283C54e56D013fCF370Cd9D9",
    [ChainId.Avalanche]: "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3",

    [ChainId.Harmony]: "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3",

    [ChainId.Palm]: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F",
    [ChainId.Moonriver]: "0x270f2F35bED92B7A59eA5F08F6B3fd34c8D9D9b5",
};
