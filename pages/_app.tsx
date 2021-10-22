import "../app.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import contractsInfo from "../utils/contractsInfo.json";
import { EtherSWRConfig } from "ether-swr";
import { NextComponentType, NextPageContext } from "next";
import { ConnectButton } from "../components/connection";
import Section from "../components/base/section";

const ABIs: any = [
  [contractsInfo.contracts.AscensionToken.address, contractsInfo.contracts.AscensionToken.abi],
  [contractsInfo.contracts.AscensionStaking.address, contractsInfo.contracts.AscensionStaking.abi],
  [
    contractsInfo.contracts.AscensionDiamond.address,
    contractsInfo.contracts.ERC20DistributorFacet.abi,
  ],
];
function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}) {
  const { library, active } = useWeb3React();

  return (
    <Layout>
      {!active ? (
        <Section>
          <h1>Connect to Web3</h1>
          <ConnectButton />
        </Section>
      ) : (
        <EtherSWRConfig
          value={{ web3Provider: library, ABIs: new Map(ABIs), refreshInterval: 3000 }}
        >
          <Component {...pageProps} />
        </EtherSWRConfig>
      )}
    </Layout>
  );
}
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Head>
          <title>Ascension Protocol App</title>
          <meta name="description" content="Web application for Ascension Protocol" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <App Component={Component} pageProps={pageProps} />
      </Web3ReactProvider>
    </>
  );
}
