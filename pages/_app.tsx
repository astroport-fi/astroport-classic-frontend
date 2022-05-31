import React, { useState } from "react";
import {
  WalletControllerChainOptions,
  getChainOptions,
  StaticWalletProvider,
  WalletProvider,
} from "@terra-money/wallet-provider";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import { Hydrate } from "react-query/hydration";
import { DEFAULT_NETWORK } from "constants/constants";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import useLocalStorage from "hooks/useLocalStorage";
import Layout from "components/Layout";
import AstroportDisclaimer from "components/pages/Disclaimer";
import theme from "../theme";

dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(utc);

const MyApp = ({
  Component,
  pageProps,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) => {
  const [termsAgreed, setTermsAgreed] = useLocalStorage(
    "accepted_terms_conditions",
    false
  );
  const [showingDisclaimer, setShowingDisclaimer] = useState(
    () => !termsAgreed
  );
  const [queryClient] = useState(() => new QueryClient());

  const main = (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="shortcut icon" href="/favicon.png" />
        <style>
          {`html {
            filter: grayscale(65%);
          }`}
        </style>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <Layout>
              {showingDisclaimer ? (
                <AstroportDisclaimer
                  onConfirmClick={() => {
                    setTermsAgreed(true);
                    setShowingDisclaimer(false);
                  }}
                />
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );

  return process.browser ? (
    <WalletProvider
      defaultNetwork={DEFAULT_NETWORK}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={DEFAULT_NETWORK}>
      {main}
    </StaticWalletProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const chainOptions = await getChainOptions();
  return { ...appProps, ...chainOptions };
};

export default MyApp;
