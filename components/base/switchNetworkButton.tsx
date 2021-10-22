import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import chainData from "../../utils/chainData";
import Pill, { PillProps } from "./pill";

interface SwitchNetworkButtonProps extends PillProps {
  chainId: string;
}

export function SwitchNetworkButton({ className, chainId, children }: SwitchNetworkButtonProps) {
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
              params: [{ chainId: chainId, rpcUrl: chainData[parseInt(chainId)].rpc /* ... */ }],
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
      <Pill className={`p-4 bg-green-600 ${className}`} onClick={() => switchNetwork(chainId)}>
        {children}
      </Pill>
    </>
  );
}
