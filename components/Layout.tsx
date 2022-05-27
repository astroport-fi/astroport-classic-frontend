import React, { FC } from "react";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import Navbar from "components/Navbar";
import { AstroswapConsumer, AstroswapProvider } from "modules/common";
import { TerraWebappProvider } from "context/TerraWebappContext";

const GlobalStyles = css`
  html, body {
    height: 100%;
    width: 100%;
    position: relative;
  }
  body {
    background-color: #000D37;
  }
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #5643F2;
    border-radius: 6px;
  }
  pre {
    font-family: monospace;
  }
  #chakra-toast-manager-bottom-right {
    right: 32px !important;
    bottom: 32px !important;
  }
  #chakra-toast-manager-top-right {
    top: 64px !important;
    right: "32px !important;
  }
  .pagination {
    display: flex;
    align-items: center;
    padding-left: 0;
    list-style: none;
    margin: auto;
  }
  .pagination li {
    margin: 0 5px;
  }
  .pagination-active {
    color: white;
    font-weight: 500;
  }
  @font-face {
    font-family: WhyteInktrap;
    src: url('/WhyteInktrap-Regular.woff') format('woff');
  }
  @font-face {
    font-family: "Roboto Mono";
    src: url('/RobotoMono-Regular.ttf') format('ttf');
  }
`;

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  const spinner = (
    <Center h="full">
      <Spinner size="xl" color="white.500" />
    </Center>
  );

  const errorLoadingData = (
    <Center h="full">
      <Box color="red.500">Error Loading Data</Box>
    </Center>
  );

  return (
    <Flex height="100vh" direction="column">
      <Global styles={GlobalStyles} />
      {!isInitializing && (
        <TerraWebappProvider
        // config={{
        //   lcdClientUrl:
        //     "https://terra-testnet-lcd.everstake.one/3WwtQlaFdSV3XHqGqkGFUX7terraTest",
        // }}
        >
          <AstroswapProvider>
            <Navbar />
            <AstroswapConsumer>
              {({ isLoading, isErrorLoadingData }) =>
                isLoading ? (
                  spinner
                ) : isErrorLoadingData ? (
                  errorLoadingData
                ) : (
                  <Box flex="1">{children}</Box>
                )
              }
            </AstroswapConsumer>
          </AstroswapProvider>
        </TerraWebappProvider>
      )}
    </Flex>
  );
};

export default Layout;
