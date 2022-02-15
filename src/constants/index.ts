import { ChainId } from "@usedapp/core";
import abis from "./abis/abis.json";

export * from "./addresses";
export * from "./networks";
export * from "./dex";
export * from "./scan";

export const HOME_CHAINID: ChainId = parseInt(abis.chainId);
