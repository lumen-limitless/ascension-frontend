import React from "react";
import Image from "next/image";
import Wallet from "./wallet";
import Connection from "./connection";
import Nav from "./nav";

export default function Header() {
  return (
    <header className=" text-white flex w-full px-8 py-1 justify-between items-center shadow-xl">
      <Image src="/images/ASCEND-logo-final.svg" alt="Ascension" width="48px" height="48px"></Image>

      <Nav />
      <div className="flex ml-auto">
        <Connection />
        <Wallet />
      </div>
    </header>
  );
}
