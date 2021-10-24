import React from "react";

interface InputProps {
    value?: number | string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
}
export default function NumberInput({ value, setAmount }: InputProps) {
    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setAmount(amount);
        }
    }

    return (
        <input
            type="text"
            value={value}
            placeholder="0.0"
            onPaste={(e) => {
                e.preventDefault();
                return false;
            }}
            inputMode="numeric"
            pattern="[0,9]"
            className="text-black bg-white border border-gray-200 rounded max-w-full"
            onChange={(e) => handleAmountChange(e)}
        />
    );
}
