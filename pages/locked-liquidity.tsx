import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container, Box } from "@chakra-ui/react";

import MyLockedPools from "components/MyLockedPools";
import MyAuctionLockedPool from "components/MyAuctionLockedPool";
import HideOnMobile from "components/common/HideOnMobile";

const LockedLiquidityPage: NextPage = () => {
  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <Box mt={["8", null, "72px"]}>
          <MyLockedPools />
        </Box>

        <Box mt="4" mb="24">
          <MyAuctionLockedPool />
        </Box>
      </Container>
    </HideOnMobile>
  );
};

export default LockedLiquidityPage;
