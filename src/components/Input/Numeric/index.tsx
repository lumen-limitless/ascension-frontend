import { classNames, escapeRegExp } from "../../../functions";

import React from "react";
import Button from "../../Button";

export const Input = React.memo(
    ({
        max,
        value,
        onUserInput,
        placeholder,
        className,
        ...rest
    }: {
        max?: string;
        value: string | number;
        onUserInput: (input: string) => void;
        error?: boolean;
        fontSize?: string;
        align?: "right" | "left";
    } & Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as">) => {
        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            const amount = e.target.value;
            if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
                onUserInput(amount);
            }
        }
        return (
            <div className="relative flex justify-center items-center w-full">
                <input
                    {...rest}
                    value={value}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    // universal input options
                    inputMode="numeric"
                    title="Token Amount"
                    autoComplete="off"
                    autoCorrect="off"
                    // text-specific options
                    pattern="[0,9]"
                    placeholder={placeholder || "0.0"}
                    min={0}
                    minLength={1}
                    maxLength={79}
                    spellCheck="false"
                    className={classNames(
                        " bg-transparent shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  border-gray-300 rounded-md relative",
                        className
                    )}
                    type="text"
                    onPaste={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                />
                <Button
                    className="absolute right-0"
                    onClick={() => onUserInput(max)}
                >
                    MAX
                </Button>
            </div>
        );
    }
);

Input.displayName = "Numeric";

export default Input;
