import detectEthereumProvider from "@metamask/detect-provider";
import { useWeb3React } from "@web3-react/core";
import contractsInfo from "../utils/contractsInfo.json";

export default function useAddToken() {
    const { chainId } = useWeb3React();
    const addToken = async () => {
        const ethereum: any = await detectEthereumProvider();
        if (ethereum && chainId === parseInt(contractsInfo.chainId)) {
            try {
                await ethereum.request({
                    method: "wallet_watchAsset",
                    params: {
                        type: "ERC20", // Initially only supports ERC20, but eventually more!
                        options: {
                            address:
                                contractsInfo.contracts.AscensionToken.address, // The address that the token is at.
                            symbol: "ASCEND", // A ticker symbol or shorthand, up to 5 chars.
                            decimals: "18", // The number of decimals in the token
                            image: "https://ascensionprotocol.io/images/icon256.png", // A string url of the token logo
                        },
                    },
                });
            } catch (err) {
                console.error(err);
            }
        }
    };
    return addToken;
}
