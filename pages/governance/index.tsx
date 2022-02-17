import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";

import { GovPage } from "modules/governance";

const Governance: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container px={["6", null, "12"]} maxWidth="container.xl">
        <GovPage />
      </Container>
    </>
  );
};

export default Governance;
