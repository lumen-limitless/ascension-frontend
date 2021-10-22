import { useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useContract } from "./useContract";
import useEtherSWR from "ether-swr";
import contractsInfo from "../utils/contractsInfo.json";

export default function useStaking() {
  const { account, active, chainId, library } = useWeb3React();
  const [amount, setAmount] = useState<string>("");
  const staking = useContract(
    contractsInfo.contracts.AscensionStaking.address,
    contractsInfo.contracts.AscensionStaking.abi
  );

  const { data: totalStaked } = useEtherSWR([
    contractsInfo.contracts.AscensionStaking.address,
    "totalStaked",
  ]);
  const { data: periodFinish } = useEtherSWR([
    contractsInfo.contracts.AscensionStaking.address,
    "periodFinish",
  ]);
  const { data: userStake } = useEtherSWR([
    contractsInfo.contracts.AscensionStaking.address,
    "balanceOf",
    account,
  ]);
  const { data: earnings } = useEtherSWR([
    contractsInfo.contracts.AscensionStaking.address,
    "earned",
    account,
  ]);
  const { data: allowance } = useEtherSWR([
    contractsInfo.contracts.AscensionToken.address,
    "allowance",
    account,
    contractsInfo.contracts.AscensionStaking.address,
  ]);

  const ROI = useMemo(() => {
    try {
      if (totalStaked) {
        const ROI =
          parseFloat(totalStaked) > 0
            ? (1000000 / parseInt(ethers.utils.formatUnits(totalStaked))) * 100
            : 1000000;
        return ROI.toFixed();
      }
    } catch (err) {
      console.error(err);
    }
  }, [totalStaked]);

  async function stake(amount: ethers.BigNumberish) {
    if (!active || chainId != parseInt(contractsInfo.chainId)) {
      console.error("NETWORK ERROR");
      return;
    }
    try {
      await staking.connect(library.getSigner()).stake(amount);
    } catch (err) {
      console.error;
    }
  }
  async function withdraw(amount: ethers.BigNumberish) {
    if (!active || chainId != parseInt(contractsInfo.chainId)) {
      console.error("NETWORK ERROR");
      return;
    }
    try {
      await staking.connect(library.getSigner()).withdraw(amount);
    } catch (err) {
      console.error;
    }
  }
  async function exit() {
    if (!active || chainId != parseInt(contractsInfo.chainId)) {
      console.error("NETWORK ERROR");
      return;
    }
    try {
      await staking.connect(library.getSigner()).exit();
    } catch (err) {
      console.error;
    }
  }

  async function getReward() {
    if (!active || chainId != parseInt(contractsInfo.chainId)) {
      console.error("NETWORK ERROR");
      return;
    }
    try {
      await staking.connect(library.getSigner()).getReward();
    } catch (err) {
      console.error;
    }
  }

  return {
    staking,
    totalStaked,
    ROI,
    isEnabled: allowance && parseFloat(ethers.utils.formatUnits(allowance)) > 0 ? true : false,
    userStake,
    earnings,
    periodFinish,
    amount,
    setAmount,
    stake,
    withdraw,
    exit,
    getReward,
  };
}
