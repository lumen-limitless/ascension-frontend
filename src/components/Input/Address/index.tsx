import { classNames, escapeRegExp } from "../../../functions";
import React from "react";

const inputRegex = RegExp(`^\\d*$`); // match escaped "." characters via in a non-capturing group

export const Input = React.memo(
    ({
        value,
        onUserInput,
        placeholder,
        className,
        align,
        fontSize = "24px",
        ...rest
    }: {
        value: string;
        onUserInput: (input: string) => void;
        error?: boolean;
        fontSize?: string;
        align?: "right" | "left";
    } & Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as">) => {
        return (
            <>
                <input
                    value={value}
                    onChange={(event) => {
                        onUserInput(event.target.value);
                    }}
                    // universal input options
                    inputMode="text"
                    title="Address"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    placeholder="Address"
                    pattern="^(0x[a-fA-F0-9]{40})$"
                    // text-specific options
                    type="text"
                    className={classNames(
                        align === "right" && "text-right",
                        "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-black border-gray-300 rounded-md relative",
                        className
                    )}
                    style={{ fontSize }}
                    {...rest}
                />
            </>
        );
    }
);

Input.displayName = "Address";

export default Input;
