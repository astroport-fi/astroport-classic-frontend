import React, { FC } from "react";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { TerraWebappProvider } from "@arthuryeti/terra";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import Navbar from "components/Navbar";
import { AstroswapConsumer, AstroswapProvider } from "modules/common";

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
      <Global
        styles={{
          "html,body": {
            height: "100%",
            width: "100%",
            overflowX: "hidden",
            position: "relative",
          },
          body: {
            backgroundColor: "#000D37",
          },
          "*::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#5643F2",
            borderRadius: "6px",
          },
          "#chakra-toast-manager-bottom-right": {
            right: "32px!important",
            bottom: "32px!important",
          },
          "#chakra-toast-manager-top-right": {
            top: "64px!important",
            right: "32px!important",
          },
          "@font-face": {
            fontFamily: "WhyteInktrap",
            src: "url('/WhyteInktrap-Regular.woff') format('woff')",
          },
        }}
      />
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
