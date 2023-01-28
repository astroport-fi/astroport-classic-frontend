import React, { FC } from "react";
import {
  Text,
  Box,
  Center,
  Flex,
  Spinner,
  chakra,
  useMediaQuery,
} from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { MOBILE_MAX_WIDTH, MOBILE_NAV_HEIGHT } from "constants/constants";
import Navbar from "components/Navbar";
import MobileNavbar from "components/MobileNavbar";
import MobileScrollToTop from "components/MobileScrollToTop";
import MobileFooter from "components/MobileFooter";
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
  nav.sidebar {
    position: fixed;
    background-color: #000D37;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
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
  .glider::-webkit-scrollbar {
    display: none;
  }
  .glider {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .glider-dots {
    margin-top: 10px;
  }
  .glider-dot {
    background: #ADA3FF;
    opacity: 0.5;
  }
  .glider-dot.active {
    width: 40px;
    background: #ADA3FF;
    opacity: 1;
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

const ASTROPORT_V2_LINK = "https://app.astroport.fi/";

const Layout: FC = ({ children }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;
  const spinner = (
    <Center h="full">
      <Spinner size="xl" color="white.500" />
    </Center>
  );

  const errorLoadingData = (
    <Center h="full">
      <Box color="red.500" px={4} textAlign="center">
        Error loading data. The Terra Classic public hive infrastructure that
        Astroport Classic relies on is currently offline.
      </Box>
    </Center>
  );

  // redirect to v2 notice
  if (
    wallet.status === WalletStatus.WALLET_CONNECTED &&
    wallet.network.chainID !== "columbus-5"
  ) {
    return (
      <Flex height="100vh" direction="column" align="center" justify="center">
        <Global styles={GlobalStyles} />
        <Flex
          maxW="400px"
          flexDirection="column"
          bg="white.100"
          borderRadius="2xl"
          p="6"
          color="white"
        >
          <Text textStyle="h2" fontWeight="700" color="#EF5177">
            You are on Terra 2.0
          </Text>
          <Text fontSize="sm" my="4">
            Please go to your wallet, switch to Terra 1.0 (classic) and refresh
            the page.
          </Text>
          <Flex fontSize="sm">
            <Text>For Astroport on Terra 2.0,&nbsp;</Text>
            <chakra.a href={ASTROPORT_V2_LINK} textDecoration="underline">
              click here.
            </chakra.a>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex height="100vh" direction="column">
      <Global styles={GlobalStyles} />
      {!isInitializing && (
        <TerraWebappProvider>
          <AstroswapProvider>
            {!isMobile && (
              <Flex
                bg="#EF5177"
                p="4"
                color="white"
                justifyContent="center"
                zIndex={9999}
              >
                <Text textStyle="h2">
                  You are on Astroport Classic. For Astroport V2 go to{" "}
                </Text>
                <chakra.a
                  href={ASTROPORT_V2_LINK}
                  textDecoration="underline"
                  fontWeight={600}
                  ml={1.5}
                >
                  app.astroport.fi
                </chakra.a>
              </Flex>
            )}
            {isMobile ? <MobileNavbar /> : <Navbar />}
            <AstroswapConsumer>
              {({ isLoading, isErrorLoadingData }) =>
                isLoading ? (
                  spinner
                ) : isErrorLoadingData ? (
                  errorLoadingData
                ) : (
                  <Box flex="1" mt={isMobile ? MOBILE_NAV_HEIGHT : "0px"}>
                    {children}
                  </Box>
                )
              }
            </AstroswapConsumer>
            {isMobile && (
              <>
                <MobileScrollToTop />
                <MobileFooter />
              </>
            )}
          </AstroswapProvider>
        </TerraWebappProvider>
      )}
    </Flex>
  );
};

export default Layout;
