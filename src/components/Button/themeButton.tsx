import React from "react";
import { useTheme } from "next-themes";
import Pill from "./pill";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

export default function ThemeButton() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <>
            {resolvedTheme === "light" ? (
                <button className="p-2" onClick={() => setTheme("dark")}>
                    <MoonIcon
                        height="20px"
                        className="fill-current text-black"
                    />
                </button>
            ) : null}
            {resolvedTheme === "dark" ? (
                <button className="p-2" onClick={() => setTheme("light")}>
                    <SunIcon
                        height="20px"
                        className="fill-current text-white"
                    />
                </button>
            ) : null}
        </>
    );
}
