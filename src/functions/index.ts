export * from "./validate";
export * from "./contracts";
export * from "./format";

export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}
