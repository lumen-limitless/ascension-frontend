import React, { useEffect, useState } from "react";
import { useContract } from "./useContract";
import contractsInfo from "../constants/contractsInfo.json";
import { useWeb3React } from "@web3-react/core";
import useEtherSWR from "ether-swr";

export function useDistributor() {
    const { account, library } = useWeb3React();
    const distributor = useContract(
        contractsInfo.contracts.AscensionDiamond.address,
        contractsInfo.contracts.ERC20DistributorFacet.abi
    );

    const { data: distributionCount } = useEtherSWR([
        contractsInfo.contracts.AscensionDiamond.address,
        "distributionCount",
    ]);

    async function withdrawAll() {}

    return {
        distributionCount,
    };
}
