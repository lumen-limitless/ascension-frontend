import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

export function useBalance() {
  const [balance, setBalance] = useState<string | undefined>();
  const { account, active, library } = useWeb3React();
  useEffect(() => {
    const getBalance = async () => {
      const bal = await library.getBalance(account);

      setBalance(ethers.utils.formatEther(bal));
    };

    if (active) {
      try {
        getBalance();
      } catch {
        setBalance("ERROR");
      }
    }
  }, [account, active, library]);

  return balance ? balance : "0";
}
