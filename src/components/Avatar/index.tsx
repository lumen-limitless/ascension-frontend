import React from "react";
import { useEthers } from "@usedapp/core";
import makeBlockie from "ethereum-blockies-base64";
import Image from "next/image";
import { BURN_ADDRESS } from "../../constants";
export default function Avatar({ size = 64 }) {
    const { account } = useEthers();

    return (
        <Image
            src={makeBlockie(account ?? BURN_ADDRESS)}
            alt="Blockie"
            width={size}
            height={size}
            className="rounded-full "
        />
    );
}
