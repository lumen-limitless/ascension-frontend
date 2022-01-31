import React, { useState } from "react";
import Head from "next/head";
import Card from "../../components/Card";
import useStaking from "../../hooks/useStaking";
import { Connect } from "../../components/Connection";
import Input from "../../components/Input";
import { SwitchNetworkButton } from "../../components/Button/switchNetworkButton";
import Container from "../../components/Container";
import Stat from "../../components/Stat";
import Skeleton from "../../components/Skeleton";
import Button from "../../components/Button";
import { ASCENSION, HOME_CHAINID } from "../../constants";

import { parseUnits } from "@ethersproject/units";
import Loader from "../../components/Loader";
import { formatBalance, parseBalance } from "../../functions";

import {
    useContractFunction,
    useEthers,
    useTokenAllowance,
    useTokenBalance,
} from "@usedapp/core";
import { Contract } from "ethers";

export default function Stake() {
    const { account, chainId } = useEthers();
    const [amount, setAmount] = useState<string>("");
    const ascendBalance = useTokenBalance(
        ASCENSION.AscensionToken.address,
        account
    );

    const allowance = useTokenAllowance(
        ASCENSION.AscensionToken.address,
        account,
        ASCENSION.AscensionStaking.address
    );

    const approve = useContractFunction(
        new Contract(
            ASCENSION.AscensionToken.address,
            ASCENSION.AscensionToken.abi
        ),
        "approve",
        { transactionName: "Approve" }
    );

    const stake = useContractFunction(
        new Contract(
            ASCENSION.AscensionStaking.address,
            ASCENSION.AscensionStaking.abi
        ),
        "stake",
        { transactionName: "Stake" }
    );

    const withdraw = useContractFunction(
        new Contract(
            ASCENSION.AscensionStaking.address,
            ASCENSION.AscensionStaking.abi
        ),
        "withdraw",
        { transactionName: "Withdraw" }
    );

    const getReward = useContractFunction(
        new Contract(
            ASCENSION.AscensionStaking.address,
            ASCENSION.AscensionStaking.abi
        ),
        "getReward",
        { transactionName: "Get Reward" }
    );

    const exit = useContractFunction(
        new Contract(
            ASCENSION.AscensionStaking.address,
            ASCENSION.AscensionStaking.abi
        ),
        "exit",
        { transactionName: "Exit" }
    );

    const { balanceOf, earned, totalStaked, rewardsEndAt, apy, paused } =
        useStaking();

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
                {!account ? (
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
                                        approve
                                            .send(
                                                ASCENSION.AscensionStaking
                                                    .address,
                                                parseUnits("14400000")
                                            )
                                            .then(() =>
                                                console.log(approve.state)
                                            );
                                    }}
                                >
                                    {approve.state.status === "Mining" ? (
                                        <Loader />
                                    ) : (
                                        "Enable staking pool"
                                    )}
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
                                        size="xs"
                                        color="default"
                                        disabled={amount ? false : true}
                                        onClick={() => {
                                            stake
                                                .send(parseUnits(amount))
                                                .then(() =>
                                                    console.log(stake.state)
                                                );
                                        }}
                                    >
                                        Stake
                                    </Button>
                                    <Button
                                        size="xs"
                                        color="default"
                                        disabled={amount ? false : true}
                                        onClick={() => {
                                            withdraw
                                                .send(parseUnits(amount))
                                                .then(() =>
                                                    console.log(withdraw.state)
                                                );
                                        }}
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
                                        {balanceOf ? (
                                            formatBalance(balanceOf) + " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </li>
                                    <li className="w-full flex">
                                        earned:{" "}
                                        {earned ? (
                                            formatBalance(earned) + " ASCEND"
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
                                            balanceOf &&
                                            parseBalance(balanceOf) > 0 &&
                                            getReward.state.status !== "Mining"
                                                ? false
                                                : true
                                        }
                                        onClick={() => {
                                            getReward
                                                .send()
                                                .then(() =>
                                                    console.log(getReward.state)
                                                );
                                        }}
                                    >
                                        {getReward.state.status === "Mining" ? (
                                            <Loader />
                                        ) : (
                                            "Collect Earned"
                                        )}
                                    </Button>
                                    <Button
                                        color="red"
                                        className="w-11/12 my-2 "
                                        disabled={
                                            balanceOf &&
                                            parseBalance(balanceOf) > 0 &&
                                            exit.state.status !== "Mining"
                                                ? false
                                                : true
                                        }
                                        onClick={() => {
                                            exit.send().then(() =>
                                                console.log(exit.state)
                                            );
                                        }}
                                    >
                                        {exit.state.status === "Mining" ? (
                                            <Loader />
                                        ) : (
                                            "Exit Staking"
                                        )}
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
