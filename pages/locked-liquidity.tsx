import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container, Box } from "@chakra-ui/react";

import MyLockedPools from "components/MyLockedPools";
import MyAuctionLockedPool from "components/MyAuctionLockedPool";

const LockedLiquidityPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <MyLockedPools />

        <Box mt="4" mb="24">
          <MyAuctionLockedPool />
        </Box>
      </Container>
    </>
  );
};

export default LockedLiquidityPage;
