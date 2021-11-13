import { ChainId } from "../../constants";
import ExternalLink from "../ExternalLink";
import { useWeb3React } from "@web3-react/core";

const Footer = () => {
    const { chainId } = useWeb3React();

    return (
        <footer className="absolute bottom-0 text-low-emphesis w-full">
            <div className="flex right-1/2 ">
                {chainId && chainId === ChainId.MATIC && (
                    <ExternalLink
                        id={`polygon-bridge-link`}
                        href="https://wallet.matic.network/bridge/"
                        className="text-low-emphesis"
                    >
                        {`Matic Bridge`}
                    </ExternalLink>
                )}
                {chainId && chainId === ChainId.ARBITRUM && (
                    <ExternalLink
                        id={`arbitrum-bridge-link`}
                        href="https://bridge.arbitrum.io/"
                        className="text-low-emphesis"
                    >
                        {`Arbitrum Bridge`}
                    </ExternalLink>
                )}
                {chainId && chainId === ChainId.HARMONY && (
                    <ExternalLink
                        id={`harmony-bridge-link`}
                        href=" https://bridge.harmony.one/tokens"
                        className="text-low-emphesis"
                    >
                        {`Harmony Bridge`}
                    </ExternalLink>
                )}
                {chainId && chainId === ChainId.XDAI && (
                    <ExternalLink
                        id={`xdai-bridge-link`}
                        href=" https://omni.xdaichain.com/"
                        className="text-low-emphesis"
                    >
                        {`xDai Bridge`}
                    </ExternalLink>
                )}

                {chainId && chainId === ChainId.PALM && (
                    <ExternalLink
                        id={`palm-bridge-link`}
                        href=" https://app.palm.io/bridge"
                        className="text-low-emphesis"
                    >
                        {`Palm Bridge`}
                    </ExternalLink>
                )}
            </div>

            <div className="flex left-1">BETA</div>
        </footer>
    );
};

export default Footer;
