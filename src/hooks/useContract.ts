import { useMemo } from "react";
import chainData from "../constants/chainData";
import contractsInfo from "../constants/contractsInfo.json";
import { getContract, getProviderOrSigner } from "../functions";
import { Contract } from "@ethersproject/contracts";
import IERC20 from "@openzeppelin/contracts/build/contracts/IERC20.json";
import { useWeb3React } from "@web3-react/core";
import {
    JsonRpcSigner,
    Web3Provider,
    JsonRpcProvider,
} from "@ethersproject/providers";
import { ChainId, ENS_REGISTRAR_ADDRESS, RPC_URL } from "../constants";
import ENS_PUBLIC_RESOLVER_ABI from "../constants/abis/ens-public-resolver.json";
import ENS_ABI from "../constants/abis/ens-registrar.json";

//use contract with signerOrProvider, fallback to injected signerOrProvider if possible
// returns null on errors
export function useContract(
    address: string | undefined,
    ABI: any,
    signerOrProvider?: JsonRpcProvider | Web3Provider | JsonRpcSigner
): Contract | null {
    const { library, account } = useWeb3React();

    return useMemo(() => {
        if (!signerOrProvider && !library) return null;
        if (!address || !ABI) return null;
        try {
            return getContract(
                address,
                ABI,
                signerOrProvider ?? getProviderOrSigner(library, account)
            );
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, ABI, library, signerOrProvider, account]);
}

export function useTokenContract(
    tokenAddress: string,
    signerOrProvider?: JsonRpcProvider | Web3Provider | JsonRpcSigner
): Contract | null {
    return useContract(tokenAddress, IERC20.abi, signerOrProvider);
}

export function useENSRegistrarContract(): Contract | null {
    const { chainId } = useWeb3React();
    return useContract(
        chainId && ENS_REGISTRAR_ADDRESS[ChainId.MAINNET],
        ENS_ABI,
        new JsonRpcProvider(RPC_URL[ChainId.MAINNET])
    );
}

export function useENSResolverContract(
    address: string | undefined,
    signerOrProvider?: JsonRpcProvider | Web3Provider | JsonRpcSigner
): Contract | null {
    return useContract(
        address,
        ENS_PUBLIC_RESOLVER_ABI,
        new JsonRpcProvider(RPC_URL[ChainId.MAINNET])
    );
}
