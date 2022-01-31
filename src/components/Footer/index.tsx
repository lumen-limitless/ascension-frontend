import ExternalLink from "../ExternalLink";
import { ChainId, useEthers } from "@usedapp/core";

const Footer = () => {
    const { chainId } = useEthers();

    return (
        <footer className="relative bottom-0 text-low-emphesis w-full h-[10vh] flex">
            {chainId && chainId === ChainId.Polygon && (
                <ExternalLink
                    id={`polygon-bridge-link`}
                    href="https://wallet.matic.network/bridge/"
                    className="text-low-emphesis absolute bottom-0"
                >
                    {`Matic Bridge`}
                </ExternalLink>
            )}
            {chainId && chainId === ChainId.Arbitrum && (
                <ExternalLink
                    id={`arbitrum-bridge-link`}
                    href="https://bridge.arbitrum.io/"
                    className="text-low-emphesis absolute bottom-0"
                >
                    {`Arbitrum Bridge`}
                </ExternalLink>
            )}
            {chainId && chainId === ChainId.Harmony && (
                <ExternalLink
                    id={`harmony-bridge-link`}
                    href=" https://bridge.harmony.one/tokens"
                    className="text-low-emphesis absolute bottom-0"
                >
                    {`Harmony Bridge`}
                </ExternalLink>
            )}
            {chainId && chainId === ChainId.xDai && (
                <ExternalLink
                    id={`xdai-bridge-link`}
                    href=" https://omni.xdaichain.com/"
                    className="text-low-emphesis absolute bottom-0"
                >
                    {`xDai Bridge`}
                </ExternalLink>
            )}

            {chainId && chainId === ChainId.Palm && (
                <ExternalLink
                    id={`palm-bridge-link`}
                    href=" https://app.palm.io/bridge"
                    className="text-low-emphesis absolute bottom-0"
                >
                    {`Palm Bridge`}
                </ExternalLink>
            )}
        </footer>
    );
};

export default Footer;
