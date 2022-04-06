import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";

import { GovPage } from "modules/governance";
import HideOnMobile from "components/common/HideOnMobile";

const Governance: NextPage = () => {
  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <GovPage />
      </Container>
    </HideOnMobile>
  );
};

export default Governance;
