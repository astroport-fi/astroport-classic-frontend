import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Global } from "@emotion/react";

import Navbar from "components/Navbar";
import { TerraProvider } from "contexts/TerraContext";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

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
            background: "url(/bg.jpg) no-repeat no-repeat",
            backgroundSize: "cover",
          },
          "*::-webkit-scrollbar": {
            width: "6px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#5643F2",
            borderRadius: "6px",
          },
          "#chakra-toast-manager-bottom-right": {
            right: "32px!important",
            bottom: "32px!important",
          },
        }}
      />
      {!isInitializing && (
        <TerraProvider>
          <Box>
            <Navbar />
          </Box>
          <Box flex="1">{children}</Box>
        </TerraProvider>
      )}
    </Flex>
  );
};

export default Layout;
