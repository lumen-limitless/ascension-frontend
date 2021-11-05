import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Pill from "./pill";
import Button from ".";
import { RPC_URL } from "../../constants";

export function SwitchNetworkButton({ className, chainId, children }: any) {
    const switchNetwork = async (chainId: string) => {
        const ethereum: any = await detectEthereumProvider();
        if (ethereum) {
            try {
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }],
                });
            } catch (switchError: any) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: chainId,
                                    rpcUrl: RPC_URL[chainId],
                                },
                            ],
                        });
                    } catch (addError) {
                        // handle "add" error
                    }
                }
                // handle other "switch" errors
            }
        }
    };

    return (
        <>
            <Button color="blue" onClick={() => switchNetwork(chainId)}>
                {children}
            </Button>
        </>
    );
}
