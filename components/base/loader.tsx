import React from "react";
import Image from "next/image";
import loaderGif from "../../public/images/animated-rotation.gif";

export default function Loader() {
    return <Image alt="Loader" src={loaderGif} width="64px" height="64px" />;
}
