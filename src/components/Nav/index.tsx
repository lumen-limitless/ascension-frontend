import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useWeb3React } from "@web3-react/core";
import contractsInfo from "../../constants/contractsInfo.json";

interface NavProps {
    isMobile?: boolean;
}
export default function Nav({ isMobile }: NavProps): JSX.Element {
    const { pathname } = useRouter();

    return (
        <>
            {isMobile ? (
                <nav
                    id="mobilenav"
                    className="flex w-full h-full items-center justify-center mx-8 z-50 "
                >
                    <ul className="flex flex-col w-full h-full items-center justify-evenly p-4">
                        <li
                            title="Dashboard"
                            className={`w-full flex items-center justify-center  cursor-pointer`}
                        >
                            <Link href="/" passHref={true}>
                                <div
                                    className={` flex items-center justify-center w-full  text- hover:text-opacity-100 text-xl py-4 ${
                                        pathname === "/" ? " text-purple " : ""
                                    }`}
                                >
                                    Dashboard
                                </div>
                            </Link>
                        </li>

                        <li
                            title="Stake"
                            className={`w-full flex items-center justify-center  cursor-pointer`}
                        >
                            <Link href="/stake" passHref={true}>
                                <div
                                    className={` flex items-center justify-center w-full  text- hover:text-opacity-100 text-xl py-4 ${
                                        pathname === "/stake"
                                            ? "text-purple"
                                            : ""
                                    }`}
                                >
                                    Stake
                                </div>
                            </Link>
                        </li>

                        <li
                            title="Tools"
                            className={`w-full flex items-center justify-center  cursor-pointer`}
                        >
                            <Link href="/tools" passHref={true}>
                                <div
                                    className={` flex items-center justify-center w-full  text- hover:text-opacity-100 text-xl py-4 ${
                                        pathname === "/tools"
                                            ? " text-purple"
                                            : ""
                                    }`}
                                >
                                    Tools
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                //DESKTOP NAV------------------------------------------------------------------------------------------------------------------
                <nav
                    id="nav"
                    className="hidden md:flex  h-full w-3/6  items-center justify-center   mx-8 z-50"
                >
                    <ul className="flex content-center items-center justify-evenly w-full h-full my-auto">
                        <li
                            title="Dashboard"
                            className={`w-full h-full flex justify-center items-center  cursor-pointer  hover:opacity-80 ${
                                pathname === "/" ? " text-purple/100 " : null
                            }`}
                        >
                            <Link href="/" passHref={true}>
                                <div className="w-full h-full flex items-center justify-center">
                                    Dashboard
                                </div>
                            </Link>
                        </li>

                        <li
                            className={`w-full flex justify-center h-full items-center cursor-pointer  hover:opacity-80 ${
                                pathname === "/stake"
                                    ? "  text-purple/100 "
                                    : null
                            }`}
                        >
                            <Link href="/stake" passHref={true}>
                                <div className="w-full h-full flex items-center justify-center">
                                    Stake
                                </div>
                            </Link>
                        </li>

                        <li
                            title="Tools"
                            className={`w-full flex justify-center h-full items-center cursor-pointer  hover:opacity-80 ${
                                pathname === "/tools"
                                    ? " text-purple/100 "
                                    : null
                            }`}
                        >
                            <Link href="/tools" passHref={true}>
                                <div className="w-full h-full flex items-center justify-center">
                                    Tools
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}
