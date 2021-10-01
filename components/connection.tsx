import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { useEagerConnect, useInactiveListener } from "../hooks/web3hooks";
import Button from "./button";
import { injected } from "../utils/connectors";
import chainData from "../utils/chainData";

export default function Connection() {
  const { active, activate, connector, chainId } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();
  const triedEager = useEagerConnect();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useInactiveListener(!triedEager || !activatingConnector);

  return (
    <>
      {!active ? (
        <Button color="bg-blue-600" onClick={() => activate(injected)}>
          Connect
        </Button>
      ) : (
        <span className={`${chainId ? chainData[chainId].color : "bg-gray-600"} hidden md:block`}>
          {chainId ? chainData[chainId].name : "NA"}
        </span>
      )}
    </>
  );
}
