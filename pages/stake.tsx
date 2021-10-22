import React, { useState } from "react";
import Section from "../components/base/section";
import Card from "../components/base/card";
import useStaking from "../hooks/useStaking";
import useAscend from "../hooks/useAscend";
import { ethers } from "ethers";
import Pill from "../components/base/pill";
import { useWeb3React } from "@web3-react/core";
import { ConnectButton } from "../components/connection";
import Skeleton from "../components/base/skeleton";
import NumberInput from "../components/base/input";
import Stat from "../components/base/stat";
import contractsInfo from "../utils/contractsInfo.json";
import { useBalanceOf } from "ether-swr";
import { SwitchNetworkButton } from "../components/base/switchNetworkButton";

export default function Stake() {
  const { account, active, chainId } = useWeb3React();
  const { approve } = useAscend();
  const { data: balance } = useBalanceOf(
    contractsInfo.contracts.AscensionToken.address,
    account as string
  );
  const {
    staking,
    totalStaked,
    ROI,
    userStake,
    isEnabled,
    earnings,
    periodFinish,
    amount,
    setAmount,
    stake,
    withdraw,
    exit,
    getReward,
  } = useStaking();

  return (
    <Section>
      <Card className="bg-gray-800 my-4 w-full">
        <div className="flex w-full justify-evenly">
          <Stat title="ROI" value={ROI?.toString()} after="%" commify={true} />

          <Stat
            title="Total Staked"
            value={totalStaked ? ethers.utils.formatUnits(totalStaked) : undefined}
            commify={true}
            after=" ASCEND"
          />

          <Stat
            title="Rewards End"
            value={periodFinish ? new Date(periodFinish * 1000).toDateString() : undefined}
          />
        </div>
      </Card>
      <Card className="bg-gray-800  ">
        {!active ? (
          <>
            <h1>Connect wallet to stake</h1>
            <ConnectButton />
          </>
        ) : chainId !== parseInt(contractsInfo.chainId) ? (
          <SwitchNetworkButton chainId="0x66EEB">Switch to Arbitrum</SwitchNetworkButton>
        ) : (
          <>
            <h1 className="text-gray-400">Staking</h1>
            <p>Stake your ASCEND for rewards</p>
            <div>
              {!isEnabled ? (
                <Pill
                  className="p-4 w-full bg-blue-600"
                  onClick={() => approve(staking.address, ethers.utils.parseUnits("14400000"))}
                >
                  Enable Staking Pool
                </Pill>
              ) : (
                <>
                  <NumberInput value={amount} setAmount={setAmount} />
                  <div className="flex items-center justify-center">
                    <Pill
                      className="bg-blue-500 w-24"
                      onClick={() => stake(ethers.utils.parseUnits(amount))}
                    >
                      {" "}
                      Stake{" "}
                    </Pill>
                    <Pill
                      className="bg-yellow-500 w-24"
                      onClick={() => withdraw(ethers.utils.parseUnits(amount))}
                    >
                      Withdraw
                    </Pill>
                  </div>
                </>
              )}
            </div>
            {isEnabled ? (
              <>
                <ul className="w-full text-left my-4 p-2 border-2  border-gray-400 rounded-xl">
                  <li className="w-full flex">
                    Balance:{" "}
                    {balance ? (
                      ethers.utils.commify(
                        parseFloat(ethers.utils.formatUnits(balance)).toFixed(2)
                      ) + " ASCEND"
                    ) : (
                      <Skeleton />
                    )}{" "}
                  </li>
                  <li className="w-full flex">
                    Stake:{" "}
                    {userStake ? (
                      ethers.utils.commify(
                        parseFloat(ethers.utils.formatUnits(userStake)).toFixed(2)
                      ) + " ASCEND"
                    ) : (
                      <Skeleton />
                    )}
                  </li>
                  <li className="w-full flex">
                    Earnings:{" "}
                    {earnings ? (
                      ethers.utils.commify(
                        parseFloat(ethers.utils.formatUnits(earnings)).toFixed(2)
                      ) + " ASCEND"
                    ) : (
                      <Skeleton />
                    )}
                  </li>
                </ul>
                <Pill className="bg-green-500 w-11/12 " onClick={() => getReward()}>
                  Collect Earnings
                </Pill>
                <Pill className="bg-red-500 w-11/12 " onClick={() => exit()}>
                  Exit Staking
                </Pill>{" "}
              </>
            ) : null}
          </>
        )}
      </Card>
    </Section>
  );
}
