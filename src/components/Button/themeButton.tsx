import React, { useCallback } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import Button from ".";

export default function ThemeButton() {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = useCallback(() => {
        if (resolvedTheme === "light") {
            setTheme("dark");
            console.log("Theme set to dark mode.");
        }
        if (resolvedTheme === "dark") {
            setTheme("light");
            console.log("Theme set to light mode.");
        }
    }, [setTheme, resolvedTheme]);

    return (
        <Button size="xs" onClick={toggleTheme}>
            {resolvedTheme === "light" && (
                <MoonIcon height="20px" className="fill-current text-black" />
            )}
            {resolvedTheme === "dark" && (
                <SunIcon height="20px" className="fill-current text-white" />
            )}
        </Button>
    );
}
