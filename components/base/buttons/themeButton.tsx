import React from "react";
import { useTheme } from "next-themes";
import Dark from "../../svg/dark";
import Light from "../../svg/light";
import Pill from "./pill";

export default function ThemeButton() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <>
            {resolvedTheme === "light" ? (
                <Pill onClick={() => setTheme("dark")}>
                    <Dark />
                </Pill>
            ) : null}
            {resolvedTheme === "dark" ? (
                <Pill onClick={() => setTheme("light")}>
                    <Light />
                </Pill>
            ) : null}
        </>
    );
}
