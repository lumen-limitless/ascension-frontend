import React from "react";
import Button from "../Button";
import ExternalLink from "../ExternalLink";

export default function BuyAscend() {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1>This tool requires 1 ASCEND</h1>
                <ExternalLink href="">
                    <Button color="gradient">Buy Now</Button>
                </ExternalLink>
            </div>
        </>
    );
}
