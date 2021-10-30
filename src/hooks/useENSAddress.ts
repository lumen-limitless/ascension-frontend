import { useENSRegistrarContract, useENSResolverContract } from "./useContract";

import { isZero } from "../functions";
import { namehash } from "@ethersproject/hash";
import { useDebounce } from "react-use";
import { useMemo } from "react";
import useSingleCallResult from "./useMulticall";

/**
 * Does a lookup for an ENS name to find its address.
 */
export default function useENSAddress(
    ensName?: string | null
): {
    loading: boolean;
    address: string | null;
} {
    var debouncedName: string | null;

    useDebounce(() => {
        debouncedName = ensName;
    }, 200);

    const ensNodeArgument = useMemo(() => {
        if (!debouncedName) return [undefined];
        try {
            return debouncedName ? [namehash(debouncedName)] : [undefined];
        } catch (error) {
            return [undefined];
        }
    }, [debouncedName]);

    const registrarContract = useENSRegistrarContract();
    console.log(registrarContract.address);
    const resolverAddress = useSingleCallResult(
        registrarContract,
        "resolver",
        ensNodeArgument
    );
    const resolverAddressResult = resolverAddress.result?.[0];
    const resolverContract = useENSResolverContract(
        resolverAddressResult && !isZero(resolverAddressResult)
            ? resolverAddressResult
            : undefined
    );
    const addr = useSingleCallResult(resolverContract, "addr", ensNodeArgument);

    const changed = debouncedName !== ensName;
    return {
        address: changed ? null : addr.result?.[0] ?? null,
        loading: changed || resolverAddress.loading || addr.loading,
    };
}
