import contractsInfo from "./contractsInfo.json";

export * from "./enums";
export * from "./addresses";
export * from "./networks";

export const HOME_CHAINID = parseInt(contractsInfo.chainId);
