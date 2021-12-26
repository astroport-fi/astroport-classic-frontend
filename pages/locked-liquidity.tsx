import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container, Box } from "@chakra-ui/react";

import MyLockedAstroLiquidity from "components/MyLockedAstroLiquidity";
import MyLockedPool from "components/MyLockedPool";

const LockedLiquidityPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <MyLockedAstroLiquidity />

        <Box mt="4">
          <MyLockedPool />
        </Box>
      </Container>
    </>
  );
};

export default LockedLiquidityPage;
