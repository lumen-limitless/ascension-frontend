import React from "react";
import "../styles/index.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ToastProvider } from "../context/ToastContext";
import ToastContainer from "../components/Toast/toastContainer";
import { ThemeProvider } from "next-themes";
import Layout from "../layout";
import { Config, DAppProvider } from "@usedapp/core";
import { HOME_CHAINID, RPC } from "../constants";

const config: Config = {
    readOnlyChainId: HOME_CHAINID,
    readOnlyUrls: {
        [HOME_CHAINID]: RPC[HOME_CHAINID],
    },
    autoConnect: true,
    notifications: {
        checkInterval: 4000,
        expirationPeriod: 4000,
    },
    pollingInterval: 1000,
};

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title key="title">Ascension Protocol</title>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />

                <meta
                    key="description"
                    name="description"
                    content="Web application for Ascension Protocol"
                />

                <meta name="application-name" content="Ascension App" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Ascension App"
                />

                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="msapplication-config"
                    content="/browserconfig.xml"
                />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#F338C3" />

                <meta key="twitter:card" name="twitter:card" content="app" />
                <meta
                    key="twitter:title"
                    name="twitter:title"
                    content="Ascension App"
                />
                <meta
                    key="twitter:url"
                    name="twitter:url"
                    content="https://app.ascensionprotocol.io"
                />
                <meta
                    key="twitter:description"
                    name="twitter:description"
                    content="Web application for Ascension Protocol"
                />
                <meta key="twitter:image" name="twitter:image" content="" />
                <meta
                    key="twitter:creator"
                    name="twitter:creator"
                    content="@AscendProtocol"
                />
                <meta key="og:type" property="og:type" content="website" />
                <meta
                    key="og:site_name"
                    property="og:site_name"
                    content="Ascension App"
                />
                <meta
                    key="og:url"
                    property="og:url"
                    content="https://app.ascensionprotocol.io"
                />
                <meta
                    key="og:image"
                    property="og:image"
                    content="https://app.ascensionprotocol.io/apple-touch-icon.png"
                />
                <meta
                    key="og:description"
                    property="og:description"
                    content="Web application for Ascension Protocol"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DAppProvider config={config}>
                <ThemeProvider attribute="class">
                    <ToastProvider>
                        <Layout>
                            <Component {...pageProps} />
                            <ToastContainer />
                        </Layout>
                    </ToastProvider>
                </ThemeProvider>
            </DAppProvider>
        </>
    );
}
