import React from "react";
import {
  NetworkInfo,
  StaticWalletProvider,
  WalletProvider,
} from "@terra-money/wallet-provider";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Layout from "components/Layout";
import { TerraProvider } from "contexts/TerraContext";
import theme from "../theme";

dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const mainnet = {
  name: "mainnet",
  chainID: "columbus-4",
  lcd: "https://lcd.terra.dev",
};

const testnet = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: testnet,
  1: mainnet,
};

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const main = (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <TerraProvider>
              <CSSReset />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </TerraProvider>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );

  return process.browser ? (
    <WalletProvider
      defaultNetwork={mainnet}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={mainnet}>{main}</StaticWalletProvider>
  );
};

export default App;
