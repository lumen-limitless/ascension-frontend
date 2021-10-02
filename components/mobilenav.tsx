import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

interface NavProps {}

export default function MobileNav(): JSX.Element {
  const { pathname } = useRouter();

  return (
    <nav className="flex md:hidden  h-full w-3/6  items-center justify-center  text-white mx-8">
      <ul className="flex flex-col content-center items-center  justify-evenly w-full h-full my-auto">
        <li
          title="Dashboard"
          className={`w-full flex justify-center items-center h-full cursor-pointer opacity-50 hover:opacity-100 ${
            pathname === "/" ? "border-b-2 border-purple-500 opacity-100" : null
          }`}
        >
          <Link href="/" passHref={true}>
            <div className="w-full h-full flex items-center justify-center">Dashboard</div>
          </Link>
        </li>
        <li
          className={`w-full flex justify-center h-full items-center cursor-pointer opacity-50 hover:opacity-80 ${
            pathname === "/gov" ? "border-b-2 border-purple-500 opacity-100" : null
          }`}
        >
          <Link href="/gov" passHref={true}>
            <div className="w-full h-full flex items-center justify-center">Governance</div>
          </Link>
        </li>{" "}
        <li
          title="Tools"
          className={`w-full flex justify-center h-full items-center cursor-pointer opacity-50 hover:opacity-100 ${
            pathname === "/sniper" ? "border-b-2 border-purple-500 opacity-100" : null
          }`}
        >
          <Link href="/sniper" passHref={true}>
            <div className="w-full h-full flex items-center justify-center">Tools</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
