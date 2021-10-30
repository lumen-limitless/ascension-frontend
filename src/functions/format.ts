import { getAddress } from "ethers/lib/utils";

export const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    try {
        const parsed = getAddress(address);
        return `${parsed.substring(0, chars + 2)}...${parsed.substring(
            42 - chars
        )}`;
    } catch (error) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
}

// shorten string to its maximum length using three dots
export function shortenString(string: string, length: number): string {
    if (!string) return "";
    if (length < 5) return string;
    if (string.length <= length) return string;
    return (
        string.slice(0, 4) +
        "..." +
        string.slice(string.length - length + 5, string.length)
    );
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function formatPercent(percentString: any) {
    const percent = parseFloat(percentString);
    if (!percent || percent === Infinity || percent === 0) {
        return "0%";
    }
    if (percent < 0.0001 && percent > 0) {
        return "< 0.0001%";
    }
    if (percent < 0 && percent > -0.0001) {
        return "< 0.0001%";
    }
    const fixedPercent = percent.toFixed(2);
    if (fixedPercent === "0.00") {
        return "0%";
    }
    if (Number(fixedPercent) > 0) {
        if (Number(fixedPercent) > 100) {
            return `${percent?.toFixed(0).toLocaleString()}%`;
        } else {
            return `${fixedPercent}%`;
        }
    } else {
        return `${fixedPercent}%`;
    }
}
