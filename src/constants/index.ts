import contractsInfo from "./contractsInfo.json";

export * from "./addresses";
export * from "./networks";
export * from "./dex";
export * from "./scan";

export const HOME_CHAINID = parseInt(contractsInfo.chainId);
