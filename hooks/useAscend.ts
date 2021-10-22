import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import contractsInfo from "../utils/contractsInfo.json";
import { useContract } from "./useContract";
import { Web3Provider } from "ether-swr";
import { formatUnits } from "@ethersproject/units";

export default function useAscend() {
  const { account, active, chainId, library } = useWeb3React<Web3Provider>();
  const [ascendBalance, setAscendBalance] = useState<string>();
  const ascend = useContract(
    contractsInfo.contracts.AscensionToken.address,
    contractsInfo.contracts.AscensionToken.abi
  );
  const sAscend = useContract(
    contractsInfo.contracts.AscensionStakedToken.address,
    contractsInfo.contracts.AscensionStakedToken.abi
  );
  useEffect(() => {
    const get = async () => {
      if (active) {
        try {
          const tBal: ethers.BigNumber = await ascend.balanceOf(account);
          const sBal: ethers.BigNumber = await sAscend.balanceOf(account);
          setAscendBalance(formatUnits(tBal.add(sBal)));
        } catch (err) {
          console.error(err);
        }
      }
    };

    get();
  }, [ascend, sAscend, account, active]);

  async function approve(address: string, amount: ethers.BigNumberish) {
    if (!active || chainId != parseInt(contractsInfo.chainId)) {
      console.error("Invalid chain");
      return;
    }
    try {
      if (library) {
        const tx = await ascend.connect(library.getSigner()).approve(address, amount);
        await tx.wait();
      }
    } catch {
      console.error;
    }
  }

  return { ascend, ascendBalance, approve };
}
