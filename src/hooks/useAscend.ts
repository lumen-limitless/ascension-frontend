import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import contractsInfo from "../constants/contractsInfo.json";
import { useContract, useTokenContract } from "./useContract";
import { formatUnits } from "@ethersproject/units";
import { useToast } from "./useToast";
import { usePromise } from "react-use";
import { ChainId, RPC_URL } from "../constants";

import {
    JsonRpcSigner,
    Web3Provider,
    JsonRpcProvider,
} from "@ethersproject/providers";
import useMulticall from "./useMulticall";
import { CallContext } from "ethereum-multicall/dist/esm/models";

export default function useAscend() {
    const { account, active, chainId, library } = useWeb3React<Web3Provider>();
    const mounted = usePromise();
    const toast = useToast(4000);
    const [ascendBalance, setAscendBalance] = useState<string>();
    const ascend = useContract(
        contractsInfo.contracts.AscensionToken.address,
        contractsInfo.contracts.AscensionToken.abi,
        new JsonRpcProvider(RPC_URL[parseInt(contractsInfo.chainId)])
    );

    const sAscend = useContract(
        contractsInfo.contracts.AscensionStakedToken.address,
        contractsInfo.contracts.AscensionStakedToken.abi,
        new JsonRpcProvider(RPC_URL[parseInt(contractsInfo.chainId)])
    );
    useEffect(() => {
        const get = async () => {
            if (active) {
                try {
                    const tBal: ethers.BigNumber = await mounted(
                        ascend.balanceOf(account)
                    );
                    const sBal: ethers.BigNumber = await mounted(
                        sAscend.balanceOf(account)
                    );
                    setAscendBalance(formatUnits(tBal.add(sBal)));
                } catch (err) {
                    console.error(err);
                }
            }
        };

        get();
    });

    async function approve(address: string, amount: ethers.BigNumberish) {
        if (!active || chainId != parseInt(contractsInfo.chainId)) {
            console.error("NETWORK ERROR");
            return;
        }
        try {
            if (library) {
                const tx = await ascend
                    .connect(library.getSigner())
                    .approve(address, amount);
                let receipt = await tx.wait();
                console.log(receipt);
                toast("success", "Approval successful");
            }
        } catch (err: any) {
            console.error(err);
            toast("error", `Error during approval`);
        }
    }

    return { ascend, ascendBalance, approve };
}
