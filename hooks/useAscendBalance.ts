import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

export function useAscendBalance() {
  const [balance, setBalance] = useState<string | undefined>();
  const { account, active } = useWeb3React();
  useEffect(() => {
    const mainProvider = new ethers.providers.JsonRpcProvider(
      "https://arb-rinkeby.g.alchemy.com/v2/fVMS0IOOy-uC_2w1sCooihRBSbxD57NN"
    );

    const getBalance = async () => {
      const ascend = new ethers.Contract(
        "0xf992515ea4c1ad926b5667aF89Fe3d492b28CC90",
        ["function balanceOf(address account) external view returns(uint256)"],
        mainProvider
      );
      const bal = await ascend.balanceOf(account);

      setBalance(ethers.utils.formatEther(bal));
    };

    if (active) {
      getBalance();
    }
  }, [account, active]);

  return balance ? balance : "0";
}
