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
} from "@usedapp/core";
import { Contract } from "ethers";
import { useASCENDBalance } from "../../hooks/useASCEND";

export default function StakePage() {
    const { account, chainId } = useEthers();
    const [amount, setAmount] = useState<string>("");
    const ascendBalance = useASCENDBalance(account);

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
        { transactionName: "Approve Deposit" }
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

            <Card className="mb-24" title="Stake ASCEND">
                {!account ? (
                    <>
                        <Connect />
                    </>
                ) : chainId != HOME_CHAINID ? (
                    <SwitchNetworkButton chainId={HOME_CHAINID}>
                        Switch to Arbitrum
                    </SwitchNetworkButton>
                ) : !allowance ? (
                    <Loader />
                ) : paused ? (
                    <>
                        <Loader message="Staking inactive, please check back later." />
                    </>
                ) : (
                    <>
                        <div>
                            {parseBalance(allowance) === 0 ? (
                                <>
                                    <h2>Step 1/2</h2>
                                    <Button
                                        color="gradient"
                                        disabled={
                                            approve.state.status === "None"
                                                ? false
                                                : true
                                        }
                                        onClick={() => {
                                            approve.send(
                                                ASCENSION.AscensionStaking
                                                    .address,
                                                parseUnits("14400000")
                                            );
                                        }}
                                    >
                                        {approve.state.status === "None" ? (
                                            "Enable staking deposits"
                                        ) : (
                                            <Loader />
                                        )}
                                    </Button>
                                </>
                            ) : (
                                <div className="flex md:mr-32">
                                    <Input.Numeric
                                        value={amount}
                                        onUserInput={setAmount}
                                        max={
                                            ascendBalance
                                                ? parseBalance(
                                                      ascendBalance
                                                  ).toString()
                                                : "0"
                                        }
                                    />

                                    <Button
                                        size="sm"
                                        disabled={amount ? false : true}
                                        onClick={() => {
                                            stake.send(parseUnits(amount));
                                        }}
                                    >
                                        Stake
                                    </Button>
                                    <Button
                                        size="sm"
                                        disabled={amount ? false : true}
                                        onClick={() => {
                                            withdraw.send(parseUnits(amount));
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
                                            earned &&
                                            parseBalance(earned) > 0 &&
                                            getReward.state.status === "None"
                                                ? false
                                                : true
                                        }
                                        onClick={() => {
                                            getReward
                                                .send()
                                                .then(() =>
                                                    getReward.resetState()
                                                );
                                        }}
                                    >
                                        {getReward.state.status !== "None" ? (
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
                                            exit.state.status === "None"
                                                ? false
                                                : true
                                        }
                                        onClick={() => {
                                            exit.send().then(() =>
                                                exit.resetState()
                                            );
                                        }}
                                    >
                                        {exit.state.status != "None" ? (
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
