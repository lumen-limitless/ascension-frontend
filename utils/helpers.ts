export function shorter(text: string): string {
    return `${text.substring(0, 6)}...${text.substring(text.length - 4)}`;
}
