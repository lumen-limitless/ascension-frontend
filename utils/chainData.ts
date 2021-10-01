import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import IERC20 from "@openzeppelin/contracts/build/contracts/IERC20.json";
import { ethers } from "ethers";

export interface chainData {
  [key: number]: {
    name: string;
    symbol: string;
    color: string;
    weth: ethers.Contract;
    factory: ethers.Contract;
    router: ethers.Contract;
  };
}

export const chainData: chainData = {
  4: {
    name: "Rinkeby",
    symbol: "rETH",
    color: "bg-red-600",
    weth: new ethers.Contract("0xc778417e063141139fce010982780140aa0cd5ab", IERC20.abi),
    factory: new ethers.Contract("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ]),
    router: new ethers.Contract(
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      IUniswapV2Router02.abi
    ),
  },

  1: {
    name: "Ethereum",
    symbol: "ETH",
    color: "bg-blue-600",
    weth: new ethers.Contract("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", IERC20.abi),
    factory: new ethers.Contract("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ]),
    router: new ethers.Contract(
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      IUniswapV2Router02.abi
    ),
  },

  421611: {
    name: "Arbitrum Rinkeby",
    symbol: "rAETH",
    color: "bg-indigo-600",
    weth: new ethers.Contract("0x82af49447d8a07e3bd95bd0d56f35241523fbab1", IERC20.abi),
    factory: new ethers.Contract("0x1F98431c8aD98523631AE4a59f267346ea31F984", [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ]),
    router: new ethers.Contract(
      "0xE592427A0AEce92De3Edee1F18E0157C05861564",
      IUniswapV2Router02.abi
    ),
  },

  42161: {
    name: "Arbitrum",
    symbol: "AETH",
    color: "bg-green-600",
    weth: new ethers.Contract("0x82af49447d8a07e3bd95bd0d56f35241523fbab1", IERC20.abi),
    factory: new ethers.Contract("0xc35DADB65012eC5796536bD9864eD8773aBc74C4", [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ]),
    router: new ethers.Contract(
      "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
      IUniswapV2Router02.abi
    ),
  },

  137: {
    name: "Polygon",
    symbol: "MATIC",
    color: "bg-purple-600",
    weth: new ethers.Contract("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", IERC20.abi),
    factory: new ethers.Contract("0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32", [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ]),
    router: new ethers.Contract(
      "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      IUniswapV2Router02.abi
    ),
  },

  56: {
    name: "BSC",
    symbol: "BNB",
    color: "bg-yellow-600",
    weth: new ethers.Contract("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", IERC20.abi),
    factory: new ethers.Contract("0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ]),
    router: new ethers.Contract(
      "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      IUniswapV2Router02.abi
    ),
  },
};

export default chainData;
