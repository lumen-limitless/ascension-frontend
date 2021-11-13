import { useMemo } from "react";
import { getContract, getProviderOrSigner } from "../functions";
import { Contract } from "@ethersproject/contracts";
import IERC20 from "@openzeppelin/contracts/build/contracts/IERC20.json";
import { JsonRpcProvider } from "@ethersproject/providers";
import {
    ASCENSION,
    ChainId,
    ENS_REGISTRAR_ADDRESS,
    HOME_CHAINID,
    RPC,
} from "../constants";
import ENS_PUBLIC_RESOLVER_ABI from "../constants/abis/ens-public-resolver.json";
import ENS_ABI from "../constants/abis/ens-registrar.json";
import {
    AscensionStakedToken,
    AscensionStaking,
    AscensionToken,
} from "../types";

// returns null on errors
export function useContract(
    address: string | undefined,
    ABI: any,
    chainId?: ChainId
): Contract | null {
    return useMemo(() => {
        if (!address || !ABI) return null;
        try {
            return getContract(address, ABI, new JsonRpcProvider(RPC[chainId]));
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, ABI, chainId]);
}

export function useTokenContract(
    tokenAddress: string,
    chainId?: ChainId
): Contract | null {
    return useContract(tokenAddress, IERC20.abi, chainId);
}

export function useAscensionToken(): AscensionToken | null {
    return useContract(
        ASCENSION.AscensionToken.address,
        ASCENSION.AscensionToken.abi,
        HOME_CHAINID
    ) as AscensionToken;
}
export function useAscensionStakedToken(): AscensionStakedToken | null {
    return useContract(
        ASCENSION.AscensionStakedToken.address,
        ASCENSION.AscensionStakedToken.abi,
        HOME_CHAINID
    ) as AscensionStakedToken;
}
export function useAscensionStaking(): AscensionStaking | null {
    return useContract(
        ASCENSION.AscensionStaking.address,
        ASCENSION.AscensionStaking.abi,
        HOME_CHAINID
    ) as AscensionStaking;
}

export function useENSRegistrarContract(): Contract | null {
    return useContract(
        ENS_REGISTRAR_ADDRESS[ChainId.MAINNET],
        ENS_ABI,
        ChainId.MAINNET
    );
}

export function useENSResolverContract(
    address: string | undefined
): Contract | null {
    return useContract(address, ENS_PUBLIC_RESOLVER_ABI, ChainId.MAINNET);
}
