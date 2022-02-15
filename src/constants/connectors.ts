import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { RPC } from ".";

const supportedChainIds = [
    31337, //localhost
    1, // mainnet
    //   3, // ropsten
    4, // rinkeby
    //   5, // goreli
    //   42, // kovan
    250, // fantom
    //   4002, // fantom testnet
    137, // matic
    //   80001, // matic testnet
    100, // xdai
    56, // binance smart chain
    //  97, // binance smart chain testnet
    //   1287, // moonbase
    43114, // avalanche
    //  43113, // fuji
    //  128, // heco
    //   256, // heco testnet
    //  1666600000, // harmony
    //   1666700000, // harmony testnet
    //   66, // okex testnet
    //   65, // okex testnet
    42161, // arbitrum
    421611, // arbitrum testnet
    //   42220, // celo
    //   11297108109, // palm
    //   1285, // moonriver
];

export const walletconnect = new WalletConnectConnector({
    rpc: RPC,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    supportedChainIds,
});
