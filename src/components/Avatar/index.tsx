import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "ethers/node_modules/@ethersproject/providers";
import React from "react";
import Blockies from "react-blockies";

export default function Avatar() {
    const { account } = useWeb3React<Web3Provider>();
    return (
        <Blockies seed={account} size={20}  className="rounded-full" />
    );
}
