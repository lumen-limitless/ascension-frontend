import { ChainId, useContractFunction } from "@usedapp/core";
import { useEffect } from "react";
import { useToggle } from "react-use";
import { ReactorOptions } from ".";
import { useContract } from "../../../hooks/useContract";
import { useToast } from "../../../hooks/useToast";

export default function Reactor({
    address,
    options,
    chainId,
}: {
    address: string;
    options: ReactorOptions;
    chainId: ChainId;
}) {
    const toast = useToast();
    const [active, toggleActive] = useToggle(false);
    const contract = useContract(address, options.abi, chainId);
    const functionCall = useContractFunction(contract, options.function, {
        transactionName: "Reactor Call",
    });
    useEffect(() => {
        if (!active) return;
        if (functionCall.state.status !== "None") return;

        contract.once(options.event, () => {
            console.log("sending function call");
            functionCall.send(options.args);
            toggleActive(false);
        });

        return () => {
            contract.removeAllListeners();
        };
    }, [options, chainId, contract, functionCall, active, toggleActive]);

    return <>{functionCall.state.status}</>;
}
