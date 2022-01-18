import React, { useState } from "react";
import Head from "next/head";
import Card from "../../components/Card";
import useStaking from "../../hooks/useStaking";
import { useAscendBalance } from "../../hooks/useAscend";
import { useWeb3React } from "@web3-react/core";
import { Connect } from "../../components/Connection";
import Input from "../../components/Input";
import { SwitchNetworkButton } from "../../components/Button/switchNetworkButton";
import Container from "../../components/Container";
import Stat from "../../components/Stat";
import Skeleton from "../../components/Skeleton";
import Button from "../../components/Button";
import { ASCENSION, HOME_CHAINID } from "../../constants";
import useContractCall from "../../hooks/useContractCall";
import { useContract } from "../../hooks/useContract";
import { parseUnits } from "@ethersproject/units";
import Loader from "../../components/Loader";
import { formatBalance, parseBalance } from "../../functions";

export default function Stake() {
    const { account, active, chainId } = useWeb3React();
    const [amount, setAmount] = useState<string>("");
    const { approve, ascendBalance } = useAscendBalance();
    const ascend = useContract(
        ASCENSION.AscensionToken.address,
        ASCENSION.AscensionToken.abi,
        HOME_CHAINID
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
        paused,
        stake,
        withdraw,
        exit,
        getReward,
    } = useStaking();

    return (
        <Container maxWidth="4xl">
            <Head>
                <title>Stake | Ascension Protocol</title>
                <meta
                    key="description"
                    name="description"
                    content="Ascension Protocol staking"
                />
            </Head>
            <Stat
                title=""
                stats={[
                    { name: "APY", stat: apy, isPercent: true },
                    {
                        name: "Total Staked",
                        stat: totalStaked,
                        isBalance: true,
                    },
                    {
                        name: "Rewards End",
                        stat: rewardsEndAt,
                    },
                ]}
            ></Stat>

            <Card className="mb-20" title="Stake ASCEND">
                {!active ? (
                    <>
                        <Connect />
                    </>
                ) : chainId != HOME_CHAINID ? (
                    <SwitchNetworkButton chainId={HOME_CHAINID}>
                        Switch to Arbitrum
                    </SwitchNetworkButton>
                ) : !allowance || typeof paused == "undefined" ? (
                    <Loader />
                ) : paused ? (
                    <>
                        <Loader message="Staking inactive, please check back later." />
                    </>
                ) : (
                    <>
                        <div>
                            {parseBalance(allowance) === 0 ? (
                                <Button
                                    color="gradient"
                                    onClick={() => {
                                        approve(
                                            staking.address,
                                            parseUnits("14400000")
                                        );
                                    }}
                                >
                                    Enable Staking Pool
                                </Button>
                            ) : (
                                <div className="flex md:mr-32">
                                    <Input.Numeric
                                        value={amount}
                                        onUserInput={setAmount}
                                        max={
                                            ascendBalance
                                                ? formatBalance(ascendBalance)
                                                : "0"
                                        }
                                    />

                                    <Button
                                        size="sm"
                                        color="default"
                                        disabled={amount ? false : true}
                                        onClick={() => {
                                            stake(amount ?? "0");
                                        }}
                                    >
                                        Stake
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="default"
                                        disabled={amount ? false : true}
                                        onClick={() => withdraw(amount ?? "0")}
                                    >
                                        Withdraw
                                    </Button>
                                </div>
                            )}
                        </div>
                        {parseBalance(allowance) > 0 && (
                            <>
                                <ul className="w-full text-left my-4 p-2    rounded-xl">
                                    <li className="w-full flex">
                                        Balance:{" "}
                                        {ascendBalance ? (
                                            formatBalance(ascendBalance) +
                                            " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}{" "}
                                    </li>
                                    <li className="w-full flex">
                                        Stake:{" "}
                                        {userStake ? (
                                            formatBalance(userStake) + " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </li>
                                    <li className="w-full flex">
                                        Earnings:{" "}
                                        {earnings ? (
                                            formatBalance(earnings) + " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </li>
                                </ul>
                                <div className="flex flex-col w-full justify-center items-center">
                                    <Button
                                        color="green"
                                        className=" w-11/12 my-2"
                                        disabled={
                                            userStake &&
                                            parseBalance(userStake) > 0
                                                ? false
                                                : true
                                        }
                                        onClick={() => getReward()}
                                    >
                                        Collect Earnings
                                    </Button>
                                    <Button
                                        color="red"
                                        className="w-11/12 my-2 "
                                        disabled={
                                            userStake &&
                                            parseBalance(userStake) > 0
                                                ? false
                                                : true
                                        }
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
        </Container>
    );
}
