import { isAddress } from ".";
import { ZERO_ADDRESS } from "../constants";
import {
    JsonRpcSigner,
    Web3Provider,
    JsonRpcProvider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

// account is not optional
export function getSigner(
    library: Web3Provider,
    account: string
): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
    library: Web3Provider,
    account?: string
): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
    address: string,
    ABI: any,
    signerOrProvider?: Web3Provider | JsonRpcSigner | JsonRpcProvider
): Contract {
    if (!isAddress(address) || address === ZERO_ADDRESS) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return new Contract(address, ABI, signerOrProvider);
}
