import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import contractsInfo from "../constants/contractsInfo.json";

export default function useAddTokenToMetaMask(
    tokenToAdd?: string,
    symbol?: string,
    decimals?: string
): {
    addToken: () => void;
    success: boolean | undefined;
} {
    const { chainId, library } = useWeb3React();

    const [success, setSuccess] = useState<boolean | undefined>();

    const addToken = useCallback(() => {
        if (
            library &&
            library.provider.isMetaMask &&
            library.provider.request &&
            isAddress(tokenToAdd)
        ) {
            library.provider
                .request({
                    method: "wallet_watchAsset",
                    params: {
                        //@ts-ignore // need this for incorrect ethers provider type
                        type: "ERC20",
                        options: {
                            address:
                                tokenToAdd ??
                                contractsInfo.contracts.AscensionToken.address,
                            symbol: symbol ?? "ASCEND",
                            decimals: decimals ?? "18",
                            image:
                                "https://ascensionprotocol.io/images/icon256.png",
                        },
                    },
                })
                .then((success) => {
                    setSuccess(success);
                })
                .catch(() => setSuccess(false));
        } else {
            setSuccess(false);
        }
    }, [library, decimals, symbol, tokenToAdd]);

    return { addToken, success };
}
