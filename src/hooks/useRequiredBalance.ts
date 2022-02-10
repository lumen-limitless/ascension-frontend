import { useMemo } from "react";
import { parseBalance } from "../functions";
import { useAPIASCENDBalance, useAPIStakedASCENDBalance } from "./useAPI";

export default function useRequiredBalance(
    account: string,
    amountRequired: number
) {
    const ascendBalance = useAPIASCENDBalance(account);
    const stakedBalance = useAPIStakedASCENDBalance(account);

    const pass = useMemo(() => {
        if (!ascendBalance || !stakedBalance) return null;
        return parseBalance(ascendBalance.add(stakedBalance)) >= amountRequired;
    }, [ascendBalance, stakedBalance, amountRequired]);

    return pass;
}
