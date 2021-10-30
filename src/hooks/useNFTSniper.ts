import React, { useState, useEffect, useMemo } from "react";
import { OpenSeaPort, Network, EventType } from "opensea-js";
import { useWeb3React } from "@web3-react/core";
import { Order } from "opensea-js/lib/types";
import { ethers } from "ethers";

const SUPPORTED_CHAINS = [1, 4];
export default function useNFTSniper() {
  const { account, library, active, chainId } = useWeb3React();
  const [target, setTarget] = useState<string>();
  const [targetInput, setTargetInput] = useState<string>("");
  const [settingTarget, setSettingTarget] = useState(false);
  const [status, setStatus] = useState<number>(0);

  const seaport = useMemo(
    () =>
      new OpenSeaPort(library, {
        networkName: chainId === 1 ? Network.Main : Network.Rinkeby,
      }),
    [library, chainId]
  );

  useEffect(() => {}, [active, account, target, seaport, status]);

  const updateTarget = () => {
    if (!targetInput) {
      return;
    }
    if (!ethers.utils.isAddress(targetInput)) {
      alert("invalid target address");
      setTargetInput("");
      return;
    }
    setTarget(ethers.utils.getAddress(targetInput));
    setSettingTarget(false);
  };
  const toggleStatus = () => {
    if (status === 0) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };
  return {
    SUPPORTED_CHAINS,
    target,
    updateTarget,
    targetInput,
    setTargetInput,
    settingTarget,
    setSettingTarget,
    status,
    toggleStatus,
  };
}
