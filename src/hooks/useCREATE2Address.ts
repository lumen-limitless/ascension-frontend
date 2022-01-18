import { useMemo } from "react";
import { getCreate2Address, keccak256, solidityPack } from "ethers/lib/utils";

export default function useCREATE2PairAddress(
    factory: string,
    initHash: string,
    token0: string,
    token1: string
) {
    const pair = useMemo(() => {
        return getCreate2Address(
            factory,
            keccak256(
                solidityPack(["address", "address"], [token0, token1].sort())
            ),

            initHash
        );
    }, [factory, token0, token1, initHash]);

    console.log(pair);
    return pair;
}
