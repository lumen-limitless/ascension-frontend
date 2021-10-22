import { useMemo } from "react";
import { ethers } from "ethers";
import chainData from "../utils/chainData";
import contractsInfo from "../utils/contractsInfo.json";

//connect to a contract, with optional signerOrProvider. Defaults to primary chain provider
export function useContract(
  address: string,
  abi: any,
  signerOrProvider?: ethers.providers.Provider | ethers.Signer
) {
  const contract = useMemo(() => {
    return new ethers.Contract(
      address,
      abi,
      signerOrProvider ??
        new ethers.providers.JsonRpcProvider(chainData[parseInt(contractsInfo.chainId)].rpc)
    );
  }, [abi, address, signerOrProvider]);

  return contract;
}
