import { classNames } from "../../../functions";
import React from "react";

export const Input = React.memo(
    ({
        value,
        onUserInput,
        placeholder = "Address",
        className,
        ...rest
    }: {
        value: string;
        onUserInput: (input: string) => void;
        error?: boolean;
        fontSize?: string;
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
                    placeholder={placeholder}
                    pattern="^(0x[a-fA-F0-9]{40})$"
                    // text-specific options
                    type="text"
                    className={classNames(
                        " bg-transparent shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  border-gray-300 rounded-md relative",
                        className
                    )}
                    {...rest}
                />
            </>
        );
    }
);

Input.displayName = "Address";

export default Input;
