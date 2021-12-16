import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";

import MyLockedAstroLiquidity from "components/MyLockedAstroLiquidity";

const LockedLiquidityPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <MyLockedAstroLiquidity />
      </Container>
    </>
  );
};

export default LockedLiquidityPage;
