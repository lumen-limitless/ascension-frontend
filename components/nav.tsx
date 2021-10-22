import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useWeb3React } from "@web3-react/core";
import contractsInfo from "../utils/contractsInfo.json";

interface NavProps {
  isMobile?: boolean;
}
export default function Nav({ isMobile }: NavProps): JSX.Element {
  const { pathname } = useRouter();
  const { chainId } = useWeb3React();
  return (
    <>
      {isMobile ? (
        <nav id="mobilenav" className="flex w-full h-full items-center justify-center  mx-8 z-50">
          <ul className="flex flex-col w-full h-full items-center justify-evenly p-4">
            <li
              title="Dashboard"
              className={`w-full flex items-center justify-center  cursor-pointer`}
            >
              <Link href="/" passHref={true}>
                <div
                  className={` flex items-center justify-center w-full text-white text-opacity-50 hover:text-opacity-100 text-xl ${
                    pathname === "/" ? " text-opacity-100" : ""
                  }`}
                >
                  Dashboard
                </div>
              </Link>
            </li>

            {chainId?.toString() === contractsInfo.chainId ? (
              <li
                title="Stake"
                className={`w-full flex items-center justify-center  cursor-pointer`}
              >
                <Link href="/stake" passHref={true}>
                  <div
                    className={` flex items-center justify-center w-full text-white text-opacity-50 hover:text-opacity-100 text-xl  ${
                      pathname === "/stake" ? "text-opacity-100" : ""
                    }`}
                  >
                    Stake
                  </div>
                </Link>
              </li>
            ) : null}

            <li title="Tools" className={`w-full flex items-center justify-center  cursor-pointer`}>
              <Link href="/tools" passHref={true}>
                <div
                  className={` flex items-center justify-center w-full text-white text-opacity-50 hover:text-opacity-100 text-xl ${
                    pathname === "/tools" ? " text-opacity-100" : ""
                  }`}
                >
                  Tools
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav
          id="nav"
          className="hidden md:flex  h-full w-3/6  items-center justify-center  text-white mx-8 z-50"
        >
          <ul className="flex content-center items-center justify-evenly w-full h-full my-auto">
            <li
              title="Home"
              className={`w-full h-full flex justify-center items-center  cursor-pointer opacity-50 hover:opacity-100 ${
                pathname === "/" ? "border-b-2 border-purple-500 opacity-100" : null
              }`}
            >
              <Link href="/" passHref={true}>
                <div className="w-full h-full flex items-center justify-center">Home</div>
              </Link>
            </li>

            {chainId?.toString() === contractsInfo.chainId ? (
              <li
                className={`w-full flex justify-center h-full items-center cursor-pointer opacity-50 hover:opacity-80 ${
                  pathname === "/stake" ? "border-b-2 border-purple-500 opacity-100" : null
                }`}
              >
                <Link href="/stake" passHref={true}>
                  <div className="w-full h-full flex items-center justify-center">Stake</div>
                </Link>
              </li>
            ) : null}

            <li
              title="Tools"
              className={`w-full flex justify-center h-full items-center cursor-pointer opacity-50 hover:opacity-100 ${
                pathname === "/tools" ? "border-b-2 border-purple-500 opacity-100" : null
              }`}
            >
              <Link href="/tools" passHref={true}>
                <div className="w-full h-full flex items-center justify-center">Tools</div>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
