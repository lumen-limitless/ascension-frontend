import React from "react";
import Card from "../../components/Card";
import useStaking from "../../hooks/useStaking";
import useAscend from "../../hooks/useAscend";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { ConnectButton } from "../../components/Connection";
import Input from "../../components/Input";
import contractsInfo from "../../constants/contractsInfo.json";
import { useBalanceOf } from "ether-swr";
import { SwitchNetworkButton } from "../../components/Button/switchNetworkButton";
import Container from "../../components/Container";
import Stat from "../../components/Stat";
import Skeleton from "../../Skeleton";
import Button from "../../components/Button";

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
        rewardsEndAt,
        amount,
        setAmount,
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
                    { name: "APY", stat: ROI, commify: true, after: "%" },
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

            <Card
                className=""
                title="Staking"
                description="Stake your ASCEND for rewards"
            >
                {!active ? (
                    <>
                        <h1>Connect wallet to stake</h1>
                        <ConnectButton />
                    </>
                ) : chainId !== parseInt(contractsInfo.chainId) ? (
                    <SwitchNetworkButton chainId="0x66EEB">
                        Switch to Arbitrum
                    </SwitchNetworkButton>
                ) : (
                    <>
                        <div>
                            {!isEnabled ? (
                                <Button
                                    color="green"
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
                                <>
                                    <Input.Numeric
                                        value={amount}
                                        onUserInput={setAmount}
                                    />
                                    <div className="flex items-center justify-center">
                                        <Button
                                            color="blue"
                                            onClick={() => {
                                                stake(amount ?? "0");
                                            }}
                                        >
                                            {" "}
                                            Stake{" "}
                                        </Button>
                                        <Button
                                            color="blue"
                                            onClick={() =>
                                                withdraw(amount ?? "0")
                                            }
                                        >
                                            Withdraw
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                        {isEnabled ? (
                            <>
                                <ul className="w-full text-left my-4 p-2    rounded-xl">
                                    <li className="w-full flex">
                                        Balance:{" "}
                                        {balance ? (
                                            ethers.utils.commify(
                                                parseFloat(
                                                    ethers.utils.formatUnits(
                                                        balance
                                                    )
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
                                                parseFloat(
                                                    ethers.utils.formatUnits(
                                                        userStake
                                                    )
                                                ).toFixed(2)
                                            ) + " ASCEND"
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </li>
                                    <li className="w-full flex">
                                        Earnings:{" "}
                                        {earnings ? (
                                            ethers.utils.commify(
                                                parseFloat(
                                                    ethers.utils.formatUnits(
                                                        earnings
                                                    )
                                                ).toFixed(2)
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
                        ) : null}
                    </>
                )}
            </Card>
        </Container>
    );
}
