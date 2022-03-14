import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import { ENV_DISPLAY_GOVERNANCE } from "constants/constants";

import { GovernancePage } from "modules/governance";
import HideOnMobile from "components/common/HideOnMobile";

const Governance: NextPage = () => {
  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      {ENV_DISPLAY_GOVERNANCE && (
        <Container px={["6", null, "12"]} maxWidth="container.xl">
          <GovernancePage />
        </Container>
      )}
    </HideOnMobile>
  );
};

export default Governance;
