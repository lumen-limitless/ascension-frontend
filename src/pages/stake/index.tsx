import React, { useState } from "react";
import Card from "../../components/Card";
import useStaking from "../../hooks/useStaking";
import { useAscendBalance } from "../../hooks/useAscend";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Connect } from "../../components/Connection";
import Input from "../../components/Input";
import contractsInfo from "../../constants/contractsInfo.json";
import { SwitchNetworkButton } from "../../components/Button/switchNetworkButton";
import Container from "../../components/Container";
import Stat from "../../components/Stat";
import Skeleton from "../../components/Skeleton";
import Button from "../../components/Button";
import { ASCENSION } from "../../constants";
import useContractCall from "../../hooks/useContractCall";
import { useContract } from "../../hooks/useContract";
import { formatUnits } from "@ethersproject/units";
import Loader from "../../components/Loader";

export default function Stake() {
    const { account, active, chainId } = useWeb3React();
    const [amount, setAmount] = useState<string>("");
    const { approve, tokenBalance } = useAscendBalance();
    const ascend = useContract(
        ASCENSION.AscensionToken.address,
        ASCENSION.AscensionToken.abi,
        parseInt(contractsInfo.chainId)
    );
    const { data: allowance } = useContractCall([
        ascend,
        "allowance",
        account,
        ASCENSION.AscensionStaking.address,
    ]);

    const {
        staking,
        totalStaked,
        apy,
        userStake,
        earnings,
        rewardsEndAt,
        stake,
        withdraw,
        exit,
        getReward,
    } = useStaking();

    return (
        <Container maxWidth="2xl">
            <Stat
                title=""
                stats={[
                    { name: "APY", stat: apy, after: "%" },
                    {
                        name: "Total Staked",
                        stat: totalStaked,
                        commify: true,
                    },
                    {
                        name: "Rewards End",
                        stat: rewardsEndAt,
                    },
                ]}
            ></Stat>

            <Card className="" title="Stake ASCEND">
                {!active ? (
                    <>
                        <Connect />
                    </>
                ) : chainId !== parseInt(contractsInfo.chainId) ? (
                    <SwitchNetworkButton chainId="0x66EEB">
                        Switch to Arbitrum
                    </SwitchNetworkButton>
                ) : !allowance ? (
                    <Loader />
                ) : (
                    <>
                        <div>
                            {parseFloat(formatUnits(allowance)) === 0 ? (
                                <Button
                                    color="gradient"
                                    onClick={() => {
                                        approve(
                                            staking.address,
                                            ethers.utils.parseUnits("14400000")
                                        );
                                    }}
                                >
                                    Enable Staking Pool
                                </Button>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Input.Numeric
                                        value={amount}
                                        onUserInput={setAmount}
                                    />
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            stake(amount ?? "0");
                                        }}
                                    >
                                        Stake
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => withdraw(amount ?? "0")}
                                    >
                                        Withdraw
                                    </Button>
                                </div>
                            )}
                        </div>
                        {parseFloat(formatUnits(allowance)) > 0 && (
                            <>
                                <ul className="w-full text-left my-4 p-2    rounded-xl">
                                    <li className="w-full flex">
                                        Balance:{" "}
                                        {tokenBalance ? (
                                            ethers.utils.commify(
                                                parseFloat(
                                                    tokenBalance
                                                ).toFixed(2)
                                            ) + " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}{" "}
                                    </li>
                                    <li className="w-full flex">
                                        Stake:{" "}
                                        {userStake ? (
                                            ethers.utils.commify(
                                                parseFloat(userStake).toFixed(2)
                                            ) + " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </li>
                                    <li className="w-full flex">
                                        Earnings:{" "}
                                        {earnings ? (
                                            ethers.utils.commify(
                                                parseFloat(earnings).toFixed(2)
                                            ) + " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </li>
                                </ul>
                                <div className="flex flex-col w-full justify-center items-center">
                                    <Button
                                        color="green"
                                        className=" w-11/12 my-2"
                                        onClick={() => getReward()}
                                    >
                                        Collect Earnings
                                    </Button>
                                    <Button
                                        color="red"
                                        className="w-11/12 my-2 "
                                        onClick={() => exit()}
                                    >
                                        Exit Staking
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </Card>
            <div className="h-40 w-full"></div>
        </Container>
    );
}
