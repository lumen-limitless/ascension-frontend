import { useWeb3React } from "@web3-react/core";
import React from "react";
import Pill from "./base/pill";

export default function Wallet() {
  const { account, active, deactivate } = useWeb3React();
  return (
    <>
      {active ? (
        <>
          <Pill className="bg-gradient-to-r from-indigo-700  to-purple-700 flex">
            {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ""}
          </Pill>
        </>
      ) : null}
    </>
  );
}
